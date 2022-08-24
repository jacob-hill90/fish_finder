import logo from '../assets/ff.png'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Chip } from 'primereact/chip';
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBCollapse,
  MDBIcon,
  MDBBtn,
  MDBNavbarNav
} from 'mdb-react-ui-kit';
import { signOutUser } from '../api/UserAPI';
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal';
// import SignUpOffCanvas from './SignUpOffCanvas';

function NavBar({ user }) {

  const [showNavNoTogglerSecond, setShowNavNoTogglerSecond] = useState(false);

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
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavNoTogglerSecond} className=" justify-content-center align-items-center">
            <MDBNavbarNav className='flex-row align-items-center text-md-center '>
              <MDBNavbarItem>
                {user ? <Chip label={user.username} /> : null}
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav className='flex justify-content-center align-items-center text-md-center nav_item'>
              <MDBNavbarItem className="me-4">
                <Link to={"/user_profile"} className="global-links nav_items"><strong>user</strong></Link>
              </MDBNavbarItem>
              <MDBNavbarItem className="me-4">
                <Link to={"/catch_map"} className="global-links nav_items"><strong>Catch Map</strong></Link>
              </MDBNavbarItem>
              <MDBNavbarItem className="me-4">
                <Link to={"/fish_DB"} className="global-links nav_items"><strong>Game Fish Database</strong></Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav className="flex-row justify-content-end align-items-center flex-nowrap">
              <MDBNavbarItem className="me-4">
                {user ? <MDBBtn onClick={(event) => { handleClick(event) }} style={{ backgroundColor: '#FFEB3B' }} className="text-dark" >Sign Out</MDBBtn> : null}
              </MDBNavbarItem>
              <MDBNavbarItem className="me-4">
                {user ? null : <SignUpModal />}
              </MDBNavbarItem>
              <MDBNavbarItem className="me-4">
                {user ? null : <LoginModal />}
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default NavBar
