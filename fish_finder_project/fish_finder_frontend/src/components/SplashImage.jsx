import React from 'react';
import splash from '../assets/splashImage.jpg'
import Heading from './Heading';


function SplashImage() {
  return (
    <div className='bg-image'>
      <div className="splash-top"></div>
      <img src={splash} className='img-fluid' alt='splash' />
      <div className="splash-bottom"></div>
      <div className="about">
        <h1>Fish smarter with Fishstories</h1>
        <h5>Discover great fishing spots, wherever you may be</h5>
        <h5>Keep track of fish you've caught</h5>
      </div>
    </div>
  );
}

export default SplashImage