import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';



export default function ActiveTickets () {

    const [tickets, setTickets] = useState([]);

    async function fetchTickets(){
        const response = await fetch('http://localhost:5000/opentickets')
        const data = await response.json()
        setTickets(data)
    }

    useEffect(() => {
        fetchTickets();
      }, []);

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
                        {tickets.map((ticket,index) => (
                        <li className='ticketBorder' key={ticket.id}>
                            <h4>Ticket ID: {index + 1}</h4>
                            <p><strong>Issue Title: </strong>{ticket.issue_title}</p>
                            <p><strong>Type: </strong>{ticket.type}</p>
                            <p><strong>Date: </strong>{ticket.date}</p>
                            <p><strong>Description: </strong>{ticket.description}</p>
                            <p><strong>Priority: </strong> {ticket.priority}</p>
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