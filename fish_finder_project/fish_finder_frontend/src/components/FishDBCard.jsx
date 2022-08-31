import React from 'react';
import { Link } from 'react-router-dom'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';

function FishDBCard({name,latin_name, fish_record, fish_pic, id}) {
  return (
    <MDBCard className="flex align-items-center justify-content-center m-5"> 
      <div className="flex justify-content-center">
        <MDBCardImage src={fish_pic} fluid alt='...' className="fish-image-card pt-3" />
      </div>
      <MDBCardBody className="justify-content-center">
        <MDBCardTitle className="justify-content-center text-center">{name}</MDBCardTitle>
        <MDBCardText className="justify-content-center text-center">
          <strong><em>{latin_name}</em></strong>
        </MDBCardText>
        <MDBCardText className="justify-content-center text-center">
          <p>Current record: </p>
          <strong>{fish_record}</strong>
        </MDBCardText>
        <div className="flex justify-content-center">
          <Link to={`/fish_detail/${id}`}>
            <MDBBtn style={{ backgroundColor: '#62acee' }} className="text-dark" >Details</MDBBtn>
          </Link>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}

export default FishDBCard