import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
} from 'mdb-react-ui-kit';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import {signUpUser} from '../api/UserAPI';
import swal from 'sweetalert'
import logo from '../assets/ff.png'


function SignUpModal() {

    const [basicModal, setBasicModal] = useState(false);

    const toggleShow = () => setBasicModal(!basicModal);

    const [formData, setFormData] = useState({});
    const [submit, setSubmit] = useState(false);

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            username: '',
            zipcode: '',
            state: '',
            email: '',
            password: '',
            accept: false
        },
        validate: (data) => {
            let errors = {};

            if (!data.first_name) {
                errors.first_name = 'First name is required.';
            }

            if (!data.last_name) {
                errors.last_name = 'Last name is required.';
            }

            if (!data.username) {
                errors.username = 'Username is required.';
            }

            if (!data.zipcode) {
                errors.zipcode = 'Zipcode is required.';
            }

            if (!data.state) {
                errors.state = 'State is required.';
            }

            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            if (!data.accept) {
                errors.accept = 'You need to agree to the terms and conditions.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setSubmit(true)
        }

    });

    useEffect( () => {
        if (submit != false){

            let response = signUpUser(formData)
            .then((response) => {
                swal({
                    title: "Fishtories Says:",
                    text: `Your account is registered under name ${formData.first_name + ' ' + formData.last_name}`,
                    icon: "success",
                    button: {
                        text: "Well done!",
                        value: true,
                        visible: true,
                        className: "",
                        closeModal: true
                    },
                })
            })
            .then( () => {
                formik.resetForm();
                window.location.href = "/";
            });
        } 
    }, [submit])
    

    const isFormFieldValid = (field_name) => !!(formik.touched[field_name] && formik.errors[field_name]);
    const getFormErrorMessage = (field_name) => {
        return isFormFieldValid(field_name) && <small className="p-error">{formik.errors[field_name]}</small>;
    };

    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    return (
        <>
            <MDBBtn onClick={toggleShow} style={{ backgroundColor: '#62acee' }} className="text-dark">Sign Up</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <div className="form-demo mt-5 mb-5">
                            <div className="flex justify-content-center">
                                <div className="card">
                                    <div className="text-center mb-5"> 
                                        <img src={logo} alt="RB" height={50} className="mb-3" />
                                        <div className="text-900 text-3xl font-medium mb-3">Please Register</div>
                                    </div>
                                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="first_name" name="first_name" value={formik.values.first_name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('first_name') })} />
                                                <label htmlFor="first_name" className={classNames({ 'p-error': isFormFieldValid('first_name') })}>First Name*</label>
                                            </span>
                                            {getFormErrorMessage('first_name')}
                                        </div>
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="last_name" name="last_name" value={formik.values.last_name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('last_name') })} />
                                                <label htmlFor="last_name" className={classNames({ 'p-error': isFormFieldValid('last_name') })}>Last Name*</label>
                                            </span>
                                            {getFormErrorMessage('last_name')}
                                        </div>
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                                <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>Username*</label>
                                            </span>
                                            {getFormErrorMessage('username')}
                                        </div>
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="zipcode" name="zipcode" value={formik.values.zipcode} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('zipcode') })} />
                                                <label htmlFor="zipcode" className={classNames({ 'p-error': isFormFieldValid('zipcode') })}>Zipcode*</label>
                                            </span>
                                            {getFormErrorMessage('zipcode')}
                                        </div>
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="state" name="state" value={formik.values.state} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('state') })} />
                                                <label htmlFor="state" className={classNames({ 'p-error': isFormFieldValid('state') })}>State*</label>
                                            </span>
                                            {getFormErrorMessage('state')}
                                        </div>
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-envelope" />
                                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                                            </span>
                                            {getFormErrorMessage('email')}
                                        </div>
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                                            </span>
                                            {getFormErrorMessage('password')}
                                        </div>
                                        <div className="field-checkbox">
                                            <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                                            <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>I agree to the terms and conditions*</label>
                                        </div>

                                        <Button type="submit" label="Submit" style={{ backgroundColor: '#62acee' }} className="text-dark mt-2" />
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

export default SignUpModal