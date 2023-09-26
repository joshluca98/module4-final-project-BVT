import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import NavBar from './components/NavBar.jsx'
import HomePage from './components/HomePage.jsx'
import SideBar from './components/SideBar.jsx'
import ActiveTickets from './components/ActiveTickets.jsx'
import ClosedTickets from './components/ClosedTickets.jsx'
import ArchivedTickets from './components/ArchivedTickets.jsx'
import CreateTicket from './components/CreateTicket.jsx';
import AllTickets from './components/AllTickets.jsx';




export default function App() {

  const [selectedPage, setSelectedPage] = React.useState('home')

  function handlePageChange(page) {
    setSelectedPage(page)
  }

  let mainContent;

  if (selectedPage === 'home') {
    mainContent = <HomePage/>;
  } else if (selectedPage === 'active') {
    mainContent = <ActiveTickets/>;
  } else if (selectedPage === 'closed') {
    mainContent = <ClosedTickets/>;
  } else if (selectedPage === 'archived') {
    mainContent = <ArchivedTickets/>;
  } else if (selectedPage === 'create') {
    mainContent = <CreateTicket/>;
  } else if (selectedPage === 'all') {
    mainContent = <AllTickets/>;
  } else {
    mainContent = <HomePage />;
  }

  return (
    <>
      <NavBar changePage={handlePageChange} />
      <div className='centeredContainer'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {mainContent}
        </LocalizationProvider>
      </div>
      <SideBar changePage={handlePageChange} />
    </>
  )
}