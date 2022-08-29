import React, { useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
} from 'mdb-react-ui-kit';
import { Avatar } from 'primereact/avatar';
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Password } from 'primereact/password';
import logo from '../assets/ff.png'
import { Link } from 'react-router-dom';
import { logInUser } from '../api/UserAPI';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import {swals, swalse} from '../components/Swal';


function UserModal({user, basicModal, setBasicModal, handleClick}) {
    
    const source = `/static/media/${user.profile_picture}`



    return (
        <>
            <MDBModal  show={basicModal} setShow={setBasicModal} >
                <MDBModalDialog className="usermodal " >
                    <MDBModalContent>
                            <div className="flex-column justify-content-center">
                                <div className="surface-card p-4 shadow-2 w-full">
                                        <div className="text-center mb-5" >
                                            <div>
                                                <Avatar image={user.profile_picture ? source : default_picture} className="mr-2" size="xlarge" shape="circle" />
                                            </div>
                                            <p>{user.first_name} {user.last_name}</p>
                                            <p><em>{user.email}</em></p>
                                            <hr />
                                            <Link to={"/user_profile"} className="global-links nav_items" ><strong>My Profile</strong></Link>
                                            <hr />
                                            <MDBBtn onClick={(event) => { handleClick(event) }} style={{ backgroundColor: '#62acee' }} className="text-dark" >Sign Out</MDBBtn>
                                        </div>
                                </div>
                            </div>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default UserModal