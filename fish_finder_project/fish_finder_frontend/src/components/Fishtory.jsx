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
import { ConfirmDialog } from 'primereact/confirmdialog';
import { RadioButton } from 'primereact/radiobutton';
import ProfileHeader from './ProfileHeader';
import UploadPic from './UploadPic';
import { getUserCatches, updateCatch } from '../api/CatchAPI';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import CatchPopupWindow from './CatchPopupWindow';


function Fishtory({ user }) {

    let emptyProduct = {
        date: '',
        fishing_method: '',
        length: '',
        season: '',
        species: '',
        weight: '',
    };

    const [allCatches, setallCatches] = useState([])
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [catch_picture, setCatchPicture] = useState();

    const toast = useRef(null);
    const helperFunction = (file) => {
        setCatchPicture(file)
    }

    useEffect(() => {
        let response = getUserCatches()
            .then((response) => {
                setallCatches(response['data']['data'])
            })
    }, [])

    const hideDialog = () => {
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const saveProduct = () => {
        setProductDialog(false);
        let data = {
            'date': new Date(product.date).toISOString().split('T')[0],
            'fishing_method': product.fishing_method,
            'id': product.id,
            'length': product.length,
            'owner_id': product.owner_id,
            'season': product.season,
            'species': product.species,
            'weight': product.weight,
            'catch_picture': catch_picture ? catch_picture : null,
            'notes': product.notes ? product.notes : null
        }
        let config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            }
        }
        let response = updateCatch(data, config)
            .then((response) => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: `${response.data.status}`, life: 3000 });
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            })
    }

    const deleteProduct = () => {
        let data = { 'id': product.id }
        setDeleteProductDialog(false);
        axios.delete('catch', { 'data': data })
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

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
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

    // Edit/delete icons
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const productDialogFooter = (
        <React.Fragment enctype="multipart/form-data">
            <Button label="Cancel" icon="pi pi-times" className="p-button-danger p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-success" onClick={saveProduct} />
        </React.Fragment>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    // catch image
    const imageBodyTemplate = (rowData) => {
        let source = `/static/media/${rowData.catch_picture}`
        return <img src={source} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" width="150px" />
    }

    const onSeasonChange = (e) => {
        let _product = { ...product };
        _product['season'] = e.value;
        setProduct(_product);
    }

{/* >>>>>>>>>>>>>>>>>>>>>>>>>>ROBERT: DELETE THIS AFTER FULL TEST<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
    // const inputField = (category, title, value, type) => {
    //     return (
    //         <div className="field col-13 md:col-13">
    //             <label htmlFor={category}>{title}</label>
    //             <InputText id={category} onChange={(e) => onInputChange(e, category)} value={value} type={type} />
    //         </div>
    //     )
    // }

    // const radioButton = (inputId, name, value, checked) => {
    //     return (
    //         <div className="field-radiobutton col-6">
    //             <RadioButton inputId={inputId} name={name} value={value} onChange={(e) => onSeasonChange(e)} checked={checked} />
    //             <label htmlFor="spring">{value}</label>
    //         </div>
    //     )
    // }

    return (
        <div>
            <Toast ref={toast} />
            <ProfileHeader user={user} />

            <ConfirmDialog />
            {/* Rows/columns table fields */}
            <div className="card workout-history-table container">
                <DataTable value={allCatches}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} catches"
                    header={header} responsiveLayout="scroll">
                    <Column field="catch_picture" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="date" header="Date" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="fishing_method" header="Fishing Method" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="length" header="Length" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="season" header="Season" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="species" header="Species" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="weight" header="Weight" sortable style={{ minWidth: '2rem' }}></Column>
                    {/* Edit/delete icons in the table */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '2rem' }} ></Column>
                </DataTable>

                {/* pop up window for editing catches individually */}
                <Dialog visible={productDialog} style={{ width: '450px' }} header="Edit Catch" modal footer={productDialogFooter} onHide={hideDialog} >
                    <div className="date">
                        <UploadPic helperFunction={helperFunction} />
                    </div>
                    {/* >>>>>>>>>>>>>>>>>>>>>>>>>>ROBERT: DELETE THIS AFTER FULL TEST<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
                    {/* <div className="p-fluid">
                        <div className="date">
                            <div className="field col-13 md:col-13">
                                <label htmlFor="basic">Date</label>
                                <Calendar id="basic" onChange={(e) => onInputChange(e, 'date')} dateFormat="mm-dd-yy" value={product.date} showButtonBar />
                            </div>
                        </div>
                        {inputField("fishing_method", "Fishing Method", product.fishing_method, "text")}
                        {inputField("length", "Length", product.length, "number")}
                        <div className="field">
                            <label className="mb-3">Season</label>
                            <div className="formgrid grid">
                                {radioButton("spring", "spring", "Spring", (product.season === 'Spring'))}
                                {radioButton("summer", "summer", "Summer", (product.season === 'Summer'))}
                                {radioButton("fall", "fall", "Fall", (product.season === 'Fall'))}
                                {radioButton("winter", "winter", "Winter", (product.season === 'Winter'))}
                            </div>
                        </div>
                        {inputField("species", "Species", product.species, "text")}
                        {inputField("weight", "Weight", product.weight, "number")}
                        <div>
                            <label htmlFor="notes">Field Notes</label>
                            <InputTextarea value={product.notes} onChange={(e) => onInputChange(e, 'notes')} rows={2} cols={30} autoResize />
                        </div>
                    </div> */}
                    <CatchPopupWindow product={product} onInputChange={onInputChange} onSeasonChange={onSeasonChange}/>
                </Dialog>
                {/* popup box for deleting just one item */}
                <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Delete Confirmation" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-trash mr-3" style={{ fontSize: '2rem' }} />
                        {product && <span>Do you want to delete this entry <b></b>?</span>}
                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default Fishtory