import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function AllTickets () {

    let ticketsArray = [];
    for (let i = 0; i < localStorage.length; i++){
        const ticketLS = JSON.parse(localStorage.getItem(`Ticket ${i + 1}`))
        ticketsArray.push(ticketLS)
    }

    return (
    <>  
        <Typography variant="h4" gutterBottom>
                All Tickets
        </Typography>
        <Container component="main" sx={{ width: 7/16, background: 'white', borderRadius: '20px'}}>
            <Box
                sx={{
                padding: '5%',
                display: 'flex',
                height: '600px',
                overflow: 'auto',
                color: 'black'
                }}
            >
                <div>
                    <ul className='blackText'>
                        {ticketsArray.map((ticket,index) => (
                        <li className='ticketBorder' key={ticket.id}>
                            <h4>Ticket ID: {index + 1}</h4>
                            <p><strong>Issue Title: </strong>{ticket.title}</p>
                            <p><strong>Type: </strong>{ticket.type}</p>
                            <p><strong>Date: </strong>{ticket.date}</p>
                            <p><strong>Description: </strong>{ticket.description}</p>
                            <p><strong>Priority: </strong> {ticket.highPriority ? 'High' : 'Low'}</p>
                            <p><strong>Status: </strong>{ticket.status}</p>
                        </li>
                        ))}
                    </ul>
                </div>
            </Box>
        </Container>
    </>
    )
}