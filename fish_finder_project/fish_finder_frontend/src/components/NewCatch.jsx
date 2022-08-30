import axios from 'axios'
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
import UploadPic from './UploadPic';
import { getUserCatches, updateCatch } from '../api/CatchAPI';
import { newCatch } from '../api/CatchAPI';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

function NewCatch({ newCatchLng, newCatchLat }) {

    let emptyProduct = {
        date: '',
        fishing_method: '',
        length: '',
        season: '',
        species: '',
        weight: '',
    };

    const [allCatches, setallCatches] = useState([])
    const [productDialog, setProductDialog] = useState(true);
    const [catch_picture, setCatchPicture] = useState();
    const [product, setProduct] = useState(emptyProduct);


    const helperFunction = (file) => {
        setCatchPicture(file)
    }
    const activateProductDialog = (change) => {
        setProductDialog(change)
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
    const toast = useRef(null);

    const saveProduct = () => {
        setProductDialog(false);
        let data = {
            'date': new Date(product.date).toISOString().split('T')[0],
            'season': product.season,
            'species': product.species,
            'weight': product.weight,
            'fishing_method': product.fishing_method,
            'length': product.length,
            'latitude': newCatchLat.toString(),
            'longitude': newCatchLng.toString(),
            'catch_picture': catch_picture ? catch_picture : null,
        }
        let config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            }
        }
        let response = newCatch(data, config)
            .then((response) => {
                toast.current.show({ severity: 'success', summary: 'Success', detail: `${response.data['status']}`, life: 3000 });
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            })
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

    const productDialogFooter = (
        <React.Fragment enctype="multipart/form-data">
            <Button label="Cancel" icon="pi pi-times" className="p-button-danger p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-success" onClick={saveProduct} />
        </React.Fragment>
    );

    // catch image
    const imageBodyTemplate = (rowData) => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>', rowData.catch_picture)
        let source = `/static/media/${rowData.catch_picture}`
        return <img src={source} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className="product-image" width="150px" />
    }

    const onSeasonChange = (e) => {
        let _product = { ...product };
        _product['season'] = e.value;
        setProduct(_product);
    }
    return (
        <div>
            <Toast ref={toast} />
            {/* pop up window for editing catches individually */}
            <Dialog visible={productDialog} style={{ width: '450px' }} header="New Catch" modal footer={productDialogFooter} onHide={hideDialog} >
                <div className="date">
                    <UploadPic helperFunction={helperFunction} />
                </div>
                <div className="p-fluid">
                    <div className="date">
                        <div className="field col-13 md:col-13">
                            <label htmlFor="basic">Date Format</label>
                            <Calendar id="basic" onChange={(e) => onInputChange(e, 'date')} dateFormat="mm-dd-yy" placeholder='mm-dd-yyyy' showButtonBar />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="fishing-method">Fishing Method</label>
                        <InputText id="fishingMethod" onChange={(e) => onInputChange(e, 'fishing_method')} value={product.fishing_method} />
                    </div>
                    <div className="field">
                        <label htmlFor="length">Length (in)</label>
                        <InputText id="length" onChange={(e) => onInputChange(e, 'length')} value={product.length} type='number' />
                    </div>
                    {/* Season checkboxes */}
                    <div className="field">
                        <label className="mb-3">Season</label>
                        <div className="formgrid grid">
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="spring" name="spring" value="Spring" onChange={onSeasonChange} checked={product.season === 'Spring'} />
                                <label htmlFor="spring">Spring</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="summer" name="summer" value="Summer" onChange={onSeasonChange} checked={product.season === 'Summer'} />
                                <label htmlFor="summer">Summer</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="fall" name="fall" value="Fall" onChange={onSeasonChange} checked={product.season === 'Fall'} />
                                <label htmlFor="fall">Fall</label>
                            </div>
                            <div className="field-radiobutton col-6">
                                <RadioButton inputId="Winter" name="Winter" value="Winter" onChange={onSeasonChange} checked={product.season === 'Winter'} />
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
                        <InputText id="weight" onChange={(e) => onInputChange(e, 'weight')} value={product.weight} type='number'/>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default NewCatch