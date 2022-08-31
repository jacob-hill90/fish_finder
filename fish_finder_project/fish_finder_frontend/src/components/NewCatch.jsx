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
import { InputTextarea } from 'primereact/inputtextarea';
import CatchPopupWindow from './CatchPopupWindow';

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
    const [notes, setNotes] = useState('')

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
            'weight': product.weight ? product.weight : null,
            'fishing_method': product.fishing_method,
            'length': product.length ? product.length : null,
            'latitude': newCatchLat ? newCatchLat.toString() : null,
            'longitude': newCatchLng ? newCatchLng.toString() : null,
            'catch_picture': catch_picture ? catch_picture : null,
            'notes': notes ? notes : null
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
        </div>
    )
}

export default NewCatch