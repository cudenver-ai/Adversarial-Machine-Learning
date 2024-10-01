import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { API_BASE_URL } from '../config.js';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import HighlightedCard from '../components/HighlightedCard.jsx';

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

export default function ChallengePage({ setCurrentPage }) {
  const [challengeData, setChallengeData] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/challenge`)
      .then((response) => response.json())
      .then((data) => setChallengeData(data))
      .catch((error) => console.error('Error fetching challenge data:', error));
  }, []);

  if (!challengeData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard variant="outlined" tabIndex={0} sx={{ height: '100%' }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Submission Guidelines
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Ensure your submission follows these guidelines:
              </Typography>
              <ul
                style={{
                  paddingLeft: '20px',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                }}
              >
                <li>File format: .pkl</li>
                <li>Maximum file size: 100MB</li>
                <li>For more details check out the problem page.</li>
              </ul>
            </SyledCardContent>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Upload Your Submission
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                Please upload your file in .pkl format. Ensure that it follows
                the required file structure.
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <HighlightedCard />
              </Box>
            </SyledCardContent>
          </SyledCard>
        </Grid>

        {/* Submission Guidelines and Support Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <SyledCard variant="outlined" tabIndex={0} sx={{ height: '100%' }}>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 4 }}>
                Key Dates
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                <ul style={{ paddingLeft: '20px' }}>
                  <li>
                    <strong>Challenge Start:</strong> October 1st, 2024
                  </li>
                  <li>
                    <strong>Submission Deadline:</strong> October 29th, 2024,
                    11:59 PM (CET)
                  </li>
                  <li>
                    <strong>CU Denver Data Science and AI Symposium:</strong>{' '}
                    November 1st, 2024
                  </li>
                  <li>
                    <strong>Winners Notified:</strong> October 30th, 2024. Their
                    solutions will be presented during the symposium.
                  </li>
                </ul>
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                *All metrics below are updated every hour.
              </Typography>
            </SyledCardContent>
            <SyledCardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 4 }}>
                Need Help?
              </Typography>
              <Typography variant="body1" fontSize={18} lineHeight={1.8}>
                If you encounter any issues, you can check out the FAQ or
                contact us for assistance.
              </Typography>
              <ul
                style={{
                  paddingLeft: '20px',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                }}
              >
                <li>
                  Visit the <a href="/Getting Started">FAQ</a>
                </li>
                <li>
                  Email us at{' '}
                  <a href="mailto:support@example.com">support@example.com</a>
                </li>
              </ul>
            </SyledCardContent>
          </SyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
