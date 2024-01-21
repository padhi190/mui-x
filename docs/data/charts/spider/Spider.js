import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SpiderChart } from '@mui/x-charts/SpiderChart';

export default function AreaSparkLine() {
  return (
    <Stack direction="row" sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <SpiderChart data={[3, -10, -2, 5, 7, -2, 4, 6]} height={100} area />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <SpiderChart
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          height={100}
          curve="natural"
          area
        />
      </Box>
    </Stack>
  );
}
