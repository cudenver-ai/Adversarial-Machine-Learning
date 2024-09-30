import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HeroBanner({ title, subtitle, imageUrl, color }) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: { xs: '40px 20px', md: '70px 40px' },
        color: { color },
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        mb: 4,
      }}
    >
      <Box sx={{ px: 4, textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', mb: 2, fontSize: '3rem' }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'medium', fontSize: '2rem' }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
