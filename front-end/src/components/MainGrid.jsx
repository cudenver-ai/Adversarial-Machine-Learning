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

export default function MainGrid() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  console.log(data);

  return (
    <Box
      sx={{
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
      }}
    >
      <ChallengePage />

      <Typography component="h2" variant="h6" sx={{ mt: 4, mb: 2 }}>
        Best Overall Metrics
      </Typography>

      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
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
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <HighlightedCard />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} lg={9}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography component="h2" variant="h6">
              All Submissions
            </Typography>
          </Box>
          <CustomizedDataGrid />
        </Grid>
      </Grid>
      <Copyright sx={{ my: 4 }} />
    </Box>
  );
}
