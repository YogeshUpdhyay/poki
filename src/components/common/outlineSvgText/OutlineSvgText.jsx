function OutlinedSvgText({
  lines = ["Hello", "World"],
  size = '32px',
  stroke = "#000",
  fill = "#fff",
  strokeWidth = "10px",
  translateY = "-30%",
  rotate = "-4deg",
}) {
  return (
    <svg 
        width="100%" 
        viewBox={`0 0 auto auto`}
        style={{
            transform: `translateY(${translateY})`,
            rotate: rotate
        }}
    >
      <text
        x="10"
        y={size}
        fontSize={size}
        fill={`var(--color-${fill})`}
        stroke={`var(--color-${stroke})`}
        strokeWidth={strokeWidth}
        paintOrder="stroke fill"
        dominantBaseline="alphabetic"
        fontFamily="Milk Cursive W00 Regular"
        textAnchor="middle"
      >
        {lines.map((line, i) => (
          <tspan key={i} x="50%" dy={i === 0 ? 0 : 32}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  );
}

export default OutlinedSvgText;