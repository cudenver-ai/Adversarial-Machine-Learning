import * as React from 'react';
import GettingStartedPage from './pages/GettingStartedPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import OrganizersPage from './pages/OrganizersPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import AppNavbar, { Toolbar } from './components/AppNavbar';
import AppTheme from '../theme/AppTheme.jsx';
import MainGrid from './components/MainGrid';
import Container from '@mui/material/Container';
import Copyright from './components/Copyright.jsx';

export default function Dashboard(props) {
  const [currentPage, setCurrentPage] = React.useState('home');

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          my: 2,
          gap: 2,
          alignItems: 'center',
        }}
      >
        <AppNavbar setCurrentPage={setCurrentPage} />
        <Toolbar />

        {currentPage === 'main' && <MainGrid />}
        {currentPage === 'data' && <GettingStartedPage />}
        {currentPage === 'organizers' && <OrganizersPage />}
        {currentPage === 'problem' && <ProblemPage />}
        {currentPage === 'home' && <HomePage />}
      </Container>
      <Copyright sx={{ my: 4 }} />
    </AppTheme>
  );
}
