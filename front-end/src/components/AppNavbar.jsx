import React from 'react';
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MuiToolbar from '@mui/material/Toolbar';
import { tabsClasses } from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SideMenuMobile from './SideMenuMobile';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../../theme/ColorModeIconDropdown';
import logo from '../assets/club.png';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useColorScheme } from '@mui/material/styles';
import GettingStartedPage from '../pages/GettingStartedPage.jsx';
import OrganizersPage from '../pages/OrganizersPage.jsx';
import ProblemPage from '../pages/ProblemPage.jsx';
import HomePage from '../pages/HomePage.jsx';

export const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

export default function AppNavbar({ setCurrentPage }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: 1100,
      }}
    >
      <StyledToolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            width: '100%',
          }}
        >
          <Stack direction="row" spacing={3} sx={{ justifyContent: 'center' }}>
            <CustomIcon />
            <Typography
              variant="h4"
              component="h1"
              sx={{ color: 'text.primary' }}
            >
              Decoy Challenge
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                color="info"
                size="small"
                onClick={() => setCurrentPage('home')}
              >
                Home
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => setCurrentPage('problem')}
              >
                Problem
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => setCurrentPage('data')}
              >
                Getting Started
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => setCurrentPage('main')}
              >
                Submit
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => setCurrentPage('organizers')}
              >
                Organizers
              </Button>
            </Box>
            {/* For smaller screens: Mobile menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuRoundedIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    width: '200px',
                  },
                }}
              >
                <MenuItem onClick={() => handlePageChange('home')}>
                  Home
                </MenuItem>
                <MenuItem onClick={() => handlePageChange('problem')}>
                  Problem
                </MenuItem>
                <MenuItem onClick={() => handlePageChange('data')}>
                  Getting Started
                </MenuItem>
                <MenuItem onClick={() => handlePageChange('main')}>
                  Submit
                </MenuItem>
                <MenuItem onClick={() => handlePageChange('organizers')}>
                  Organizers
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
            <ColorModeIconDropdown />
            <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuRoundedIcon />
            </MenuButton>
            <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
          </Stack>
        </Stack>
      </StyledToolbar>
    </AppBar>
  );
}

AppNavbar.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export function CustomIcon() {
  const { mode } = useColorScheme();

  return (
    <Box
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '0px solid',
        borderColor: mode === 'dark' ? 'white' : 'black',
        bgcolor: mode === 'dark' ? 'transparent' : 'white',
        boxShadow:
          mode === 'dark'
            ? 'inset 0 2px 5px rgba(0, 0, 0, 0.3)'
            : 'inset 0 2px 5px rgba(255, 255, 255, 0.3)',
      }}
    >
      <img
        src={logo}
        alt="custom icon"
        style={{
          width: '3rem',
          height: '3rem',
          filter: mode === 'dark' ? 'invert(100%)' : 'none',
        }}
      />
    </Box>
  );
}
