// import React from 'react';
import React, { Component } from "react";
import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdb-react-ui-kit";


function ProfileHeader() {
    return (
        <MDBContainer>
            <MDBRow className="profile-header-row mb-4">
                <MDBCol lg='4' md='6' className='mb-4'>
                    <img src='https://mdbootstrap.com/img/Photos/Avatars/img(31).webp' className="img-fluid z-depth-1 rounded-circle mt-6" alt=''
                    />
                </MDBCol>
                <MDBCol>
                    <h3 className="user-name mt-6">Emily Satassante</h3>
                    <hr />
                    <p>emilysatassante@gmail.com</p>
                    <p>Lancaster, PA</p>
                    <MDBBtn style={{ backgroundColor: '#FFEB3B' }} className="text-dark" >Edit Profile</MDBBtn> 
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default ProfileHeader