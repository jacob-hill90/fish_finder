import React from 'react';
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import EditProfileButton from "./EditProfileButton";
import { useEffect } from 'react';
import { useState } from 'react';

function ProfileHeader({ user }) {
    

    return (
        <MDBContainer>
            {user?
            <MDBRow className="profile-header-row mb-4">
                <MDBCol lg='4' md='6' className='mb-4'>
                    <img src={`static/media/${user.profile_picture}`} className="img-fluid z-depth-1 rounded-circle mt-6" alt='' />
                </MDBCol>
                <MDBCol>
                    <h3 className="user-name mt-6">{user['first_name']} {user['last_name']}</h3>
                    <hr />
                    <p>{user['email']}</p>
                    <p>{user['state']}, {user['zipcode']}</p>
                    <EditProfileButton user={user} />
                </MDBCol>
            </MDBRow>
            : null}
        </MDBContainer>
    )
}

export default ProfileHeader