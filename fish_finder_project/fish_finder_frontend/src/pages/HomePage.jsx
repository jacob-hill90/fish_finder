import React from 'react';
import SplashImage from '../components/SplashImage';
import MapImage from '../components/MapImage';
import { Link } from 'react-router-dom';
import {MDBContainer, MDBBtn} from 'mdb-react-ui-kit'

function HomePage() {

    return (
        
        <div className="home-page">
            <SplashImage />
            <MDBContainer classname="align-content-center justify-content-center">
            </MDBContainer>
            <div className="callTo">Join nearly half a dozen other Anglers!
            <Link to={"/signup"} className="global-links nav_items" ><MDBBtn style={{ backgroundColor: '#62acee' }} className="text-dark" >Sign Up Today!</MDBBtn></Link>
            </div>
            <MapImage />
        </div>
    )
}

export default HomePage