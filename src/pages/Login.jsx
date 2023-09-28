import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';



export default function Login({handleLogin}) {
  
  const [loginInfo, setLoginInfo] = React.useState({
    email: null,
    password: null
  });

  const [loginFail, setLoginFail] = React.useState(false)

  const handleChange = (event) => {
    const name = event.target.name
    const newInput = {[name]: event.target.value}
    setLoginInfo(prevInput => ({...prevInput, ...newInput}));
  };



  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(loginInfo.email === "josh@bvt.edu" && loginInfo.password) {
      handleLogin(true)
      navigate('/');
    } else {
      setLoginFail(true)
      setLoginInfo({ email: '', password: '' });
    }

  };

  return (

    
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              autoComplete="off"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={handleChange}
              value={loginInfo.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={loginInfo.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              
            </Grid>
            
          </Box>
          {loginFail && <Typography marginTop={3} variant='p' color={'red'}>Login Failed. Please Try Again.</Typography>}

        </Box>
      </Container>
    
  );
}