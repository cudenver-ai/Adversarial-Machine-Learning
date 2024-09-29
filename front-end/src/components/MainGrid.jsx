import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from './Copyright.jsx';
import CustomizedDataGrid from './CustomizedDataGrid';
import HighlightedCard from './HighlightedCard';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import StatCard from './StatCard';
import { API_BASE_URL } from '../config.js';
import ChallengePage from '../pages/ChallengePage.jsx';
import { useInView } from 'react-intersection-observer';

export default function MainGrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/eval-data`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching eval data:', error);
      });
  }, []);

  return loading ? (
    <Typography align={'center'}>Loading...</Typography>
  ) : (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.6s ease',
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '100%',
          md: '1700px',
          lg: '1900px',
          xl: '2100px',
        },
        mx: 'auto',
        px: 2,
        overflow: 'hidden',
      }}
    >
      <ChallengePage />

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ textAlign: 'center', mt: 3 }}
      >
        <Grid size={{ sm: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography component="h2" variant="h6">
            Best Overall Metrics
          </Typography>
        </Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[0].title}
              value={Math.max(...data[0].data.slice(-30)).toString()}
              interval={data[0].interval}
              trend={data[0].trend}
              data={data[0].data.slice(-30)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[1].title}
              value={Math.max(...data[1].data.slice(-30)).toString()}
              interval={data[1].interval}
              trend={data[1].trend}
              data={data[1].data.slice(-30)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[2].title}
              value={Math.max(...data[2].data.slice(-30)).toString()}
              interval={data[2].interval}
              trend={data[2].trend}
              data={data[2].data.slice(-30)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[3].title}
              value={Math.max(...data[3].data.slice(-30)).toString()}
              interval={data[3].interval}
              trend={data[3].trend}
              data={data[3].data.slice(-30)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
            <StatCard
              title={data[4].title}
              value={Math.max(...data[4].data.slice(-30)).toString()}
              interval={data[4].interval}
              trend={data[4].trend}
              data={data[4].data.slice(-30)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography component="h2" variant="h6">
                All Submissions
              </Typography>
            </Box>
            <CustomizedDataGrid />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
