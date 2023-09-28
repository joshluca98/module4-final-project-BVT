import { Box, Button, Drawer, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { MoveToInbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';

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
                    <ListItemText primary='High Priority' />
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
