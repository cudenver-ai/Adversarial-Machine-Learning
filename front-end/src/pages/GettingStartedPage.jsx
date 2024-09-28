import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { API_BASE_URL } from '../config.js';
import Grid from '@mui/material/Grid2';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';

const teamsData = [
  {
    logo: 'https://picsum.photos/100/100?random=101',
    name: 'AI Pioneers DATASET',
    description:
      'Advancing adversarial AI techniques with cutting-edge research.',
    captain: { name: 'Alice Chen', major: 'Computer Science' },
    members: [
      { name: 'Bob Kim', major: 'Physics' },
      { name: 'Charlie Liu', major: 'Psychology' },
      { name: 'Dana White', major: 'Biology' },
      { name: 'Ethan Scott', major: 'Philosophy' },
    ],
  },
  {
    logo: 'https://picsum.photos/100/100?random=102',
    name: 'DeepVision',
    description:
      'Experts in computer vision and robust image classification models.',
    captain: { name: 'Nina Patel', major: 'Electrical Engineering' },
    members: [
      { name: 'Frank Miller', major: 'Sociology' },
      { name: 'George Wu', major: 'Environmental Science' },
      { name: 'Hannah Lee', major: 'Chemistry' },
      { name: 'Ivy Garcia', major: 'Linguistics' },
    ],
  },
  {
    logo: 'https://picsum.photos/100/100?random=103',
    name: 'QuantumCoders',
    description:
      'Innovating with quantum computing and AI synergy for secure systems.',
    captain: { name: 'Jason Brown', major: 'Physics' },
    members: [
      { name: 'Kaitlyn Smith', major: 'Cognitive Science' },
      { name: 'Liam Rogers', major: 'Anthropology' },
      { name: 'Maya Johnson', major: 'Psychology' },
      { name: 'Nick Baker', major: 'Biochemistry' },
    ],
  },
  {
    logo: 'https://picsum.photos/100/100?random=104',
    name: 'CipherTech',
    description:
      'Specializing in encryption, security protocols, and adversarial defenses.',
    captain: { name: 'Olivia Parker', major: 'Cybersecurity' },
    members: [
      { name: 'Paul Adams', major: 'Social Work' },
      { name: 'Quinn Taylor', major: 'Economics' },
      { name: 'Rachel Wilson', major: 'Political Science' },
      { name: 'Sam Thompson', major: 'International Relations' },
    ],
  },
  {
    logo: 'https://picsum.photos/100/100?random=105',
    name: 'NeuralNexus',
    description:
      'Developing advanced neural networks to tackle adversarial threats.',
    captain: { name: 'Tara Bell', major: 'Artificial Intelligence' },
    members: [
      { name: 'Uma Davis', major: 'Psychology' },
      { name: 'Victor Green', major: 'Sociology' },
      { name: 'Wendy Hall', major: 'Biotechnology' },
      { name: 'Xander Young', major: 'Computer Science' },
    ],
  },
  {
    logo: 'https://picsum.photos/100/100?random=106',
    name: 'RoboDefenders',
    description:
      'Creating resilient robotic systems using adversarial machine learning.',
    captain: { name: 'Yara Hughes', major: 'Robotics' },
    members: [
      { name: 'Zane Murphy', major: 'Psychology' },
      { name: 'Ava Martinez', major: 'Environmental Studies' },
      { name: 'Brandon Lee', major: 'Sociology' },
      { name: 'Chloe Carter', major: 'Mechanical Engineering' },
    ],
  },
];

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

export default function GettingStartedPage() {
  // return (
  //   <Typography>This is the getting started page</Typography>
  // )
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
      <Grid container spacing={3} columns={12} sx={{ mb: 4 }}>
        {teamsData.map((team, index) => (
          <Grid size={{ xs: 12, sm: 12, lg: 12 }} key={index}>
            <SyledCard variant="outlined">
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <CardMedia
                  component="img"
                  image={team.logo}
                  alt={team.name}
                  sx={{ width: 80, height: 80, borderRadius: '50%', mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">{team.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {team.description}
                  </Typography>
                </Box>
              </Box>

              <SyledCardContent>
                <Typography variant="h6">Team Captain</Typography>
                <Typography variant="body1">
                  {team.captain.name} - {team.captain.major}
                </Typography>

                <Box sx={{ my: 2 }}>
                  <Typography variant="h6">Members</Typography>
                  {team.members.map((member, index) => (
                    <Typography variant="body1" key={index}>
                      {member.name} - {member.major}
                    </Typography>
                  ))}
                </Box>
              </SyledCardContent>
            </SyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
