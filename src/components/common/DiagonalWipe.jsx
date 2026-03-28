import React, { useEffect, useRef } from 'react';
import './DiagonalWipe.css';

// Extremely smooth, cinematic easing ΓÇö starts and ends slow
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const DiagonalWipe = ({ phase = 'idle', color = '#5168E8', onPhaseComplete }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const startRef = useRef(null);
  const lastPRef = useRef(0);
  const doneRef = useRef(false);
  const phaseRef = useRef(phase);
  const onCompleteRef = useRef(onPhaseComplete);

  // Keep callback ref in sync without re-triggering effects
  useEffect(() => { onCompleteRef.current = onPhaseComplete; }, [onPhaseComplete]);

  // Reset state when phase changes
  useEffect(() => {
    phaseRef.current = phase;
    startRef.current = null;
    lastPRef.current = 0;
    doneRef.current = false;

    if (phase === 'idle') {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [phase]);

  // Main animation loop ΓÇö runs once, reacts to phaseRef changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // High-quality smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };
    resize();
    window.addEventListener('resize', resize);

    const PAINT_DUR = 3.5;  // seconds — peaceful and slow but not forever
    const REVEAL_DUR = 3.5; // seconds — smooth and deliberate

    const render = (time) => {
      const currentPhase = phaseRef.current;

      // Skip non-animating phases
      if (currentPhase !== 'painting' && currentPhase !== 'revealing') {
        animRef.current = requestAnimationFrame(render);
        return;
      }

      if (!startRef.current) startRef.current = time;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const maxDim = Math.max(w, h);

      // Brush config
      const brushRadius = maxDim * 0.25; // Larger brush
      const zigFreq = 10;            // More zig-zags for smoother coverage
      const zigAmp = maxDim * 0.45; // Wider swing to reach extreme corners

      // Progress
      const elapsed = (time - startRef.current) / 1000;
      const dur = currentPhase === 'painting' ? PAINT_DUR : REVEAL_DUR;
      const rawP = Math.min(elapsed / dur, 1);
      const p = easeInOutCubic(rawP);
      const lastP = lastPRef.current;

      // Composite mode: paint adds color, reveal erases it
      if (currentPhase === 'painting') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = color;
      } else {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,1)';
      }

      // Draw many overlapping circles from lastP → p (paint trail)
      // Increased steps for smoother rendering on high-res displays
      const steps = 200;
      for (let i = 0; i <= steps; i++) {
        const t = lastP + (p - lastP) * (i / steps);

        // Base position along the diagonal (top-left → bottom-right)
        // Extend 30% past viewport edges so the brush enters/exits smoothly
        const diag = t * 1.5 - 0.3;
        const baseX = diag * w;
        const baseY = diag * h;

        // Zig-zag perpendicular to the diagonal (mirror-wiping motion)
        const zigOffset = Math.sin(t * Math.PI * zigFreq) * zigAmp;
        const x = baseX + zigOffset * 0.707;  // cos(45°)
        const y = baseY - zigOffset * 0.707;  // sin(45°)

        ctx.beginPath();
        ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      lastPRef.current = p;

      // Fire completion callback once
      if (rawP >= 1 && !doneRef.current) {
        doneRef.current = true;
        if (onCompleteRef.current) onCompleteRef.current(currentPhase);
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [color]);

  return (
    <div className={`diagonal-wipe ${phase !== 'idle' ? 'active' : ''}`}>
      <canvas ref={canvasRef} className="diagonal-wipe-canvas" />
    </div>
  );
};

export default DiagonalWipe;
