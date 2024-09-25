import * as React from 'react';
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
import { Link } from 'react-router-dom';
import ColorModeIconDropdown from '../../theme/ColorModeIconDropdown';
import logo from '../assets/club.png';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';



const Toolbar = styled(MuiToolbar)({
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

export default function AppNavbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
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
            <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
              Decoy Challenge
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button component={Link} to="/" variant="text" color="info" size="small">
                Main
              </Button>
              <Button component={Link} to="/challenge" variant="text" color="info" size="small">
                Challenge
              </Button>
              <Button component={Link} to="/teams" variant="text" color="info" size="small">
                Teams
              </Button>
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

export function CustomIcon() {
  return (
    <Box 
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        bgcolor: 'white',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '0px solid',
        borderColor: 'black',
        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)',
        
      }}
    >
        <img 
        src={logo} 
        alt="custom icon" 
        style={{ width: '3rem', height: '3rem' }}
      />
    </Box>
  );
}
