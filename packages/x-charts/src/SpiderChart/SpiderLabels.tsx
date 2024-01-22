import React from 'react';

interface SpiderLabels {
    labels: string[]
    angleScale: (i: number) => number
    getCoordinatesForAngle: (angle: number, offset?: number) => [number, number]
}

const SpiderLabels = ({labels, angleScale, getCoordinatesForAngle}: SpiderLabels) => {
  
  return (
    <>
      {labels.map((label, i) => {
        const angle = angleScale(i);
        const [x, y] = getCoordinatesForAngle(angle);
        const [labelX, labelY] = getCoordinatesForAngle(angle, 1.15);
        return (
          <g key={i} className="grid">
            <line x2={x} y2={y} stroke="#E5E2E0" className="grid-line" />
            <text
              x={labelX}
              y={labelY}
              textAnchor={labelX < 0 ? 'end' : labelX < 3 ? 'middle' : 'start'}
            >
              {label}
            </text>
          </g>
        );
      })}
    </>
  );
};

export default SpiderLabels;
