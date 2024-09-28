import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { API_BASE_URL } from '../config.js';
import Grid from '@mui/material/Grid2';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import panda from '../assets/panda.png';
import ReactMarkdown from 'react-markdown';


const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
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

export default function HomePage() {
  const [teamsData, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/home-page`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((teamsData) => {
        setData(teamsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching eval data:', error);
        // setLoading(false);
      });
  }, []);

  return (
    loading ? (<Typography align={'center'}>Loading...</Typography>) :
      (
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
      <Grid container spacing={3}  sx={{ mb: 4 }}>
        {teamsData.map((team, index) => (
          <Grid size={{ xs: 12, sm: 12, lg: 12 }}  key={index}>
            <SyledCard variant="outlined">
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <Box>
                  <Typography variant="h2" align={'center'}>{team.name}</Typography>
                  <Typography variant="body1" fontSize={30}>
                    {team.captain}
                  </Typography>
                  <CardMedia
                    component="img"
                    alt={team.logo}
                    image={panda}
                    sx={{
                      height: 'auto',
                      // aspectRatio: { sm: '16 / 9', md: '' },
                    }}
                  />
                  <Typography variant="body1" fontSize={30} sx={{ whiteSpace: 'pre-line' }}>
                    <ReactMarkdown> {team.description} </ReactMarkdown>
                  </Typography>
                </Box>
              </Box>

              <SyledCardContent>


                {/*<Box sx={{ my: 2 }}>*/}
                {/*  <Typography variant="h6">Members</Typography>*/}
                {/*  {team.members.map((member, index) => (*/}
                {/*    <Typography variant="body1" key={index}>*/}
                {/*      {member.name} - {member.major}*/}
                {/*    </Typography>*/}
                {/*  ))}*/}
                {/*</Box>*/}
              </SyledCardContent>
            </SyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
      )
  );
}
