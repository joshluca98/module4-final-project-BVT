import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ticketsData from '../assets/Tickets.json';

export default function ActiveTickets () {

    const { tickets } = ticketsData;
    
    return (
    <>  
        <Typography variant="h3" gutterBottom>
                Archived Tickets
        </Typography>
        <Container component="main" sx={{ width: 7/16, background: 'white', borderRadius: '20px'}}>
            <Box
                sx={{
                padding: '5%',
                display: 'flex',
                flexDirection: 'column',
                height: '600px',
                overflow: 'auto',
                color: 'black'
                }}
            >
                 <div>
                    <ul className='blackText'>
                        { tickets.map(ticket => {
                        if (ticket.status === "archived") {
                            return (
                                <li key={ticket.id}>
                                    <h4>Ticket ID: {ticket.id}</h4>
                                    <p><strong>Issue Title: </strong>{ticket.issue_title}</p>
                                    <p><strong>Type: </strong>{ticket.type}</p>
                                    <p><strong>Date: </strong>{ticket.date}</p>
                                    <p><strong>Description: </strong>{ticket.description}</p>
                                    <p><strong>Priority: </strong>{ticket.priority ? 'High' : 'Low'}</p>
                                    <p><strong>Status: </strong>{ticket.status}</p>
                                </li>
                            );
                        }
                        })}
                    </ul>
                </div>
            </Box>
        </Container>
    </>
    )
}