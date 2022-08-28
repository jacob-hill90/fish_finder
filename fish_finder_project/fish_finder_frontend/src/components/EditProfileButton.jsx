import { MDBRow, MDBCol, MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import axios from 'axios'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React, { useState, useEffect, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { RadioButton } from 'primereact/radiobutton';

function EditProfileButton({ user }) {
    let emptyProduct = {
        first_name: '',
        last_name: '',
        state: '',
        zipcode: '',
    };

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [selectedPictureName, setSelectedPictureName] = useState('');
    const [product, setProduct] = useState(emptyProduct);
    const [checkDelete, setCheckDelete] = useState(false)
    const [radioChecked, setRadioChecked] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(true)
    const toast = useRef(null);


    const hideDialog = () => {
        setProductDialog(false);
    }

    const updateProfile = () => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>', product.first_name)
        setProductDialog(false);
        let data = {
            'first_name': product.first_name,
            'last_name': product.last_name,
            'state': product.state,
            'zipcode': product.zipcode,
        }
        // axios.put('edit_user', data)
        // .then((response) => {
        //         toast.current.show({ severity: 'success', summary: 'Success', detail: `${response.data.status}`, life: 3000 });
        //         setTimeout(function () {
        //             window.location.reload();
        //         }, 2000);
        //     })
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
        setProduct({ ...product });
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
            <Button label="Delete Account" icon="pi pi-check" className="p-button-danger" onClick={delConfirmOne} />
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={updateProfile} />
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

            {/* pop up window for editing profile */}
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Edit Profile" modal footer={productDialogFooter} onHide={hideDialog} >
                {/* <div className="date">
                        <UploadPic helperFunction={helperFunction} />
                    </div> */}
                <div className="p-fluid">
                    <div className="first-name">
                        <label htmlFor="first-name">First Name</label>
                        <InputText id="first-name" onChange={(e) => onInputChange(e, 'first_name')} />
                    </div>
                    <div className="field">
                        <label htmlFor="last-name">Last Name</label>
                        <InputText id="last-name" onChange={(e) => onInputChange(e, 'last_name')} />
                    </div>
                    <div className="field">
                        <label htmlFor="state">State</label>
                        <InputText id="state" onChange={(e) => onInputChange(e, 'state')} />
                    </div>
                    <div className="field">
                        <label htmlFor="zipcode">Zipcode</label>
                        <InputText id="zipcode" onChange={(e) => onInputChange(e, 'zipcode')} />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default EditProfileButton