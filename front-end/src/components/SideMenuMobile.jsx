import * as React from 'react';
import PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import logo from '../assets/club.png';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

function SideMenuMobile({ open, toggleDrawer }) {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Box
              sx={{
                width: '3rem',
                height: '3rem',
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
                  width: '2.5rem',
                  height: '2.5rem',
                  filter: mode === 'dark' ? 'invert(100%)' : 'none',
                }}
              />
            </Box>
            <Typography component="p" variant="h6" sx={{ fontWeight: 'bold' }}>
              AI Student Association
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        <Stack sx={{ p: 2 }}></Stack>
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
