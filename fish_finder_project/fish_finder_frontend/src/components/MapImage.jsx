import React from 'react';
import map from '../assets/map.jpg'

function MapImage() {
  return (
    <div className='bg-image map-img'>
      <img src={map} className='img-fluid' alt='map' />
    </div>
  );
}

export default MapImage