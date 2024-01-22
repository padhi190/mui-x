import React from 'react';

export type SpiderValue = { key: string; value: number };

export interface SpiderPlotProps {
  series: SpiderValue[][];
  colors: string[];
  lineGenerator: d3.LineRadial<SpiderValue>;
}

const SpiderPlot = ({ series, colors, lineGenerator }: SpiderPlotProps) => {
  return (
    <>
      {series.map((d, i) => (
        <g key={i}>
          <path
            d={lineGenerator(d) || undefined}
            fill={`${colors[i % colors.length]}`}
            stroke={`${colors[i % colors.length]}`}
            strokeWidth="2.5"
            fillOpacity="0.1"
          />
        </g>
      ))}
    </>
  );
};

export default SpiderPlot;
