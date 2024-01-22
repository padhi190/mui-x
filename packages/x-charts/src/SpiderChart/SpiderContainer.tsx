import React from 'react';

export type Dimension = {
  width: number;
  height: number;
};

export type Margin = {
  margin: {
    top: number;
    left: number;
    bottom: number;
    right: number;
  };
};

interface SpiderContainerProps extends Dimension, Margin {
  children?: React.ReactNode;
}

const SpiderContainer: React.FC<SpiderContainerProps> = ({ width, height, margin, children }) => {
  const boundedDimensions: Dimension = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
  };
  const radius = boundedDimensions.width / 2;
  return (
    <svg width={width} height={height} style={{ backgroundColor: '#fff' }}>
      <g transform={`translate(${width/2} ,${height/2 } )`}>{children}</g>
    </svg>
  );
};

export default SpiderContainer;
