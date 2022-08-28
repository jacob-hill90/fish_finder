import React from 'react';
import { MDBRow, MDBCol, MDBContainer } from "mdb-react-ui-kit";
import EditProfileButton from "./EditProfileButton";

function ProfileHeader({ user }) {

    return (
        <MDBContainer>
            {
                user ?
                    <MDBRow className="profile-header-row mb-4">
                        <MDBCol lg='4' md='6' className='mb-4'>
                            <img src={user.profile_picture} className="img-fluid z-depth-1 rounded-circle mt-6" alt=''
                            />
                        </MDBCol>
                        <MDBCol>
                            <h3 className="user-name mt-6">{user['first_name']} {user['last_name']}</h3>
                            <hr />
                            <p>{user['email']}</p>
                            <p>{user['state']}, {user['zipcode']}</p>
                            <EditProfileButton user={user} />
                        </MDBCol>
                    </MDBRow>
                    :
                    <MDBContainer className='p-6 text-center'>

                        <h3>Log in or create account to access your Fishtory records</h3>
                    </MDBContainer>

            }
        </MDBContainer>
    )
}

export default ProfileHeader