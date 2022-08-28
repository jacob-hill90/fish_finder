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
// ##### --PAGES-- #####
import ProfileHeader from './ProfileHeader';
import UploadPic from './UploadPic';

function Fishtory({ user }) {

    let emptyProduct = {
        date: '',
        fishingMethod: '',
        length: '',
        season: '',
        species: '',
        weight: '',
    };

    const [allCatches, setallCatches] = useState([])
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState(null);
    const [selectedPictureName, setSelectedPictureName] = useState('');
    const [product, setProduct] = useState(emptyProduct);

    const helperFunction = (param) => {
        setSelectedPicture(param)
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>NEW', param)
        // setSelectedPictureName(param.name)
    }




    useEffect(() => {
        axios.get('catch')
            .then((response) => {
                setallCatches(response['data']['data'])
            })
    }, [])



    const hideDialog = () => {
        setProductDialog(false);
    }
    const toast = useRef(null);

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const saveProduct = () => {
        setProductDialog(false);
        let data = {
            'date': product.date,
            'fishing_method': product.fishingMethod,
            'id': product.id,
            'length': product.length,
            'owner_id': product.owner_id,
            'season': product.season,
            'species': product.species,
            'weight': product.weight,
            'catch_picture': selectedPicture
        }


        // axios.post('catch', {'data': data, 'selectedPicture': selectedPicture} ,  {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        axios.post('catch', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: `${response.data.status}`, life: 3000 });
                setTimeout(function () {
                    // window.location.reload();
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
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-danger" onClick={deleteProduct} />
        </React.Fragment>
    );

    // Profile image
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.catch_picture} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" width="150px" />
    }

    const onSeasonChange = (e) => {
        let _product = { ...product };
        _product['category'] = e.value;
        setProduct(_product);
    }

    return (
        <div>
            <Toast ref={toast} />
            <ProfileHeader user={user} />

            <ConfirmDialog />
            {/* Rows/columns fields */}
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
                    <div className="p-fluid">
                        <div className="date">
                            <label htmlFor="fishing-method">Date</label>
                            <InputText id="date" onChange={(e) => onInputChange(e, 'date')} value={product.date} />
                        </div>
                        <div className="field">
                            <label htmlFor="fishing-method">Fishing Method</label>
                            <InputText id="fishingMethod" onChange={(e) => onInputChange(e, 'fishingMethod')} value={product.fishingMethod} />
                        </div>
                        <div className="field">
                            <label htmlFor="length">Length (in)</label>
                            <InputText id="length" onChange={(e) => onInputChange(e, 'length')} value={product.length} />
                        </div>
                        {/* Season checkboxes */}
                        <div className="field">
                            <label className="mb-3">Season</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="spring" name="spring" value="Spring" onChange={onSeasonChange} checked={product.category === 'Spring'} />
                                    <label htmlFor="spring">Spring</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="summer" name="summer" value="Summer" onChange={onSeasonChange} checked={product.category === 'Summer'} />
                                    <label htmlFor="summer">Summer</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="fall" name="fall" value="Fall" onChange={onSeasonChange} checked={product.category === 'Fall'} />
                                    <label htmlFor="fall">Fall</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="Winter" name="Winter" value="Winter" onChange={onSeasonChange} checked={product.category === 'Winter'} />
                                    <label htmlFor="Winter">Winter</label>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="species">Species</label>
                            <InputText id="species" onChange={(e) => onInputChange(e, 'species')} value={product.species} />
                        </div>
                        <div className="field">
                            <label htmlFor="weight">Weight (lbs)</label>
                            <InputText id="weight" onChange={(e) => onInputChange(e, 'weight')} value={product.weight} />
                        </div>
                    </div>
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