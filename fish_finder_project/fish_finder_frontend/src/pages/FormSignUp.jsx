import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { MDBContainer } from 'mdb-react-ui-kit';


const stateSelectItems = [
    {label: 'Alabama', value: 'AL'},
    {label: 'Alaska', value: 'AK'},
    {label: 'American Samoa', value: 'AS'},
    {label: 'Arizona', value: 'AZ'},
    {label: 'Arkansas', value: 'AR'},
    {label: 'California', value: 'CA'},
    {label: 'Colorado', value: 'CO'},
    {label: 'Connecticut', value: 'CT'},
    {label: 'Delaware', value: 'DE'},
    {label: 'District Of Columbia', value: 'DC'},
    {label: 'Florida', value: 'FL'},
    {label: 'Georgia', value: 'GA'},
    {label: 'Guam', value: 'GU'},
    {label: 'Hawaii', value: 'HI'},
    {label: 'Idaho', value: 'ID'},
    {label: 'Illinois', value: 'IL'},
    {label: 'Indiana', value: 'IN'},
    {label: 'Iowa', value: 'IA'},
    {label: 'Kansas', value: 'KS'},
    {label: 'Kentucky', value: 'KY'},
    {label: 'Louisiana', value: 'LA'},
    {label: 'Maine', value: 'ME'},
    {label: 'Maryland', value: 'MD'},
    {label: 'Massachusetts', value: 'MA'},
    {label: 'Michigan', value: 'MI'},
    {label: 'Minnesota', value: 'MN'},
    {label: 'Mississippi', value: 'MS'},
    {label: 'Missouri', value: 'MO'},
    {label: 'Montana', value: 'MT'},
    {label: 'Nebraska', value: 'NE'},
    {label: 'Nevada', value: 'NV'},
    {label: 'New Hampshire', value: 'NH'},
    {label: 'New Jersey', value: 'NJ'},
    {label: 'New Mexico', value: 'NM'},
    {label: 'New York', value: 'NY'},
    {label: 'North Carolina', value: 'NC'},
    {label: 'North Dakota', value: 'ND'},
    {label: 'Northern Mariana Islands', value: 'MP'},
    {label: 'Ohio', value: 'OH'},
    {label: 'Oklahoma', value: 'OK'},
    {label: 'Oregon', value: 'OR'},
    {label: 'Pennsylvania', value: 'PA'},
    {label: 'Puerto Rico', value: 'PR'},
    {label: 'Rhode Island', value: 'RI'},
    {label: 'South Carolina', value: 'SC'},
    {label: 'South Dakota', value: 'SD'},
    {label: 'Tennessee', value: 'TN'},
    {label: 'Texas', value: 'TX'},
    {label: 'United States Minor Outlying Islands', value: 'UM'},
    {label: 'Utah', value: 'UT'},
    {label: 'Vermont', value: 'VT'},
    {label: 'Virgin Islands', value: 'VI'},
    {label: 'Virginia', value: 'VA'},
    {label: 'Washington', value: 'WA'},
    {label: 'West Virginia', value: 'WV'},
    {label: 'Wisconsin', value: 'WI'},
    {label: 'Wyoming', value: 'WY'},
];


function FormSignUp(){

    const [formData, setFormData] = useState({});
    

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            date: null,
            country: null,
            accept: false
        },
        validate: (data) => {
            let errors = {};

            if (!data.name) {
                errors.name = 'Name is required.';
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
            setShowMessage(true);

            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
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

    return(
        <MDBContainer className="pb-5">
            <div className="flex align-items-center justify-content-center mt-5 mb-5">
                <div className="p-4 w-50">
                    <div className="flex-column">
                        <div className="text-center mb-5"> 
                            <img src={logo} alt="RB" height={50} className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Please Register</div>
                        </div>
                        <form onSubmit={formik.handleSubmit} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                    <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
                                </span>
                                {getFormErrorMessage('name')}
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
                            <div className="field">
                                <span className="p-float-label">
                                    <Calendar id="date" name="date" value={formik.values.date} onChange={formik.handleChange} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                    <label htmlFor="date">Birthday</label>
                                </span>
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Dropdown id="country" name="country" value={formik.values.country} onChange={formik.handleChange} options={stateSelectItems} optionLabel="label" />
                                    <label htmlFor="country">Country</label>
                                </span>
                            </div>
                            <div className="field-checkbox">
                                <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                                <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>I agree to the terms and conditions*</label>
                            </div>

                            <Button type="submit" label="Submit" className="mt-2" />
                        </form>
                    </div>
                </div>
            </div>
        </MDBContainer>
    )

}

export default FormSignUp