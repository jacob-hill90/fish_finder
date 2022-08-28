import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { MDBContainer } from 'mdb-react-ui-kit';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload'
import { InputText } from "primereact/inputtext"
import { classNames } from 'primereact/utils';
import { saveCatch } from '../api/UserAPI';
import {swals, swalse} from '../components/Swal';

function WeatherPage({fullWeather, user}){
    
    const [catch_picture, setCatchPicture] = useState();

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


 

    return(
        <div>
            <MDBContainer >
            <div className="flex align-items-center justify-content-center mt-5 mb-5">
                <div className="p-4 w-50">
                    <div className="flex-column">
                        <h1>Weather Page</h1>
                        <br />
                        <form  className="p-fluid" >
                            <input type="file"  name="catch_picture" onChange={(e) => setCatchPicture(e.target.files[0])}></input>
                            <Button type="submit" label="New Catch" onClick={(e)=> newCatch(e)} style={{ backgroundColor: '#62acee' }} className="text-dark mt-2" />
                        </form>
                    </div>
                </div>
            </div>
            </MDBContainer>
        </div>
    )
}

export default WeatherPage