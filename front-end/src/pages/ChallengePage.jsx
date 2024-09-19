import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { API_BASE_URL } from '../config.js';

export default function ChallengePage() {
  const [challengeData, setChallengeData] = useState(null);

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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '800px', // Set max width
          padding: '16px',
          boxShadow: 3,
          borderRadius: '12px',
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5" component="h2" align="center">
              {challengeData.title}
            </Typography>
            <Typography variant="body1" align="center">
              {challengeData.intro}
            </Typography>
            {challengeData.content.map((section, index) => (
              <Box key={index} sx={{ mt: 2 }}>
                <Typography variant="h6">{section.section}</Typography>
                <Typography variant="body2">{section.text}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
