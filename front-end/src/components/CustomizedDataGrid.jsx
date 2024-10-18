import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { API_BASE_URL } from '../config.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CustomizedDataGrid() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/team-data`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching eval data:', error);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'Submission', width: 120 },
    { field: 'TeamName', headerName: 'Team Name', width: 150 },
    { field: 'LastSubmission', headerName: 'Submission Time', width: 170 },
    { field: 'Rank', headerName: 'Submission Rank', width: 170 },
    { field: 'SuccessRate', headerName: 'Success Rate', width: 150 },
    {
      field: 'PerturbationMagnitude',
      headerName: 'Perturbation Magnitude',
      width: 170,
    },
    { field: 'VisualSimilarity', headerName: 'Visual Similarity', width: 150 },
    {
      field: 'AverageConfidence',
      headerName: 'Average Confidence',
      width: 150,
    },
    { field: 'ConfidenceGap', headerName: 'Confidence Gap', width: 150 },
    { field: 'TotalScore', headerName: 'Total Score', width: 150 },
  ];

  return loading ? (
    <Typography align={'center'}>Loading...</Typography>
  ) : (
    <Box
      sx={{
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: 1100,
      }}
    >
      <DataGrid
        autoHeight={false}
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
    </Box>
  );
}
