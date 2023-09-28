import React from 'react';
import { AppBar,Box,Toolbar,IconButton,Typography,Menu,Container,Avatar,Button,Tooltip,MenuItem} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../assets/bvt-logo.png';


const pages = [];

let settings;
settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function NavBar({isLoggedIn, changePage, handleLogin}) {

  const navigate = useNavigate();
  
  if (isLoggedIn){
    settings = ['Logout'];
  } else {
    settings = ['Login']
  }
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (event) => {
    if(event.target.innerHTML === "Logout"){
      handleLogin(false)
      console.log(isLoggedIn);
    }
    if(event.target.innerHTML === "Login"){
      navigate('/login');
    }

    setAnchorElUser(null);
  };

  function handlePageClick(page) {
    changePage(page)
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, marginBottom: 20 }} >
      <Container maxWidth=''>
        <Toolbar disableGutters>
          <BugReportIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 75}} />
          <Typography
            variant="h5"
            component="a"
            href="#"
            onClick={() => handlePageClick('home')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
              Virtual Help Desk
          </Typography>
            
          {/* USED FOR ADDING PAGES TO THE APPBAR */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="BVT" src={UserIcon} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}