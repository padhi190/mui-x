import * as React from 'react';
import { SpiderChart as Spider } from '@mui/x-charts/SpiderChart';

const data = [
  [
    { key: 'Battery', value: 22 },
    { key: 'Brand', value: 28 },
    { key: 'Contract', value: 29 },
    { key: 'Design', value: 17 },
    { key: 'Screen', value: 22 },
    { key: 'Price', value: 21 },
  ],
  [
    { key: 'Battery', value: 27 },
    { key: 'Brand', value: 16 },
    { key: 'Contract', value: 25 },
    { key: 'Design', value: 13 },
    { key: 'Screen', value: 13},
    { key: 'Price', value: 25},
  ],
  [
    { key: 'Battery', value: 26 },
    { key: 'Brand', value: 10 },
    { key: 'Contract', value: 30 },
    { key: 'Design', value: 24 },
    { key: 'Screen', value: 29},
    { key: 'Price', value: 15},
  ],
];
export default function SpiderChartDemo() {
  return (
    <Spider
      series={data}
      width={400}
      height={400}
    />
  );
}
