import React from 'react';
import {MDBContainer} from 'mdb-react-ui-kit'
import FishDBCard from './FishDBCard';

function FishDBDisplay({fish}) {



  return (
    <MDBContainer >
      <div className='d-flex flex-wrap justify-content-center pt-5'>
        {fish.map((fis) => (
          <FishDBCard key={fis.id} {...fis} />
        ))}
      </div>
      </MDBContainer>
  );

}

export default FishDBDisplay