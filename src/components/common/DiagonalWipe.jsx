import React, { useEffect, useRef } from 'react';
import './DiagonalWipe.css';

// Smooth easing for organic "slow-to-fast-to-slow" feel
const easeInOutQuart = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

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

  // Main animation loop — runs once, reacts to phaseRef changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const PAINT_DUR = 3.5;  // seconds — slow, peaceful paint-in
    const REVEAL_DUR = 2.8; // seconds — slightly faster wipe-off

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
      const brushRadius = maxDim * 0.2;
      const zigFreq = 7;            // More zig-zags for finer strokes
      const zigAmp = maxDim * 0.35; // Slightly wider swing to ensure coverage

      // Progress
      const elapsed = (time - startRef.current) / 1000;
      const dur = currentPhase === 'painting' ? PAINT_DUR : REVEAL_DUR;
      const rawP = Math.min(elapsed / dur, 1);
      const p = easeInOutQuart(rawP);
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
      const steps = 50;
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
