import * as React from 'react';
import { Button, TextField, FormControlLabel, Box, Typography, Container, Switch, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CreateTicket() {

    const [userInput, setUserInput] = React.useState({
         issue_title: "",
         type: "",
         date: "",
         description: "",
         priority: "",
         status: "Open"
     });

    async function createTicket(){
        try {
            const response = await fetch('http://localhost:5000/createticket', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({...userInput, status: "Open"}),
            });
            if (response.ok) {
              console.log('Ticket created successfully', userInput);
            } else {
              console.error('Failed to create ticket');
            }
          } catch (error) {
            console.error('Error creating ticket:', error);
          }
        };

    const handleSubmit = (event) => {
        event.preventDefault();
        createTicket();
        setUserInput({
            title: "",
             type: "",
             date: "",
             description: "",
             highPriority: ""
         })
    };
    
      const handleChange = (event) => {
        const name = event.target.name
        const newInput = {[name]: event.target.value}
        setUserInput(prevInput => ({...prevInput, ...newInput}));
      };
      const handleDateChange = (date) => {
        const dateFormatted = date ? String(date.$d).slice(4, 15) : "";
        const newInput = {date: dateFormatted};
        setUserInput(prevInput => ({...prevInput, ...newInput}));
      };
      const handleSwitchChange = (event) => {
        let priority = '';
        if(event.target.checked){
            priority = "High";
        } else {
            priority = "Low";
        }
        setUserInput(prevInput => ({...prevInput, priority}));
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
                        id="issue_title"
                        label="Issue Title"
                        name="issue_title"
                        autoFocus
                        onChange={handleChange}
                        value={userInput.issue_title}
                    />
                    <Box sx={{ minWidth: 500, mt: 2, mb: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="type">Type</InputLabel>
                            <Select
                                labelId="type"
                                id="type"
                                name="type"
                                label="Type"
                                value={userInput.type}
                                onChange={handleChange}
                            >
                                <MenuItem value={'Bug Report'}>Bug Report</MenuItem>
                                <MenuItem value={'Billing Issue'}>Billing Issue</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ mb: 1, mt: 2 }}>
                        <DatePicker 
                            label='When did the issue begin?' 
                            name='date'
                            value={userInput.date}
                            onChange={handleDateChange}
                        />
                    </Box>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="description"
                        label="Describe the issue"
                        name="description"
                        multiline
                        rows={6}
                        value={userInput.description}
                        onChange={handleChange}
                    />
                    <FormControlLabel 
                        sx={{mt: 2, color: 'black'}} 
                        control={<Switch name="priority" />} 
                        label="High Priority"
                        onChange={handleSwitchChange}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3}}>
                        Submit Ticket
                    </Button>   
                </Box>
            </Box>
        </Container>
    )
}