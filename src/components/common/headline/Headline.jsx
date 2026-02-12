import './Headline.css'
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePreloader } from '../../../utils/PreloaderContext'; // Re-importing context
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

export function Headline({children, tooltip, tooltipColor, lines, highlight, forceOpen, animated = false}) {
  const { isRevealed } = usePreloader();
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const shouldAnimate = inView && isRevealed;

  const [open, setOpen] = useState(false);
  const hasTooltip = tooltip && (typeof tooltip === 'string' ? tooltip.trim().length > 0 : true)
  const colorClass = typeof tooltipColor === 'string' && tooltipColor.trim().length > 0 ? tooltipColor.trim() : 'blue'
  const hasLines = Array.isArray(lines) && lines.length > 0
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(8)], // optional offset
    whileElementsMounted: autoUpdate,
  });

  const clientPoint = useClientPoint(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    clientPoint,
  ]);

  const isTooltipVisible = forceOpen || open;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02, // Fast, aggressive stagger
        delayChildren: 0,
      }
    }
  };

  // Helper to split text into characters while preserving spaces and highlights
  const renderLine = (line, lineIdx) => {
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

  return (
    <div className={`headlineContainer ${animated ? 'animated-headline' : ''}`} ref={inViewRef}>
      <h1 className="headlineText">
        <motion.div 
          className="headlineWrapper"
          ref={refs.setReference}
          variants={containerVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
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

              // Default stable rendering
              if (typeof highlight === 'string' && highlight.trim() && line.includes(highlight)) {
                const idx = line.indexOf(highlight)
                const before = line.slice(0, idx)
                const after = line.slice(idx + highlight.length)
                return (
                  <React.Fragment key={i}>
                    {before}
                    <span className="headlineHighlight">{highlight}</span>
                    {after}
                    {i < lines.length - 1 ? <br /> : null}
                  </React.Fragment>
                )
              }
              return <React.Fragment key={i}>{line}{i < lines.length - 1 ? <br /> : null}</React.Fragment>
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


