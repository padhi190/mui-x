import * as React from 'react';
import { SpiderChart as Spider } from '@mui/x-charts/SpiderChart';

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

const categories = ['battery', 'contract', 'design', 'build', 'screen', 'color'];

const iphone = [2, 5.5, 2, 8.5, 1.5, 5]
const samsung = [3, 3.5, 7, 4.5, 2.5, 2]
const nokia = [5, 1.5, 9, 1.5, 5.5, 6]

export default function SpiderChartDemo() {
  return (
    <Spider
      xAxis={[{scaleType: 'band' ,data: categories }]}
      series={[
        {
          id: 'iphone',
          data: iphone,
        },{
          id: 'samsung',
          data: samsung,
        },{
          id: 'nokia',
          data: nokia,
        },
      ]}
      width={500}
      height={300}
    />
  );
}
