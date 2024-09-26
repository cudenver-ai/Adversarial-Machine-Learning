import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { API_BASE_URL } from '../config.js';

export default function HighlightedCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [files, setFiles] = useState([]);
  const [teamName, setTeamName] = useState('');

  const handleFileUpload = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);
    }
  };

  const handleSubmit = async () => {
    if (files.length === 0 || teamName.trim() === '') {
      alert('Please select files and enter a team name!');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    formData.append('teamName', teamName); 

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload-images`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Files uploaded successfully!');
      } else {
        alert('Failed to upload files.');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files.');
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <InsightsRoundedIcon />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          Upload Images
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Please make sure your images are in .png format
        </Typography>
        <TextField
          label="Team Name"
          variant="outlined"
          fullWidth
          required
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiInputLabel-root': {
              transform: 'translate(14px, 20px) scale(1)',
            },
            '& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink':
              {
                transform: 'translate(14px, -6px) scale(0.75)',
              },
          }}
          slotProps={{
            inputLabel: {
              shrink: teamName.length > 0,
            },
          }}
        />

        <input
          type="file"
          webkitdirectory="true"
          directory="true"
          multiple
          onChange={handleFileUpload}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
          fullWidth={isSmallScreen}
        >
          Upload
        </Button>
      </CardContent>
    </Card>
  );
}
