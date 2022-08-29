import logo from '../assets/ff.png'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBCollapse,
  MDBBtn,
  MDBNavbarNav
} from 'mdb-react-ui-kit';
import { signOutUser } from '../api/UserAPI';
import LoginModal from './LoginModal'
import UserAvatar from './UserAvatar';




function NavBar({ user, temp, weatherIcon }) {

  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);
  const [open, setOpen] = useState(false);


  function handleClick(event) {
    event.preventDefault()
    let tada = signOutUser()
  }

  return (
    <>
      <MDBNavbar sticky expand='lg' className='p-0 justify-content-md-center justify-content-start'>
        <MDBContainer fluid >
          <MDBNavbarBrand href='/'><img src={logo} alt="RB" height="50" className="d-inline" />Fishtories</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarTogglerDemo02'
            onClick={() => setShowNavNoTogglerSecond(!showNavNoTogglerSecond)}
          >
            <i className="pi pi-bars" style={{'fontSize': '1em'}}></i>
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond} className=" justify-content-center align-items-center">
            <MDBNavbarNav className='flex-row align-items-center text-md-center '>  
            </MDBNavbarNav>
            <MDBNavbarNav className='flex justify-content-center align-items-center text-md-center nav_item me-5'>
              <MDBNavbarItem className="me-4">
                {user ? <Link to={"/catch_map"} className="global-links nav_items"><strong>Catch Map</strong></Link> : null }
              </MDBNavbarItem>
              <MDBNavbarItem className="me-4">
                <Link to={"/fish_DB"} className="global-links nav_items"><strong>Game Fish Database</strong></Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav className="flex-row justify-content-end align-items-center flex-nowrap">
              {user 
              ?<MDBNavbarItem className="me-4">
                <Link to={"/user_weather"} className="global-links nav_items"><div className='weather'><img className='weather_icon' src={weatherIcon} alt="Weather" /><h5>{Math.floor(temp)}˚</h5></div></Link>
              </MDBNavbarItem>
              :null
              }
              { user? null
                :<MDBNavbarItem className="me-4">
                  <Link to={"/signup"} className="global-links nav_items" ><MDBBtn style={{ backgroundColor: '#62acee' }} className="text-dark" >Sign Up</MDBBtn></Link>
                </MDBNavbarItem>
              }
              {user? null
                :<MDBNavbarItem className="me-4">
                  <LoginModal />
                </MDBNavbarItem>
              }
              {user ? <UserAvatar user={user} setOpen={setOpen} open={open} handleClick={handleClick}> </UserAvatar>  : null}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default NavBar
