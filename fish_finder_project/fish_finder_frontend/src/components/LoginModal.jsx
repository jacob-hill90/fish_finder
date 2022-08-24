import React, { useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
} from 'mdb-react-ui-kit';
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import logo from '../assets/ff.png'
import { Link } from 'react-router-dom';
import { logInUser } from '../api/UserAPI';

function LoginModal() {
    const [basicModal, setBasicModal] = useState(false);

    function handleClick(event) {
        event.preventDefault()
        let data = {
            "username": document.getElementById("username3").value,
            "password": document.getElementById("password1").value   
        }

        logInUser(data)
    }

    const toggleShow = () => setBasicModal(!basicModal);

    return (
        <>
            <MDBBtn onClick={toggleShow} style={{ backgroundColor: '#62acee' }} className="text-dark">Log In</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                            <div className="flex align-items-center justify-content-center">
                                <div className="surface-card p-4 shadow-2 w-full">
                                    <div className="flex">
                                        <MDBBtn className='btn-close ms-auto' color='none' onClick={toggleShow}></MDBBtn>
                                    </div>
                                        <div className="text-center mb-5"> 
                                            <img src={logo} alt="RB" height={50} className="mb-3" />
                                            <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                                            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                                            <Link to={"/signup"} className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</Link>
                                        </div>
                                    <div>
                                        <label htmlFor="username3" className="block text-900 font-medium mb-2">Username</label>
                                        <InputText id="username3" type="text" className="w-full mb-3" />

                                        <label htmlFor="password1" className="block text-900 font-medium mb-2">Password</label>
                                        <InputText id="password1" type="password" className="w-full mb-3" />

                                        <div className="flex align-items-center justify-content-between mb-6">
                                            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                                        </div>
                                        <Button onClick={(event)=>{handleClick(event)}} label="Sign In" icon="pi pi-user" style={{ backgroundColor: '#62acee' }} className="w-full text-dark" />
                                    </div>
                                </div>
                            </div>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}

export default LoginModal
