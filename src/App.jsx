import * as React from 'react';
import {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar.jsx'
import GuestHomePage from './components/GuestHomePage.jsx'
import UserHomePage from './components/UserHomePage.jsx'
import SideBar from './components/SideBar.jsx'
import ActiveTickets from './components/ActiveTickets.jsx'
import HighPriorityTickets from './components/HighPriorityTickets.jsx'
import ArchivedTickets from './components/ArchivedTickets.jsx'
import CreateTicket from './components/CreateTicket.jsx';
import AllTickets from './components/AllTickets.jsx';
import Login from './pages/Login.jsx';
import LoggedOut from './pages/LoggedOut.jsx';

export default function App() {

  
  // const isLoggedIn = document.cookie.includes('logged_in');

  const [isLoggedIn, setIsLoggedIn] = React.useState(document.cookie.includes('logged_in'));

  const checkLoggedInStatus = () => {
    setIsLoggedIn(document.cookie.includes('logged_in'));
  };

  useEffect(() => {
    checkLoggedInStatus();
    window.addEventListener('storage', checkLoggedInStatus);
    return () => {
      window.removeEventListener('storage', checkLoggedInStatus);
    };
  }, []);

  const handleLogin = (data) => {
    setIsLoggedIn(data)
  }

  const [selectedPage, setSelectedPage] = React.useState('home')

  function handlePageChange(page) {
    setSelectedPage(page)
  }

  let mainContent;
  
    if (selectedPage === 'home') {
      if(isLoggedIn){
        mainContent = <UserHomePage/>;
      } else {
        mainContent = <GuestHomePage />;
      }
    } else if (selectedPage === 'active') {
      mainContent = <ActiveTickets/>;
    } else if (selectedPage === 'closed') {
      mainContent = <HighPriorityTickets/>;
    } else if (selectedPage === 'archived') {
      mainContent = <ArchivedTickets/>;
    } else if (selectedPage === 'create') {
      mainContent = <CreateTicket/>;
    } else if (selectedPage === 'all') {
      mainContent = <AllTickets/>;
    } else {
      if(isLoggedIn){
        mainContent = <UserHomePage/>;
      } else {
        mainContent = <GuestHomePage />;
      }
    }
  
    let centerClass;
    if(isLoggedIn){
      centerClass = 'trueCenteredContainer'
    } else {
      centerClass = 'centeredContainer'
    }

    return (
      <> 
          <div className={centerClass}>
            <BrowserRouter>
            <NavBar isLoggedIn={isLoggedIn} changePage={handlePageChange} handleLogin={handleLogin} />
            {isLoggedIn && <SideBar changePage={handlePageChange} />}
              <Routes>
                  <Route path="/" element={
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {mainContent}
                    </LocalizationProvider>} 
                  />
                  <Route path="/login" element={<Login handleLogin={handleLogin} /> }/>
                  <Route path="/loggedout" element={<LoggedOut /> }/>
                  <Route path="*" element={<h1>Error 404: Page not found.</h1>} />
                  <Route path="/home" element={<GuestHomePage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </>
    )
}