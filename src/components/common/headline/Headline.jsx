import './Headline.css'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePreloader } from '../../../utils/PreloaderContext';
import { useInView } from 'react-intersection-observer';
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";

export const letterVariants = {
  hidden: {
    x: "100vw",
    rotate: 180,
    opacity: 0
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 100,
      mass: 1,
    }
  }
};

export const wordVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    x: 40,
    y: 0, // No vertical offset for "from right"
    rotate: -2,
    originX: 1,
    originY: 0.5, // Centered vertically
  },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    originX: 1,
    originY: 0.5, // Centered vertically
    transition: {
      type: 'spring',
      damping: 15, // Slightly higher to keep the speed stable
      stiffness: 250, // Much faster pop
      mass: 0.8,
      restDelta: 0.001,
      restSpeed: 0.001
    }
  }
};

export const popInVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100
    }
  }
};

export function Headline({ children, tooltip, tooltipColor, lines, highlight, forceOpen, animated = false, animationType = 'char' }) {
  const { isRevealed } = usePreloader();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const shouldAnimate = inView && isRevealed;
  const [hasTriggered, setHasTriggered] = useState(false);

  // Once it starts animating, keep it in the "visible" state even if shouldAnimate flips back to false (e.g. during a page wipe)
  if (shouldAnimate && !hasTriggered) {
    setHasTriggered(true);
  }

  const [open, setOpen] = useState(false);
  const hasTooltip = tooltip && (typeof tooltip === 'string' ? tooltip.trim().length > 0 : true)
  const colorClass = typeof tooltipColor === 'string' && tooltipColor.trim().length > 0 ? tooltipColor.trim() : 'blue'
  const hasLines = Array.isArray(lines) && lines.length > 0

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8)],
    whileElementsMounted: autoUpdate,
  });

  const clientPoint = useClientPoint(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([clientPoint]);
  const isTooltipVisible = forceOpen || open;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: animationType === 'word' ? 0.1 : 0.02,
        delayChildren: animationType === 'word' ? 0.2 : 0,
      }
    }
  };

  const renderCharacters = (text, prefix) => {
    return text.split('').map((char, charIdx) => (
      <motion.span
        key={`${prefix}-${charIdx}`}
        className="headlineChar"
        variants={letterVariants}
        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </motion.span>
    ));
  };

  const renderLine = (line, lineIdx) => {
    if (animationType === 'word') {
      const parts = [];
      const hasHighlight = typeof highlight === 'string' && highlight.trim() && line.includes(highlight);

      if (hasHighlight) {
        const idx = line.indexOf(highlight);
        const before = line.slice(0, idx);
        const after = line.slice(idx + highlight.length);
        if (before) parts.push({ text: before, type: 'normal' });
        parts.push({ text: highlight, type: 'highlight' });
        if (after) parts.push({ text: after, type: 'normal' });
      } else {
        parts.push({ text: line, type: 'normal' });
      }

      const allWords = [];
      parts.forEach((part) => {
        const words = part.text.split(/\s+/).filter(Boolean);
        words.forEach((w) => {
          allWords.push({
            text: w,
            isHighlight: part.type === 'highlight'
          });
        });
      });

      return (
        <span key={lineIdx} className="headlineLineWrapper">
          {allWords.map((wordObj, wIdx) => {
            const isLast = wIdx === allWords.length - 1;
            return (
              <motion.span
                key={`${lineIdx}-${wIdx}`}
                className={`headlineWord ${wordObj.isHighlight ? 'headlineHighlight' : ''}`}
                variants={wordVariants}
                style={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  marginRight: isLast ? '0' : '0.25em',
                }}
              >
                {wordObj.text}
              </motion.span>
            );
          })}
          {lineIdx < lines.length - 1 && <br />}
        </span>
      );
    }

    // Default character rendering
    if (typeof highlight === 'string' && highlight.trim() && line.includes(highlight)) {
      const idx = line.indexOf(highlight);
      const before = line.slice(0, idx);
      const after = line.slice(idx + highlight.length);

      return (
        <span key={lineIdx} className="headlineLineWrapper">
          {renderCharacters(before, `b-${lineIdx}`)}
          <span className="headlineHighlight">
            {renderCharacters(highlight, `h-${lineIdx}`)}
          </span>
          {renderCharacters(after, `a-${lineIdx}`)}
          {lineIdx < lines.length - 1 && <br />}
        </span>
      );
    }

    return (
      <span key={lineIdx} className="headlineLineWrapper">
        {renderCharacters(line, `l-${lineIdx}`)}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  };

  return (
    <div className={`headlineContainer ${animated ? 'animated-headline' : ''}`} ref={inViewRef}>
      <h1 className="headlineText">
        <motion.div
          className="headlineWrapper"
          ref={refs.setReference}
          variants={containerVariants}
          initial="hidden"
          animate={hasTriggered ? "visible" : "hidden"}
          {...getReferenceProps({
            onMouseEnter: hasTooltip ? () => setOpen(true) : undefined,
            onMouseLeave: hasTooltip ? () => setOpen(false) : undefined,
          })}
        >
          {hasLines ? (
            lines.map((line, i) => {
              if (animated) {
                return renderLine(line, i);
              }
              if (typeof highlight === 'string' && highlight.trim() && line.includes(highlight)) {
                const idx = line.indexOf(highlight)
                const before = line.slice(0, idx)
                const after = line.slice(idx + highlight.length)
                return (
                  <span key={i} className="headlineLineWrapper">
                    {before}
                    <span className="headlineHighlight">{highlight}</span>
                    {after}
                    {i < lines.length - 1 ? <br /> : null}
                  </span>
                )
              }
              return <span key={i} className="headlineLineWrapper">{line}{i < lines.length - 1 ? <br /> : null}</span>
            })
          ) : (
            <></>
          )}
          {children}
        </motion.div>
        {hasTooltip && isTooltipVisible && (
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps({
              className: `tooltip ${colorClass}`,
            })}
          >
            {tooltip}
          </div>)}
      </h1>
    </div>
  )
}

export function HeadlineLineItem({ children }) {
  return (
    <>{children} <br /></>
  )
}

export function HeadlineLineItemHighlight({ children }) {
  return (
    <span className="headlineHighlight">{children}</span>
  )
}
