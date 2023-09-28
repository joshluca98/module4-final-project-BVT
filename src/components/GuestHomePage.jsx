import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function GuestHomePage () {
    
    return (
            <Box className='test' sx={{ p: 5, width: '60%', maxWidth: '1500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h3" gutterBottom>
                    Need some help?
                </Typography>
                <br></br>
                <Typography variant="h4" gutterBottom>
                    You've come to the right place.
                </Typography>
                <br></br>
                <Typography variant="body1" gutterBottom>
                    Please <a href='/login'>sign in</a> to get started.
                </Typography>
            </Box>
    )
}