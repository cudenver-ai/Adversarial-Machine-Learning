import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import TextField from '@mui/material/TextField';
import { API_BASE_URL } from '../config.js';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

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
  gap: 2,
  padding: 10,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

export default function HighlightedCard() {
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
    <Box>
      <SyledCard variant="outlined" sx={{ height: '100%' }}>
        <SyledCardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Typography variant="h6" component="div">
            Team Submission
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Please make sure your upload is .pkt files only.
          </Typography>
          <TextField
            label="Team Name"
            variant="outlined"
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
          >
            Upload
          </Button>
        </SyledCardContent>
      </SyledCard>
    </Box>
  );
}
