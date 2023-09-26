import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

export default function SideBar({ changePage }) {

    function handlePageClick(page) {
        changePage(page)
    }

  return (
    <Box sx={{ display: 'flex'}}>
      <Drawer
        sx={{width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box'}}}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        
        <Button variant="contained" sx={{ mt: 3 }} onClick={() => handlePageClick('create')} >Create Ticket</Button>
        <List sx={{ marginTop: 2 }}>
            <Typography variant="h6" align='center' gutterBottom fontSize={16} fontWeight={700}>
                Tickets
            </Typography>
            <Divider />

            <ListItem disablePadding onClick={() => handlePageClick('all')}>
                <ListItemButton >
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary='All Tickets' />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={() => handlePageClick('active')}>
                <ListItemButton >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary='Active' />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={() => handlePageClick('closed')}>
                <ListItemButton >
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary='Closed' />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={() => handlePageClick('archived')}>
                <ListItemButton >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary='Archived' />
                </ListItemButton>
            </ListItem>

        </List>
        <Divider />
        
      </Drawer>
    </Box>
  );
}
