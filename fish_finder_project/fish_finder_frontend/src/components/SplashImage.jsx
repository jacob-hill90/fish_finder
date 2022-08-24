import React from 'react';
import splash from '../assets/splashImage.jpg'
import Heading from './Heading';


function SplashImage() {
  return (
    <div className='bg-image'>
      <div className="splash-top"></div>
      <img src={splash} className='img-fluid' alt='splash' />
      <div className="splash-bottom"></div>
    </div>
  );
}

export default SplashImage