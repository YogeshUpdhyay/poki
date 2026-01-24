import './Headline.css'
import { useState } from 'react';
import {
  useFloating,
  useClientPoint,
  offset,
  autoUpdate,
  useInteractions,
} from "@floating-ui/react";

export function Headline({children, tooltip, tooltipColor, lines, highlight, forceOpen}) {
  const [open, setOpen] = useState(false);
  const hasTooltip = typeof tooltip === 'string' && tooltip.trim().length > 0
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

  return (
    <div className="headlineContainer">
      <h1 className="headlineText">
        <div 
          className="headlineWrapper"
          ref={refs.setReference}
          {...getReferenceProps({
            onMouseEnter: hasTooltip ? () => setOpen(true) : undefined,
            onMouseLeave: hasTooltip ? () => setOpen(false) : undefined,
          })}
        >
          {hasLines ? (
            lines.map((line, i) => {
              if (typeof highlight === 'string' && highlight.trim() && line.includes(highlight)) {
                const idx = line.indexOf(highlight)
                const before = line.slice(0, idx)
                const after = line.slice(idx + highlight.length)
                return (
                  <>
                    {before}
                    <span className="headlineHighlight">{highlight}</span>
                    {after}
                    {i < lines.length - 1 ? <br /> : null}
                  </>
                )
              }

              return <>{line}{i < lines.length - 1 ? <br /> : null}</>
            })
          ) : (
            <></>
          )}
          {children}
        </div>
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


