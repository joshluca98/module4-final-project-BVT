import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import { Label } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';





// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function CreateTicket() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };
  
    const [category, setCategory] = React.useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
      
        <Container component="main" sx={{ width: 7/16, background: 'white', borderRadius: '20px'}}>
            <Box
                sx={{
                padding: '5%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '600px',
                overflow: 'auto'
                }}
            >
        
                <Typography variant="h5" fontWeight={500} color={'black'}>
                    Create Ticket
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>  
                    <TextField
                        margin="normal"
                        required
                        id="title"
                        label="Issue Title"
                        name="title"
                        autoFocus
                    />

                    <Box sx={{ minWidth: 500, mt: 2, mb: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="type">Type</InputLabel>
                            <Select
                                required
                                labelId="type"
                                id="type"
                                value={category}
                                label="Type"
                                onChange={handleChange}
                            >
                                <MenuItem value={'bugReport'}>Bug Report</MenuItem>
                                <MenuItem value={'billingIssue'}>Billing Issue</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ mb: 1, mt: 2 }}>
                        <DatePicker label='When did the issue begin?'/>
                    </Box>
                
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="description"
                        label="Describe the issue"
                        name="issueTitle"
                        multiline
                        rows={6}
                    />

                    
                    <FormControlLabel sx={{mt: 2}} required control={<Switch />} label="High Priority" />
                  
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3}}>
                        Submit Ticket
                    </Button>   
                </Box>

            </Box>
        </Container>
        
        );
    }