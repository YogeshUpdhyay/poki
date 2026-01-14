function toNumberPx(v, fallback = 0) {
  if (v == null) return fallback;
  if (typeof v === "number") return v;
  const n = parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
}

function OutlinedSvgText({
  lines = ["Hello", "World"],
  size = "32px",
  stroke = "black",     // token name, used as var(--color-*)
  fill = "white",       // token name, used as var(--color-*)
  strokeWidth = "10px",
  translateY = "0%",
  rotate = "0deg",
  // tweakable:
  lineHeight = 1.0,     // multiplier on font size for each next line
  padding = null,       // if null, auto based on strokeWidth
}) {
  const fontSizePx = toNumberPx(size, 32);
  const strokePx = toNumberPx(strokeWidth, 0);

  // spacing between baselines for each extra line
  const lineStep = Math.round(fontSizePx * lineHeight);

  // Padding to avoid stroke clipping. You can override via `padding`.
  const pad = padding == null ? Math.ceil(strokePx * 2) : toNumberPx(padding, 0);

  const lineCount = Math.max(1, lines.length);

  // Baseline of first line:
  // put it below top padding by ~fontSize (since y is baseline)
  const firstBaselineY = pad + fontSizePx;

  // Total height:
  // top pad + (ascent ~ fontSize) + (extra lines * lineStep) + some descent + bottom pad
  const descent = Math.ceil(fontSizePx * 0.35); // decent approximation
  const heightPx = pad + fontSizePx + (lineCount - 1) * lineStep + descent + pad;

  return (
    <svg
      width="100%"
      height={heightPx}
      style={{
        display: "block",
        transform: `translateY(${translateY}) rotate(${rotate})`,
        overflow: "visible",
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      <text
        x="50%"
        y={firstBaselineY}
        fontSize={fontSizePx}
        fill={`var(--color-${fill})`}
        stroke={`var(--color-${stroke})`}
        strokeWidth={strokePx}
        paintOrder="stroke fill"
        dominantBaseline="alphabetic"
        fontFamily="Milk Cursive W00 Regular"
        textAnchor="middle"
      >
        {lines.map((line, i) => (
          <tspan key={i} x="50%" dy={i === 0 ? 0 : lineStep}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
}

export default OutlinedSvgText;
