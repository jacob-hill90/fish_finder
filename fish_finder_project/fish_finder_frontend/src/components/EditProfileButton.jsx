import { MDBBtn } from "mdb-react-ui-kit";
import axios from 'axios'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { RadioButton } from 'primereact/radiobutton';
import UploadPic from './UploadPic';
import { updateUser } from '../api/UserAPI';
import { useFormik } from 'formik';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

function EditProfileButton({ user }) {

    const stateSelectItems = [
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        { label: 'American Samoa', value: 'AS' },
        { label: 'Arizona', value: 'AZ' },
        { label: 'Arkansas', value: 'AR' },
        { label: 'California', value: 'CA' },
        { label: 'Colorado', value: 'CO' },
        { label: 'Connecticut', value: 'CT' },
        { label: 'Delaware', value: 'DE' },
        { label: 'District Of Columbia', value: 'DC' },
        { label: 'Florida', value: 'FL' },
        { label: 'Georgia', value: 'GA' },
        { label: 'Guam', value: 'GU' },
        { label: 'Hawaii', value: 'HI' },
        { label: 'Idaho', value: 'ID' },
        { label: 'Illinois', value: 'IL' },
        { label: 'Indiana', value: 'IN' },
        { label: 'Iowa', value: 'IA' },
        { label: 'Kansas', value: 'KS' },
        { label: 'Kentucky', value: 'KY' },
        { label: 'Louisiana', value: 'LA' },
        { label: 'Maine', value: 'ME' },
        { label: 'Maryland', value: 'MD' },
        { label: 'Massachusetts', value: 'MA' },
        { label: 'Michigan', value: 'MI' },
        { label: 'Minnesota', value: 'MN' },
        { label: 'Mississippi', value: 'MS' },
        { label: 'Missouri', value: 'MO' },
        { label: 'Montana', value: 'MT' },
        { label: 'Nebraska', value: 'NE' },
        { label: 'Nevada', value: 'NV' },
        { label: 'New Hampshire', value: 'NH' },
        { label: 'New Jersey', value: 'NJ' },
        { label: 'New Mexico', value: 'NM' },
        { label: 'New York', value: 'NY' },
        { label: 'North Carolina', value: 'NC' },
        { label: 'North Dakota', value: 'ND' },
        { label: 'Northern Mariana Islands', value: 'MP' },
        { label: 'Ohio', value: 'OH' },
        { label: 'Oklahoma', value: 'OK' },
        { label: 'Oregon', value: 'OR' },
        { label: 'Pennsylvania', value: 'PA' },
        { label: 'Puerto Rico', value: 'PR' },
        { label: 'Rhode Island', value: 'RI' },
        { label: 'South Carolina', value: 'SC' },
        { label: 'South Dakota', value: 'SD' },
        { label: 'Tennessee', value: 'TN' },
        { label: 'Texas', value: 'TX' },
        { label: 'United States Minor Outlying Islands', value: 'UM' },
        { label: 'Utah', value: 'UT' },
        { label: 'Vermont', value: 'VT' },
        { label: 'Virgin Islands', value: 'VI' },
        { label: 'Virginia', value: 'VA' },
        { label: 'Washington', value: 'WA' },
        { label: 'West Virginia', value: 'WV' },
        { label: 'Wisconsin', value: 'WI' },
        { label: 'Wyoming', value: 'WY' },
    ];

    const formik = useFormik({
        initialValues: {
            state: `${user.state}`
        },
    });

    let emptyProduct = {
        first_name: '',
        last_name: '',
        // state: '',
        zipcode: '',
    };

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [product, setProduct] = useState(emptyProduct);
    const [checkDelete, setCheckDelete] = useState(false)
    const [radioChecked, setRadioChecked] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(true)
    const toast = useRef(null);

    const helperFunction = (file) => {
        setSelectedPicture(file)
    }

    const hideDialog = () => {
        setProductDialog(false);
    }

    const updateProfile = () => {
        setProductDialog(false);
        let data = {
            'first_name': product.first_name,
            'last_name': product.last_name,
            'state': formik.values.state,
            'zipcode': product.zipcode,
            'profile_picture': selectedPicture
        }
        let config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            }
        }

        let response = updateUser(data, config)
            .then((response) => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: `${response.data.status}`, life: 3000 });
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            })
    }

    const deleteAccount = () => {
        setDeleteProductDialog(false);
        axios.delete('edit_user')
            .then((response) => {
                toast.current.show({ severity: 'error', summary: 'Attention', detail: `${response['data']['status']}`, life: 3000 });
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            })
    }
    const editProduct = (product) => {
        setProduct({
            'first_name': user.first_name,
            'last_name': user.last_name,
            'state': user.state,
            'zipcode': user.zipcode
        })
        setProductDialog(true);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    }

    const header = (
        <div className="table-header text-center">
            <h5 className="mx-0 my-1">Fishtory</h5>
            <span className="p-input-icon-left">
            </span>
        </div>
    );

    const onDeleteChecked = (e) => {
        setRadioChecked(e.checked)
        setConfirmDelete(false)
    }

    const delConfirmOne = () => {
        setCheckDelete(true)
    }

    const productDialogFooter = (
        <React.Fragment enctype="multipart/form-data">
            <Button label="Delete Account" icon="pi pi-check" className="p-button-raised p-button-danger p-button-text" onClick={delConfirmOne} />
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Update" icon="pi pi-check" className="p-button-success" onClick={updateProfile} />
            {
                checkDelete ?
                    <div>
                        <div className="field-radiobutton mt-3">
                            <RadioButton inputId="check-delete" name="check-delete" value="check-delete" onChange={onDeleteChecked} checked={radioChecked} />
                            <label htmlFor="spring">Click here to confirm you want to delete your account</label>
                        </div>
                        <div>
                            <Button label="Confirm Delete " icon="pi pi-check" className="p-button-danger" onClick={deleteAccount} disabled={confirmDelete} />
                        </div>
                    </div> :
                    null
            }
        </React.Fragment>
    );

    // Profile image
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.catch_picture} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" width="150px" />
    }

    return (
        <div>
            <Toast ref={toast} />

            <MDBBtn style={{ backgroundColor: '#FFEB3B' }} className="text-dark" onClick={editProduct} >Edit Profile</MDBBtn>

            {/* pop up window for editing user's profile */}
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Edit Profile" modal footer={productDialogFooter} onHide={hideDialog} >
                <div className="date">
                    <UploadPic helperFunction={helperFunction} />
                </div>
                <div className="p-fluid">
                    <div className="first-name">
                        <label htmlFor="first-name">First Name</label>
                        <InputText id="first-name" onChange={(e) => onInputChange(e, 'first_name')} value={product.first_name}/>
                    </div>
                    <div className="field">
                        <label htmlFor="last-name">Last Name</label>
                        <InputText id="last-name" onChange={(e) => onInputChange(e, 'last_name')} value={product.last_name}/>
                    </div>
                    <div className="field pb-3">
                        <label htmlFor="state" className={classNames}>State or US Territory*</label>
                        <Dropdown id="state" name="state" value={formik.values.state} onChange={formik.handleChange}  onBlur={formik.handleBlur} options={stateSelectItems} optionLabel="label" className={classNames} />
                    </div>
                    <div className="field">
                        <label htmlFor="zipcode">Zipcode</label>
                        <InputText id="zipcode" onChange={(e) => onInputChange(e, 'zipcode')} type='number' maxLength={5} value={product.zipcode}/>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default EditProfileButton