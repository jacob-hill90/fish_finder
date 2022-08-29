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
        <h1 className='about-head'>Fish smarter with Fishtories</h1>
          <div className="about-points">
            <h5>Fishtories provides you with the tools and skills you need to perform exceptionally every time you hit the water, in order to make sure you have the best fishing experience possible!</h5>
          </div>
      </div>
    </div>
  );
}

export default SplashImage