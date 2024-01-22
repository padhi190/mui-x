import React from 'react';

interface SpiderTicksProps {
  radiusScale: d3.ScaleLinear<number, number, never>;
  color?: string;
}

const SpiderTicks = ({ radiusScale, color = '#E5E2E0' }: SpiderTicksProps) => {
  const valueTicks = radiusScale.ticks(4);
  return (
    <>
      {valueTicks.map((tick, i) => (
        <g key={i} className="grid">
          <circle r={radiusScale(tick)} fill={color} stroke={color} fillOpacity={0.2} />
          <text x={5} y={-radiusScale(tick)} dy=".3em">
            {tick}
          </text>
        </g>
      ))}
    </>
  );
};

export default SpiderTicks;
