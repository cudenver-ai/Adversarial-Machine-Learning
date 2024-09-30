import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import TextField from '@mui/material/TextField';
import { API_BASE_URL } from '../config.js';
import Box from '@mui/material/Box';

export default function HighlightedCard() {
  const [file, setFile] = useState(null);
  const [teamName, setTeamName] = useState('');

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.pkl')) {
        alert('Invalid file type. Please upload a .pkl file.');
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleSubmit = async () => {
    if (!file || teamName.trim() === '') {
      alert('Please select a .pkl file and enter a team name!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('teamName', teamName);

    try {
      const response = await fetch(`${API_BASE_URL}/api/upload-images`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        setFile(null);
        setTeamName('');
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <Box>
      <Typography variant="h6">Team Submission</Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1 }}>
        Please make sure your type your team name correctly.
      </Typography>
      <TextField
        label="Team Name"
        required
        fullWidth
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <input
        type="file"
        accept=".pkl"
        onChange={handleFileUpload}
        style={{ display: 'block', marginBottom: '16px', marginTop: '16px' }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        size="Large"
        color="primary"
        endIcon={<ChevronRightRoundedIcon />}
      >
        Upload
      </Button>
    </Box>
  );
}
