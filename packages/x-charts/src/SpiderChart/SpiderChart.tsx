import * as React from 'react';
import PropTypes from 'prop-types';
import { BarPlot } from '../BarChart';
import { LinePlot, AreaPlot, LineHighlightPlot } from '../LineChart';
import {
  ResponsiveChartContainer,
  ResponsiveChartContainerProps,
} from '../ResponsiveChartContainer';
import { DEFAULT_X_AXIS_KEY } from '../constants';
import {
  ChartsTooltip,
  ChartsTooltipProps,
  ChartsTooltipSlotProps,
  ChartsTooltipSlots,
} from '../ChartsTooltip';
import { ChartsAxisHighlight, ChartsAxisHighlightProps } from '../ChartsAxisHighlight';
import { AxisConfig } from '../models/axis';
import { MakeOptional } from '../models/helpers';
import { LineSeriesType } from '../models/seriesType/line';
import { CardinalDirections } from '../models/layout';
import { AreaPlotSlots, AreaPlotSlotProps } from '../LineChart/AreaPlot';
import { LinePlotSlots, LinePlotSlotProps } from '../LineChart/LinePlot';
import { MarkPlotSlots, MarkPlotSlotProps } from '../LineChart/MarkPlot';
import { LineHighlightPlotSlots, LineHighlightPlotSlotProps } from '../LineChart/LineHighlightPlot';
import { BarPlotSlots, BarPlotSlotProps } from '../BarChart/BarPlot';

/*
const categories = ['battery', 'contract', 'design'];

const iphone = [0.22, 0.3, 0.5];
const samsung= [0.22, 0.3, 0.5];
const nokia= [0.22, 0.3, 0.5];

const valueFormatter = (value: number | null) => `${value * 100}%`;

<SpiderChart
  xAxis = {[{
    id: 'Category',
    data: categories,
    scaleType: '',
    valueFormatter,
  }]}
  series = {[
    {id: 'iphone', label: 'iPhone', data: iphone}
    {id: 'samsung', label: 'Samsung', data: samsung}
    {id: 'nokia', label: 'Nokia', data: nokia}
  ]}
  width={500}
  height={300}
/>
*/

interface SparkLineChartSlots
  extends AreaPlotSlots,
    LinePlotSlots,
    MarkPlotSlots,
    LineHighlightPlotSlots,
    BarPlotSlots,
    ChartsTooltipSlots {}
interface SparkLineChartSlotProps
  extends AreaPlotSlotProps,
    LinePlotSlotProps,
    MarkPlotSlotProps,
    LineHighlightPlotSlotProps,
    BarPlotSlotProps,
    ChartsTooltipSlotProps {}

interface SparkLineChartProps
  extends Omit<ResponsiveChartContainerProps, 'series' | 'xAxis' | 'yAxis' | 'margin'> {
  /**
   * The xAxis configuration.
   * Notice it is a single configuration object, not an array of configuration.
   */
  xAxis?: MakeOptional<AxisConfig, 'id'>;
  tooltip?: ChartsTooltipProps;
  axisHighlight?: ChartsAxisHighlightProps;
  /**
   * Type of plot used.
   * @default 'line'
   */
  plotType?: 'line' | 'bar';
  /**
   * Data to plot.
   */
  data: number[];
  /**
   * Formatter used by the tooltip.
   * @param {number} value The value to format.
   * @returns {string} the formatted value.
   * @default (v: number | null) => (v === null ? '' : v.toString())
   */
  valueFormatter?: (value: number | null) => string;
  /**
   * Set to `true` to enable the tooltip in the sparkline.
   * @default false
   */
  showTooltip?: boolean;
  /**
   * Set to `true` to highlight the value.
   * With line, it shows a point.
   * With bar, it shows a highlight band.
   * @default false
   */
  showHighlight?: boolean;
  /**
   * Set to `true` to fill spark line area.
   * Has no effect if plotType='bar'.
   * @default false
   */
  area?: LineSeriesType['area'];
  /**
   * @default 'linear'
   */
  curve?: LineSeriesType['curve'];
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default {
   *   top: 5,
   *   bottom: 5,
   *   left: 5,
   *   right: 5,
   * }
   */
  margin?: Partial<CardinalDirections<number>>;
  /**
   * Overridable component slots.
   * @default {}
   */
  slots?: SparkLineChartSlots;
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps?: SparkLineChartSlotProps;
}

const SPARKLINE_DEFAULT_MARGIN = {
  top: 5,
  bottom: 5,
  left: 5,
  right: 5,
};

/**
 * Demos:
 *
 * - [SparkLine](https://mui.com/x/react-charts/sparkline/)
 *
 * API:
 *
 * - [SparkLineChart API](https://mui.com/x/api/charts/spark-line-chart/)
 */
