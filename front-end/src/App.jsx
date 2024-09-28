import * as React from 'react';
import TeamsPage from './pages/TeamsPage.jsx';
import GettingStartedPage from './pages/GettingStartedPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import OrganizersPage from './pages/OrganizersPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppNavbar, { Toolbar } from './components/AppNavbar';
import AppTheme from '../theme/AppTheme.jsx';
import MainGrid from './components/MainGrid';

export default function Dashboard(props) {
  const [currentPage, setCurrentPage] = React.useState('home');

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: '100%',
            md: '1700px',
            lg: '1900px',
            xl: '2100px',
          },
          minWidth: {
            xs: '300px',
            sm: '600px',
            md: '900px',
            lg: '1200px',
            xl: '1500px',
          },
          mx: 'auto',
          px: 2,
          overflowX: 'hidden',
        }}
      >
        <AppNavbar setCurrentPage={setCurrentPage} />
        <Toolbar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            maxWidth: '100%',
            overflow: 'auto',
            pt: '24px',
          }}
        >
          {currentPage === 'main' && <MainGrid />}
          {currentPage === 'data' && <GettingStartedPage />}
          {currentPage === 'organizers' && <OrganizersPage />}
          {currentPage === 'problem' && <ProblemPage />}
          {currentPage === 'home' && <HomePage />}
        </Box>
      </Box>
    </AppTheme>
  );
}
