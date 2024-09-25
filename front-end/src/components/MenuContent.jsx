import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';

const mainListItems = [
  { text: 'Challenge Registration', icon: <HowToRegRoundedIcon />, link: 'https://forms.office.com/r/Xb3MZjTibT' },
  { text: 'Become a Member', icon: <PeopleRoundedIcon />, link: 'https://forms.office.com/r/Wk4fW5eRba' },
  { text: 'Learn More', icon: <AssignmentRoundedIcon />, link: 'https://ucdenver.campuslabs.com/engage/organization/aisa' },
  { text: 'Contact Us', icon: <AssignmentRoundedIcon />, link: 'mailto:aisa@ucdenver.edu' },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component="a"    
              href={item.link} 
              selected={index === 0}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
