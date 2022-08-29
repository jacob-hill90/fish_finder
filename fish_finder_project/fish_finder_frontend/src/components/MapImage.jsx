import React from 'react';
import map from '../assets/map_icon.jpg'

function MapImage() {
  return (
    <div className='bg-image map-img'>
      <img src={map} className='img-fluid static-map' alt='map' />
    </div>
  );
}

export default MapImage