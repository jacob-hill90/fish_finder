import React, { useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
} from 'mdb-react-ui-kit';
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Password } from 'primereact/password';
import logo from '../assets/ff.png'
import { Link } from 'react-router-dom';
import { logInUser } from '../api/UserAPI';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import {swals, swalse} from '../components/Swal';


function LoginModal() {
    
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [formData, setFormData] = useState({});
    const [submit, setSubmit] = useState(false);


    const formik = useFormik({
        initialValues: {
            username1: '',
            password: '',
        },
        validate: (data) => {
            let errors = {};

            if (!data.username1) {
                errors.username1 = 'Username is required.';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setSubmit(true)

            formik.resetForm();
        }
    });

    useEffect( () => {
        if (submit != false){ 
            let response = logInUser(formData)
            .then((response) => {
                if (response.data.data != "Successfully logged in!" ) {
                    swalse(response).then( () => {
                        formik.resetForm();
                        window.location.href = "/" })
                } else {
                    swals(response).then( () => {
                        formik.resetForm();
                        window.location.href = "/" })
                }
                    
                
            });
        } 
    }, [submit])


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="error">{formik.errors[name]}</small>;
    };

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
                                            <img src={logo} alt="RB" height={100} className="mb-3" />
                                            <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                                            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                                            <Link to={"/signup"} className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</Link>
                                        </div>
                                    <div>
                                        <form onSubmit={formik.handleSubmit} className="p-fluid">
                                            <div className="field pb-3">
                                                <span className="p-float-label">
                                                    <InputText id="username1" name="username1" value={formik.values.username1} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames("w-full", { 'p-invalid': isFormFieldValid('username1') })} />
                                                    <label htmlFor="username1" className={classNames({ 'p-error': isFormFieldValid('username1') })}>Username*</label>
                                                </span>
                                                {getFormErrorMessage('username1')}
                                            </div>
                                            <div className="field pb-3">
                                                <span className="p-float-label">
                                                    <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames("w-full", { 'p-invalid': isFormFieldValid('password') })} toggleMask />
                                                    <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                                                </span>
                                                {getFormErrorMessage('password')}
                                            </div>
                                            <div className="flex align-items-center justify-content-between mb-2">
                                                <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a>
                                            </div>
                                            <Button type="submit" label="Sign In" icon="pi pi-user" style={{ backgroundColor: '#62acee' }} className="w-full text-dark" />
                                        </form>
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