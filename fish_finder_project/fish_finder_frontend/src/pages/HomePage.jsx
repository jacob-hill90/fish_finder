import React from 'react';
import SplashImage from '../components/SplashImage';
import Weather from '../components/Weather';


import {MDBContainer} from 'mdb-react-ui-kit'

function HomePage() {

    return (
        
        <div className="home-page">
            <SplashImage />
            <MDBContainer classname="align-content-center justify-content-center">
                <Weather />
            </MDBContainer>
        </div>

    )
}

export default HomePage