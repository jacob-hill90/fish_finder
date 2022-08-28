import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { MDBContainer } from 'mdb-react-ui-kit';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload'
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { InputText } from "primereact/inputtext"
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { saveCatch } from '../api/UserAPI';
import {swals, swalse} from '../components/Swal';

function WeatherPage({fullWeather, user}){
    const [catch_picture, setCatchPicture] = useState();
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const newCatch = (e) => {
        e.preventDefault()
        const upData = new FormData();
        upData.append("owner", user.username)
        upData.append("date", "2021-03-05")
        upData.append("fishingMethod", "bait fishing")
        upData.append("length", "12")
        upData.append("season", "Spring")
        upData.append("species", "Swordfish")
        upData.append("weight", "10")
        upData.append("catch_picture", catch_picture, catch_picture.name)


        let config = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            }
        }
        
        let response = saveCatch(upData, config)
        .then((response) => {
            swals(response)
        }) 
    }




    useEffect(() => {
        if(catch_picture){
            console.log(catch_picture)
        } 
    }, [catch_picture])


    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        // e.files.forEach(file => {
        //     _totalSize += file.size;
        // });

        setTotalSize(_totalSize);
    }


    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize/10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{backgroundColor: 'transparent', display: 'flex', alignItems: 'center'}}>
                {chooseButton}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{width: '300px', height: '20px', marginLeft: 'auto'}}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        setCatchPicture(file)
        return (
            <div className="flex align-items-center flex-wrap">
                <div className="flex align-items-center" style={{width: '40%'}}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="submit" label="New Catch" onClick={(e)=> newCatch(e)} style={{ backgroundColor: '#62acee' }} className="text-dark mt-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Image Here</span>
            </div>
        )
    }


    const chooseOptions = {icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

    return (
        <div>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
            <div className="card">
                <h5>Template</h5>
                <FileUpload name="demo[]"  multiple accept="image/*" maxFileSize={1000000}
                    onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} cancelOptions={cancelOptions} />
                {/* <input 
                    type="file"  
                    name="catch_picture" 
                    onChange={(e) => setCatchPicture(e.target.files[0])}
                ></input> */}
            </div>
        </div>
    )
}

export default WeatherPage