const SpiderChart = React.forwardRef(function SparkLineChart(props: SparkLineChartProps, ref) {
  const {
    xAxis,
    width,
    height,
    margin = SPARKLINE_DEFAULT_MARGIN,
    colors,
    sx,
    showTooltip,
    tooltip,
    showHighlight,
    axisHighlight: inAxisHighlight,
    children,
    slots,
    slotProps,
    data,
    plotType = 'line',
    valueFormatter = (v: number | null) => (v === null ? '' : v.toString()),
    area,
    curve = 'linear',
  } = props;

  const defaultXHighlight: { x: 'band' | 'none' } =
    showHighlight && plotType === 'bar' ? { x: 'band' } : { x: 'none' };
  const axisHighlight = {
    ...defaultXHighlight,
    ...inAxisHighlight,
  };

  return (
    <ResponsiveChartContainer
      ref={ref}
      series={[
        {
          type: plotType,
          data,
          valueFormatter,
          ...(plotType === 'bar' ? {} : { area, curve, disableHighlight: !showHighlight }),
        },
      ]}
      width={width}
      height={height}
      margin={margin}
      xAxis={[
        {
          id: DEFAULT_X_AXIS_KEY,
          scaleType: plotType === 'bar' ? 'band' : 'point',
          data: Array.from({ length: data.length }, (_, index) => index),
          hideTooltip: xAxis === undefined,
          ...xAxis,
        },
      ]}
      colors={colors}
      sx={sx}
      disableAxisListener={
        (!showTooltip || tooltip?.trigger !== 'axis') &&
        axisHighlight?.x === 'none' &&
        axisHighlight?.y === 'none'
      }
    >
      {plotType === 'bar' && (
        <BarPlot
          skipAnimation
          slots={slots}
          slotProps={slotProps}
          sx={{ shapeRendering: 'auto' }}
        />
      )}

      {plotType === 'line' && (
        <React.Fragment>
          <AreaPlot slots={slots} slotProps={slotProps} />
          <LinePlot slots={slots} slotProps={slotProps} />
          <LineHighlightPlot slots={slots} slotProps={slotProps} />
        </React.Fragment>
      )}

      <ChartsAxisHighlight {...axisHighlight} />
      {showTooltip && <ChartsTooltip {...tooltip} slotProps={slotProps} slots={slots} />}

      {children}
    </ResponsiveChartContainer>
  );
});

SpiderChart.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Set to `true` to fill spark line area.
   * Has no effect if plotType='bar'.
   * @default false
   */
  area: PropTypes.bool,
  axisHighlight: PropTypes.shape({
    x: PropTypes.oneOf(['band', 'line', 'none']),
    y: PropTypes.oneOf(['band', 'line', 'none']),
  }),
  children: PropTypes.node,
  className: PropTypes.string,
  /**
   * Color palette used to colorize multiple series.
   * @default blueberryTwilightPalette
   */
  colors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.func]),
  /**
   * @default 'linear'
   */
  curve: PropTypes.oneOf([
    'catmullRom',
    'linear',
    'monotoneX',
    'monotoneY',
    'natural',
    'step',
    'stepAfter',
    'stepBefore',
  ]),
  /**
   * Data to plot.
   */
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: PropTypes.arrayOf(PropTypes.object),
  desc: PropTypes.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: PropTypes.bool,
  /**
   * The height of the chart in px. If not defined, it takes the height of the parent element.
   * @default undefined
   */
  height: PropTypes.number,
  /**
   * The margin between the SVG and the drawing area.
   * It's used for leaving some space for extra information such as the x- and y-axis or legend.
   * Accepts an object with the optional properties: `top`, `bottom`, `left`, and `right`.
   * @default {
   *   top: 5,
   *   bottom: 5,
   *   left: 5,
   *   right: 5,
   * }
   */
  margin: PropTypes.shape({
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    top: PropTypes.number,
  }),
  /**
   * Type of plot used.
   * @default 'line'
   */
  plotType: PropTypes.oneOf(['bar', 'line']),
  /**
   * Set to `true` to highlight the value.
   * With line, it shows a point.
   * With bar, it shows a highlight band.
   * @default false
   */
  showHighlight: PropTypes.bool,
  /**
   * Set to `true` to enable the tooltip in the sparkline.
   * @default false
   */
  showTooltip: PropTypes.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.object,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  title: PropTypes.string,
  tooltip: PropTypes.shape({
    axisContent: PropTypes.elementType,
    classes: PropTypes.object,
    itemContent: PropTypes.elementType,
    slotProps: PropTypes.object,
    slots: PropTypes.object,
    trigger: PropTypes.oneOf(['axis', 'item', 'none']),
  }),
  /**
   * Formatter used by the tooltip.
   * @param {number} value The value to format.
   * @returns {string} the formatted value.
   * @default (v: number | null) => (v === null ? '' : v.toString())
   */
  valueFormatter: PropTypes.func,
  viewBox: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  /**
   * The width of the chart in px. If not defined, it takes the width of the parent element.
   * @default undefined
   */
  width: PropTypes.number,
  /**
   * The xAxis configuration.
   * Notice it is a single configuration object, not an array of configuration.
   */
  xAxis: PropTypes.shape({
    axisId: PropTypes.string,
    classes: PropTypes.object,
    data: PropTypes.array,
    dataKey: PropTypes.string,
    disableLine: PropTypes.bool,
    disableTicks: PropTypes.bool,
    fill: PropTypes.string,
    hideTooltip: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string,
    labelFontSize: PropTypes.number,
    labelStyle: PropTypes.object,
    max: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
    position: PropTypes.oneOf(['bottom', 'left', 'right', 'top']),
    scaleType: PropTypes.oneOf(['band', 'linear', 'log', 'point', 'pow', 'sqrt', 'time', 'utc']),
    slotProps: PropTypes.object,
    slots: PropTypes.object,
    stroke: PropTypes.string,
    tickFontSize: PropTypes.number,
    tickInterval: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.array, PropTypes.func]),
    tickLabelInterval: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.func]),
    tickLabelStyle: PropTypes.object,
    tickMaxStep: PropTypes.number,
    tickMinStep: PropTypes.number,
    tickNumber: PropTypes.number,
    tickSize: PropTypes.number,
    valueFormatter: PropTypes.func,
  }),
} as any;

export { SpiderChart };
