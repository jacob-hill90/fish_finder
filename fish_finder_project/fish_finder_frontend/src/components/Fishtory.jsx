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

function Fishtory() {

    const [allCatches, setallCatches] = useState([])

    useEffect(() => {
        axios.get('catch')
            .then((response) => {
                setallCatches(response['data']['data'])
            })
    }, [])

    console.log(allCatches)
    let emptyProduct = {
        calories: '',
        currentWeight: '',
        date: '',
        duration: '',
        repetitions: '',
        sets: '',
        weightUsed: '',
        workoutName: '',
    };

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);

    const hideDialog = () => {
        setProductDialog(false);
    }
    const toast = useRef(null);

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const saveProduct = () => {
        setProductDialog(false);
        // let data = {
        //     'calories_burned': product.calories,
        //     'current_weight': product.currentWeight,
        //     'date': product.date,
        //     'exercise_duration': product.duration,
        //     'id': product.id,
        //     'number_repetitions': product.repetitions,
        //     'number_sets': product.sets,
        //     'user': product.user_id,
        //     'equipment_weight': product.weightUsed,
        //     'workout_name': product.workoutName,
        // }
        // axios.put('edit_workout', data)
        //     .then((response) => {
        //         toast.current.show({ severity: 'warn', summary: 'Confirmed', detail: `${response.data.status}`, life: 3000 });
        //         setTimeout(function () {
        //             window.location.reload();
        //         }, 2000);
        //     })
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        // let data = { 'id': product.id }
        setDeleteProductDialog(false);

        // axios.delete('edit_workout', { 'data': data })
        //     .then((response) => {
        //         toast.current.show({ severity: 'warn', summary: 'Attention', detail: `${response.data.Status}`, life: 3000 });
        //         setTimeout(function () {
        //             window.location.reload();
        //         }, 2000);
        //     })
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header text-center">
            <h5 className="mx-0 my-1">Fishtory</h5>
            <span className="p-input-icon-left">
            </span>
        </div>
    );

    const productDialogFooter = (
        <React.Fragment>
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

    const imageBodyTemplate = (rowData) => {
        
        return <img src={rowData.photo} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" width="150px" />
    }



    return (
        <div>
            <p>profile page</p>




            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="card workout-history-table container">
                <DataTable value={allCatches}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    header={header} responsiveLayout="scroll">
                    
                    <Column field="photo" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="date" header="Date" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="fishingMethod" header="Fishing Method" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="length" header="Length" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="season" header="Season" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="species" header="Species" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column field="weight" header="Weight" sortable style={{ minWidth: '2rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '2rem' }} ></Column>
                </DataTable>

                {/* pop up window for editing prodduct */}
                <Dialog visible={productDialog} style={{ width: '450px' }} header="Workout Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="Date">Date</label>
                        <InputText id="date" onChange={(e) => onInputChange(e, 'date')} />
                    </div>
                    <div className="field">
                        <label htmlFor="Workout Name">Workout Name</label>
                        <InputText id="workoutName" onChange={(e) => onInputChange(e, 'workoutName')} />
                    </div>
                    <div className="field">
                        <label htmlFor="Calories">Calories</label>
                        <InputText id="calories" onChange={(e) => onInputChange(e, 'calories')} />
                    </div>
                    <div className="field">
                        <label htmlFor="currentWeight">Current Weight</label>
                        <InputText id="currentWeight" onChange={(e) => onInputChange(e, 'currentWeight')} />
                    </div>
                    <div className="field">
                        <label htmlFor="Duration">Duration</label>
                        <InputText id="duration" onChange={(e) => onInputChange(e, 'duration')} />
                    </div>
                    <div className="field">
                        <label htmlFor="repetitions">Repetitions</label>
                        <InputText id="repetitions" onChange={(e) => onInputChange(e, 'repetitions')} />
                    </div>
                    <div className="field">
                        <label htmlFor="sets">Sets</label>
                        <InputText id="sets" onChange={(e) => onInputChange(e, 'sets')} />
                    </div>
                    <div className="field">
                        <label htmlFor="Weight Used">Weight Used</label>
                        <InputText id="weightUsed" onChange={(e) => onInputChange(e, 'weightUsed')} />
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