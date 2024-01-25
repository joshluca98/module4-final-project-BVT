import { useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

export default function LoggedOut() {
  
const navigate = useNavigate();

useEffect(() => {
  // Set up a timer to navigate to the home page after 3 seconds
  const timeoutId = setTimeout(() => {
    navigate('/home');
  }, 1000);

  // Clear the timeout if the component is unmounted
  return () => clearTimeout(timeoutId);
}, [navigate]);

return (
    
      
     <p>You have been logged out. Returning to home page...</p>
       
  );
}