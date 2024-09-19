import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { API_BASE_URL } from '../config.js';
import Box from '@mui/material/Box';

export default function CustomizedDataGrid() {
    const [rows, setRows] = useState([]);
    const [setLoading] = useState(true);

    useEffect(() => {
      // Fetch data from the backend
      fetch(`${API_BASE_URL}/api/team-data`)
        .then((response) => response.json())
        .then((data) => {
          setRows(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, []);

    const columns = [
      { field: 'id', headerName: 'Submission #', width: 120 },
      { field: 'TeamName', headerName: 'Team Name', width: 200 },
      { field: 'LastSubmission', headerName: 'Submission Time', width: 200 },
      { field: 'SuccessRate', headerName: 'Success Rate', width: 150 },
      { field: 'PerturbationMagnitude', headerName: 'Perturbation Magnitude', width: 200 },
      { field: 'VisualSimilarity', headerName: 'Visual Similarity', width: 150 },
      { field: 'TotalScore', headerName: 'Total Score', width: 150 },
      { field: 'Rank', headerName: 'Rank', width: 100 },
    ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
    <DataGrid
      autoHeight={false}
      checkboxSelection
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
