import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { API_BASE_URL } from '../config.js';
import Grid from '@mui/material/Grid2';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import cifar1 from '../assets/cifar1.png';
import aml1 from '../assets/aml1.jpg';

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

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  textOverflow: 'ellipsis',
  fontSize: '1.2rem',
});

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
    <Box>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard variant="outlined" tabIndex={0} sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              alt={challengeData[0].img}
              image={aml1}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="h6" component="div">
                {challengeData[0].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {challengeData[0].description}
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            <SyledCard variant="outlined" tabIndex={0} sx={{ height: '100%' }}>
              <SyledCardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <Typography gutterBottom variant="h6" component="div">
                    {challengeData[1].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {challengeData[1].description}
                  </StyledTypography>
                </div>
              </SyledCardContent>
            </SyledCard>
            <SyledCard variant="outlined" tabIndex={0} sx={{ height: '100%' }}>
              <SyledCardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div>
                  <Typography gutterBottom variant="h6" component="div">
                    {challengeData[2].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {challengeData[2].description.map((rule, index) => (
                      <Box key={index}>
                        <Typography
                          variant={'body2'}
                          color="text.secondary"
                          sx={{ fontSize: '1.2rem' }}
                          gutterBottom
                        >
                          {rule}
                        </Typography>
                      </Box>
                    ))}
                  </StyledTypography>
                </div>
              </SyledCardContent>
            </SyledCard>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SyledCard variant="outlined" tabIndex={0} sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              alt={challengeData[3].img}
              image={cifar1}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <SyledCardContent>
              <Typography gutterBottom variant="h6" component="div">
                {challengeData[3].title}
              </Typography>
              <StyledTypography
                variant="body2"
                color="text.secondary"
                gutterBottom
              >
                {challengeData[3].description}
              </StyledTypography>
            </SyledCardContent>
          </SyledCard>
        </Grid>
      </Grid>
    </Box>
  );
}
