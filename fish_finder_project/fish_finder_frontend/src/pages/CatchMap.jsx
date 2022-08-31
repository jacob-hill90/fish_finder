import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import MapStyles from "../MapStyles"
import fishicon from "../assets/fishicon.png"
import hookicon from "../assets/hookicon.png"
import newcatch from "../assets/newcatch.png"
import compass from "../assets/compass6.png"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import axios from "axios"
import NewCatch from '../components/NewCatch'

// // import Google Maps
import {
    GoogleMap,
    useGoogleMap,
    Marker,
    InfoBox,
    Circle,
    InfoWindow,
    useJsApiLoader,
    StandaloneSearchBox,
    Autocomplete,
} from "@react-google-maps/api"

function CatchMap({ mapCenter, setMapCenter }) {
    const [dragEvent, setDragEvent] = useState(false)
    const libraries = ["places"]
    const mapRef = useRef();
    const containerStyle = {
        width: '1000px',
        height: '600px'
    };

    const options = {
        // styles: MapStyles,
        // disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        // mapTypeControl: true,
        mapTypeId: 'terrain'
    };
    // loads google map api's script
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',

        // process is undefined
        // googleMapsApiKey: { process.env.REACT_APP_GOOGLE_MAPS_API },
        // apiKey,
        googleMapsApiKey: "AIzaSyCvRBwjBlzY9tMrm46tx6ksnRzGvxvUI5U",
        libraries
    })

    const [map, setMap] = useState(null)
    // loads map
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    // state for adding new marker
    const [markers, setMarkers] = useState([])
    // state for changing which marker has an info window open
    const [activeMarker, setActiveMarker] = useState(null);
    // function to to set/change info window popup
    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };
    // dummy test markers, using until json model can support 
    // const testMarkers = [
    //     {
    //         id: 1,
    //         name: "Fish 1",
    //         position: { lat: 34.394142, lng: -82.874662 }
    //     },
    //     {
    //         id: 2,
    //         name: "Fish 2",
    //         position: { lat: 34.434243, lng: -82.828167 }
    //     },
    //     {
    //         id: 3,
    //         name: "Fish 3",
    //         position: { lat: 34.495208, lng: -82.857333 }
    //     },
    //     {
    //         id: 4,
    //         name: "Fish 4",
    //         position: { lat: 34.518695, lng: -82.806761 }
    //     }
    // ]
    // id used for new marker key, will use primary key in model when using real db data
    let markerCount = 26;
    // hook for generating a new catch icon on map (used with Add Catch button)
    const [newFishMarker, setNewFishMarker] = useState(false)

    /* THIS IS STATE CODE FOR THE SEARCHBOX FUNCTIONALITY */
    //setting state for autocomplete instance
    const [autocomplete, setAutocomplete] = useState(null)

    //Pan To function declaration takes a latitude and a longitude
    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(11)
        console.log(autocomplete)

    }, [])


    // onLoad callback called when autocomplete has loaded.
    const onLoad = (autocomplete) => {
        // console.log('autocomplete', autocomplete)
        //setting the instance of autocomplete
        setAutocomplete(autocomplete)
    }

    // onPlaceChanged is called when a user selects a location from the suggestions in the box dropdown.
    const onPlaceChanged = () => {
        if (autocomplete !== null) {

            let panLat = autocomplete.getPlace().geometry.location.lat()
            let panLng = autocomplete.getPlace().geometry.location.lng()
            console.log('lat and long', panLat, panLng)
            let LatLng = { lat: panLat, lng: panLng }
            setMapCenter(LatLng);
            panTo(LatLng);
            console.log(autocomplete)

        }
        else {
            console.log('Autocomplete is not loaded yet')
            console.log(autocomplete)
        }
    }

    const [newCatchLat, setNewCatchLat] = useState(34.48686532)
    const [newCatchLng, setNewCatchLng] = useState(-82.8805130)

    const [allFishData, setAllFishData] = useState([])

    const [newCatchSaved, setNewCatchSaved] = useState(false)

    useEffect(() => {
        axios.get('fish_data')
            .then((response) => {
                console.log("we are now in the frontend")
                let data = response['data']['data']
                let convertedData = JSON.parse(data)
                console.log(convertedData)
                console.log("did parse work?")
                // gives me the primary key
                console.log(convertedData[0].pk)
                // gives me the feild variables
                console.log(convertedData[0].fields.fishing_method)
                setAllFishData(convertedData)
            })
    }, [newCatchSaved])

    const [buttonText, setButtonText] = useState("Add a New Catch");

    const changeText = (text) => setButtonText(text);

    return isLoaded ? (
        <div class="MapPage">
            <h2 id="MapTitle">See What Local Anglers Have Been Catching Near You!</h2>
            <div id="MapInstructions">
                <p>Find your local fishing location using the search bar below or click the compass icon to find your location by your device.</p>
                <p> Then click the "Add a New Catch" button to add a new fish to the map.</p>
                <p> Drag the fish icon to the location where you landed your fish.</p>
                <p> Double click the icon to add details about the catch and save it to the map.</p>
                <button onClick={() => {
                    if (newFishMarker == false) {
                        setNewFishMarker(true)
                        changeText("Remove New Marker")
                    }
                    else {
                        setNewFishMarker(false)
                        changeText("Add a New Catch")
                    }
                }}>
                    {buttonText}
                </button>
            </div>
            <br />
            <div id="MapBox">
                <img src={compass} id="geolocate"
                    onClick={() => {
                        alert("Ensure Location Services Are Enabled in This Browser")
                        // try {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                console.log(position)
                                panTo({
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                });
                                setMapCenter({
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                })
                            },
                            () => null
                        );
                    }}
                />
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter ? mapCenter : setMapCenter({ lat: 34.48686532, lng: -82.8805130 })}
                    zoom={11}
                    options={options}
                    onLoad={onMapLoad}
                    onUnmount={onUnmount}
                    onClick={() => {
                        setActiveMarker(null);
                    }}
                >
                    <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Enter a fishing location"
                            id='searchbox'
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid black`,
                                width: `190px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                // display: "flex",
                                left: "40%",
                                // marginLeft: "-10x",
                                top: "10px"
                            }}
                        />
                    </Autocomplete>
                    {
                        allFishData.map(({ pk, fields }) => (
                            <Marker
                                key={pk}
                                position={{
                                    lat: parseFloat(fields.latitude),
                                    lng: parseFloat(fields.longitude),
                                }}
                                icon={fishicon}
                                onClick={() => handleActiveMarker(pk)}
                            >
                                {activeMarker == pk ? (
                                    <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                        <div id="infoWindow">
                                            <b><div>Species: {fields.species}</div></b>
                                            <b><div>Date: {fields.date}</div></b>
                                            <b><div>Method: {fields.fishing_method}</div></b>
                                            <b><div>Depth: {fields.depth} ft.</div></b>
                                            <b><div>Weight: {fields.weight} lbs.</div></b>
                                            <b><div>Length: {fields.length} in.</div></b>
                                            <b><div>Field Notes:</div></b>
                                            <b><div>{fields.notes}</div></b>
                                            <br />
                                            <img id="infoPic" src={`static/media/${fields.catch_picture}`} />
                                        </div>
                                    </InfoWindow>
                                ) : null}
                            </Marker>))
                    }
                    {
                        newFishMarker &&
                        <Marker
                            key={markerCount}
                            position={mapCenter}
                            icon={newcatch}
                            draggable={true}
                            onDragEnd={(event) => {
                                // Setting state to true for the add new catch popup window
                                setDragEvent(true)

                                console.log("The Marker Has Moved")
                                console.log(event.latLng.lat())
                                console.log(event.latLng.lng())
                                setNewCatchLat(event.latLng.lat())
                                setNewCatchLng(event.latLng.lng())
                                // newCatchLat and newCatchLng have both been updated, but don't reflect changes until double click
                            }}
                            onDragStart={(event) => {
                                setDragEvent(false)
                                console.log('>>>>drag start')
                            }}
                            onDblClick={(event) => {
                                console.log("We can have the user use the double click property to set his icon and bring up the fish data form")
                                console.log("My catch coord states have been set to  " + newCatchLat + " and " + newCatchLng)
                            }}
                        />
                    }
                    <></>
                </GoogleMap>
            </div>
            {
                dragEvent ? <NewCatch newCatchLat={newCatchLat} newCatchLng={newCatchLng} panTo={panTo} allFishData={allFishData} setNewFishMarker={setNewFishMarker} changeText={changeText} setMapCenter={setMapCenter} mapCenter={mapCenter} setNewCatchSaved={setNewCatchSaved} /> : null
            }
        </div >
    ) : <></>

}

export default CatchMap
