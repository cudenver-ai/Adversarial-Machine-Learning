import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CustomizedDataGrid from './CustomizedDataGrid';
import PageViewsBarChart from './PageViewsBarChart';
import SessionsChart from './SessionsChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import StatCard from './StatCard';
import { API_BASE_URL } from '../config.js';
import HighlightedCard from '../components/HighlightedCard.jsx';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import HighlightedCardDisabled from './HighlightCardDisabled.jsx';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

export default function MainGrid({ setCurrentPage }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true });
  const [updateTime, setUpdateTime] = useState([]);
  const [timeLoading, setTimeLoading] = useState(true);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/update-timestamp`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUpdateTime(data);
        setTimeLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching eval data:', error);
      });
  }, []);

  return loading ? (
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
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard sx={{ height: '100%' }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Submission Guidelines
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Ensure your submission follows these guidelines:
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>
                    <strong>File format</strong>: .pkl
                  </li>
                  <li>
                    <strong>Maximum file size</strong>: 100MB
                  </li>
                  <li>For more details check out the problem page.</li>
                </ul>
              </Typography>
            </SyledCardContent>
            <Divider />
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Upload Your Submission
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Please upload your file in .pkl format,
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <HighlightedCardDisabled />
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                *All metrics below are updated every hour.
              </Typography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard sx={{ height: '100%' }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Key Dates
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Keep the following dates in mind
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>
                    <strong>Challenge Start:</strong> October 1st, 2024
                  </li>
                  <li>
                    <strong>Submission Deadline:</strong> October 29th, 2024,
                    11:59 PM 
                  </li>
                  <li>
                    <strong>CU Denver Data Science and AI Symposium:</strong>{' '}
                    November 1st, 2024.{' '}
                    <a
                      style={{
                        cursor: 'pointer',
                        borderBottom: '1px solid #3f51b5',
                      }}
                      href="https://datascience.ucdenver.edu/events/symposium"
                    >
                      DSAI
                    </a>
                  </li>
                  <li>
                    <strong>Winners Notified:</strong> October 30th, 2024. Their
                    solutions will be presented during the symposium.
                  </li>
                </ul>
              </Typography>
            </SyledCardContent>
            <Divider />
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Need Help?
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                If you encounter any issues, have questions, or need help,
                please use one of the following methods:
              </Typography>
              <ul
                style={{
                  paddingLeft: '20px',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Challenge Description{' '}
                  <a
                    onClick={() => handlePageChange('problem')}
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #3f51b5',
                    }}
                  >
                    Challenge
                  </a>
                </li>
                <li>
                  Ask us on{' '}
                  <a
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #3f51b5',
                    }}
                    href="https://discord.gg/VG28u28bwK"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  Email us at{' '}
                  <a
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #3f51b5',
                    }}
                    href="mailto:aisa@ucdenver.edu"
                  >
                    aisa@ucdenver.edu
                  </a>
                </li>
              </ul>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Box sx={{ textAlign: 'center', mb: 2 }} align={'center'}>
          <Typography component="h2" variant="h4">
            Loading metrics...
          </Typography>
        </Box>

      </Grid>
    </Box>
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
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard sx={{ height: '100%' }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Submission Guidelines
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Ensure your submission follows these guidelines:
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>
                    <strong>File format</strong>: .pkl
                  </li>
                  <li>
                    <strong>Maximum file size</strong>: 100MB
                  </li>
                  <li>For more details check out the problem page.</li>
                </ul>
              </Typography>
            </SyledCardContent>
            <Divider />
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Upload Your Submission
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Please upload your file in .pkl format,
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <HighlightedCard />
              </Box>
              {timeLoading ? (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  *All metrics below are updated every hour.
                </Typography>
              ) : (updateTime.success ? (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    *All metrics below are updated every hour. Last update: {updateTime.timestamp}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    *All metrics below are updated every hour.
                  </Typography>
                ))}
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard sx={{ height: '100%' }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Key Dates
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Keep the following dates in mind
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>
                    <strong>Challenge Start:</strong> October 1st, 2024
                  </li>
                  <li>
                    <strong>Submission Deadline:</strong> October 29th, 2024,
                    11:59 PM
                  </li>
                  <li>
                    <strong>CU Denver Data Science and AI Symposium:</strong>{' '}
                    November 1st, 2024.{' '}
                    <a
                      style={{
                        cursor: 'pointer',
                        borderBottom: '1px solid #3f51b5',
                      }}
                      href="https://datascience.ucdenver.edu/events/symposium"
                    >
                      DSAI
                    </a>
                  </li>
                  <li>
                    <strong>Winners Notified:</strong> October 30th, 2024. Their
                    solutions will be presented during the symposium.
                  </li>
                </ul>
              </Typography>
            </SyledCardContent>
            <Divider />
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Need Help?
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                If you encounter any issues, have questions, or need help,
                please use one of the following methods:
              </Typography>
              <ul
                style={{
                  paddingLeft: '20px',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Challenge Description{' '}
                  <a
                    onClick={() => handlePageChange('problem')}
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #3f51b5',
                    }}
                  >
                    Challenge
                  </a>
                </li>
                <li>
                  Ask us on{' '}
                  <a
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #3f51b5',
                    }}
                    href="https://discord.gg/VG28u28bwK"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  Email us at{' '}
                  <a
                    style={{
                      cursor: 'pointer',
                      borderBottom: '1px solid #3f51b5',
                    }}
                    href="mailto:aisa@ucdenver.edu"
                  >
                    aisa@ucdenver.edu
                  </a>
                </li>
              </ul>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ sm: 12, md: 8 }}>
          <SessionsChart />
        </Grid>
        <Grid size={{ sm: 12, md: 4 }}>
          <PageViewsBarChart />
        </Grid>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography component="h2" variant="h4">
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
            <Box sx={{ textAlign: 'left', mb: 2 }}>
              <Typography component="h2" variant="h4">
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

MainGrid.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};
