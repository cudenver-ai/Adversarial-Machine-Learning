import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { API_BASE_URL } from '../config.js';
import Grid from '@mui/material/Grid2';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import andy from '../assets/andy.jpg';
import sumaiya from '../assets/sumaiya.jpg';
import jessica from '../assets/jessica.jpg';

import bus from '../assets/bus.png';
import clas from '../assets/clas.png';
import cse from '../assets/cse.png';
import dsai from '../assets/dsai.png';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
}));

export default function ChallengePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/organization`)
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
        console.error('Error fetching organization data:', error);
      });
  }, []);

  return loading ? (
    <Typography align={'center'}>Loading...</Typography>
  ) : (
    <Box
      sx={{
        width: '100%',
        height: '100%',
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
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid item size={{ xs: 12, sm: 12, lg: 12 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            AI Student Association
          </Typography>
          <Typography variant="body1" fontSize={18} lineHeight={1.8}>
            The AI Student Association at CU Denver is a student-led
            organization dedicated to exploring the applications of artificial
            intelligence, data science, and machine learning. We provide a
            collaborative platform for students to connect, engage, and grow
            through hands-on projects, coding challenges, and research
            initiatives. Our mission is to bridge the gap between theory and
            practice by organizing events such as hackathons, workshops, and
            technical talks that equip students with the skills needed to excel
            in the AI industry. We focus on fostering an environment of
            innovation, collaboration, and professional development, ensuring
            that our members are prepared to tackle real-world challenges and
            contribute meaningfully to the field of AI. Whether you’re an
            experienced AI enthusiast or just getting started, the AI Student
            Association offers opportunities for learning, networking, and
            advancing your AI journey.
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, mt: 4 }}>
            This challenge was designed, and engineered by our members.
            Interested in how we did it?
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                fontSize: '1.2rem',
              }}
              startIcon={<PersonAddIcon />}
              href="https://forms.office.com/r/Wk4fW5eRba"
            >
              Become a Member
            </Button>
          </Box>
        </Grid>
        {data.map((member, index) => (
          <Grid item size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
            <SyledCard variant="outlined">
              <Box sx={{ height: '100%', alignItems: 'center', p: 2 }}>
                <CardMedia
                  component="img"
                  image={
                    member.position === 'Andy Tran'
                      ? andy
                      : member.position === 'Sumaiya Shrabony'
                        ? sumaiya
                        : member.position === 'Jessica Tan'
                          ? jessica
                          : member.logo
                  }
                  alt={member.position}
                  sx={{ width: 80, height: 80, borderRadius: '25%' }}
                />
                <Typography variant="h6">{member.position}</Typography>
                <Typography variant="body2">{member.details.name}</Typography>
                <a
                  href={member.details.major}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              </Box>
            </SyledCard>
          </Grid>
        ))}

        <Grid
          container
          size={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          sx={{
            justifyContent: 'center',
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                mt: 2,
              }}
            >
              Our Partners
            </Typography>
          </Box>
        </Grid>
        <Grid container size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Grid
            container
            size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
            sx={{
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image={dsai}
              alt="College of Liberal Arts and Sciences"
              sx={{ width: 129, height: 100 }}
            />
          </Grid>

          <Grid
            container
            size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
            sx={{
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image={clas}
              alt="College of Liberal Arts and Sciences"
              sx={{ width: 129, height: 79 }}
            />
          </Grid>

          <Grid
            container
            size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
            sx={{
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image={cse}
              alt="College of Liberal Arts and Sciences"
              sx={{ width: 129, height: 80 }}
            />
          </Grid>
          <Grid
            container
            size={{ xs: 12, sm: 6, md: 3, lg: 3 }}
            sx={{
              justifyContent: 'center',
            }}
          >
            <CardMedia
              component="img"
              image={bus}
              alt="Business School"
              sx={{ width: 153, height: 70 }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
