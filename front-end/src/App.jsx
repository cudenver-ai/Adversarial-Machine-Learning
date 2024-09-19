import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage.jsx';
import ChallengePage from './pages/ChallengePage.jsx';
import TeamsPage from './pages/TeamsPage.jsx';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar.jsx';
import AppTheme from '../shared-theme/AppTheme.jsx';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Router>
      <Box sx={{ display: 'flex', pt: '64px' }}> {/* Add padding to prevent overlap */}
      <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            paddingTop: '20px', // Optional: Add additional padding
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >


          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/teams" element={<TeamsPage />} />
          </Routes>


          </Stack>
        </Box>
      </Box>
      </Router>
    </AppTheme>
  );
}

