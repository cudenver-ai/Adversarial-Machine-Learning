import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { LineChart } from '@mui/x-charts/LineChart';
import { API_BASE_URL } from '../config.js';

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString('en-US', {
    month: 'short',
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function SessionsChart() {
  const theme = useTheme();
  const daysInMonth = getDaysInMonth(10, 2024);
  const [visitsData, setVisitsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const percentageChange = useMemo(() => {
    if (visitsData.length === 0 || visitsData[0].data.length < 2) {
      return 0;
    }

    const data = visitsData[0].data;
    const lastValue = data[data.length - 1];
    const secondLastValue = data[data.length - 2];

    const change = ((lastValue - secondLastValue) / secondLastValue) * 100;
    return Math.ceil(change);
  }, [visitsData]);
  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/visits`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setVisitsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching eval data:', error);
      });
  }, []);

  return loading ? (
    <Typography align={'center'}>Loading...</Typography>
  ) : (
    <Card variant="outlined" sx={{ width: '100%', height: '100%' }}>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Typography component="h2" variant="subtitle" gutterBottom>
          Site Visits
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              {visitsData.length > 0
                ? visitsData[0].data.reduce((acc, curr) => acc + curr, 0)
                : 0}
            </Typography>
            <Chip
              size="small"
              color={percentageChange >= 0 ? 'success' : 'error'}
              label={`${percentageChange}%`}
            />
          </Stack>

          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Visits per day
          </Typography>
        </Stack>

        <LineChart
          colors={colorPalette}
          xAxis={[
            {
              scaleType: 'point',
              data: daysInMonth,
              tickInterval: (index, i) => (i + 1) % 5 === 0,
            },
          ]}
          series={visitsData}
          height={250}
          margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          sx={{
            '& .MuiAreaElement-series-uploads': {
              fill: "url('#uploads')",
            },
            '& .MuiAreaElement-series-visits': {
              fill: "url('#visits')",
            },
            '& .MuiAreaElement-series-unique': {
              fill: "url('#unique')",
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <AreaGradient color={theme.palette.primary.dark} id="uploads" />
          <AreaGradient color={theme.palette.primary.main} id="visits" />
          <AreaGradient color={theme.palette.secondary.main} id="unique" />
        </LineChart>
      </CardContent>
    </Card>
  );
}
