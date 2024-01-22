import React from 'react';
import * as d3 from 'd3';
import SpiderPlot, { SpiderPlotProps, SpiderValue } from './SpiderPlot';
import SpiderTicks from './SpiderTicks';
import SpiderLabels from './SpiderLabels';
import SpiderContainer, { Dimension, Margin } from './SpiderContainer';

interface SpiderChartProps extends Dimension, Margin, Omit<SpiderPlotProps, 'lineGenerator'> {}

const COLORS: SpiderChartProps['colors'] = ['#137B80', '#E6842A', '#91d247'];

const DEFAULT_MARGIN = { top: 50, right: 60, bottom: 50, left: 60 };

export const SpiderChart = ({
  series,
  width,
  height,
  colors = COLORS,
  margin = DEFAULT_MARGIN,
}: SpiderChartProps) => {
  const boundedDimensions: Dimension = {
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
  };
  const radius = Math.min(boundedDimensions.width, boundedDimensions.height) / 2;

  const angleScale = d3
    .scaleLinear()
    .domain([0, series[0].length])
    .range([0, 2 * Math.PI]);

  const allVals = getAllValues(series);

  const radiusScale = d3
    .scaleLinear()
    .domain([0, d3.max(allVals)!])
    .range([0, radius])
    .nice();

  const lineGenerator = d3
    .lineRadial<SpiderValue>()
    .angle((_d, i) => angleScale(i))
    .radius((d) => radiusScale(d.value))
    .curve(d3.curveLinearClosed);

  return (
    <SpiderContainer width={width} height={height} margin={margin}>
      <SpiderLabels
        labels={series[0].map((d) => d.key)}
        angleScale={angleScale}
        getCoordinatesForAngle={(angle: number, offset?: number) =>
          radianToCartesian(angle, radius, offset)
        }
      />

      <SpiderTicks radiusScale={radiusScale} />

      <SpiderPlot series={series} colors={colors} lineGenerator={lineGenerator} />
    </SpiderContainer>
  );
};

function radianToCartesian(angle: number, radius: number, offset = 1): [number, number] {
  return [
    radius * Math.cos(angle - Math.PI / 2) * offset,
    radius * Math.sin(angle - Math.PI / 2) * offset,
  ];
}

function getAllValues(series: SpiderValue[][]) {
  const allVals: number[] = [];
  series.map((array) => array.map((d) => allVals.push(d.value)));
  return allVals;
}
