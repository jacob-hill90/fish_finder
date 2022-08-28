import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react'
import MapStyles from "../MapStyles"
import fishicon from "../assets/fishicon.png"
import hookicon from "../assets/hookicon.png"
import newcatch from "../assets/newcatch.png"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete"
import { clearSuggestions } from 'use-places-autocomplete';


// // import Google Maps
import {
    GoogleMap,
    useGoogleMap,
    Marker,
    InfoBox,
    Circle,
    MarkerCluster,
    InfoWindow,
    useJsApiLoader,
    StandaloneSearchBox,
    Autocomplete,
    searchBox,
} from "@react-google-maps/api"

// const dotenv = require('dotenv').config()
// console.log(process.env)
// const path = require('path');
// require("dotenv").config({path: path.resolve(__fish_finder_project, './.env')});

function CatchMap() {
    // this variable allows the search bar to populate places
    const libraries = ["places"]
    //this variable is the google maps api key:
    // const apiKey = process.env.REACT_APP_googleMapsApiKey

    // this variable is a short hand way of changing the current map component
    const mapRef = useRef();
    // sets the display size of the map
    const containerStyle = {
        width: '1000px',
        height: '600px'
    };
    // starting map center attribute
    // default mapCenter is Lake Hartwell
    const [mapCenter, setMapCenter] = useState({ lat: 34.48686532, lng: -82.8805130 })

    // let center = {
    //     lat: 34.48686532,
    //     lng: -82.8805130
    // };
    // option gives us 1. Map CSS, Disable all default widgets, gives user zoom control, gives user a distance scale
    const options = {
        // styles: MapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
        mapTypeControl: true,
    };
    // loads google map api's script
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // process is undefined
        googleMapsApiKey: "AIzaSyCvRBwjBlzY9tMrm46tx6ksnRzGvxvUI5U",
        // apiKey,  
            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
            //  R E P L A C E   T H I S   L I N E   W I T H   G O O G L E   M A P S   K E Y
            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
    const testMarkers = [
        {
            id: 1,
            name: "Fish 1",
            position: { lat: 34.394142, lng: -82.874662 }
        },
        {
            id: 2,
            name: "Fish 2",
            position: { lat: 34.434243, lng: -82.828167 }
        },
        {
            id: 3,
            name: "Fish 3",
            position: { lat: 34.495208, lng: -82.857333 }
        },
        {
            id: 4,
            name: "Fish 4",
            position: { lat: 34.518695, lng: -82.806761 }
        }
    ]
    // id used for new marker key, will use primary key in model when using real db data
    let markerCount = 4;
    // hook for generating a new catch icon on map (used with Add Catch button)
    const [newFishMarker, setNewFishMarker] = useState(false)

    /* THIS IS STATE CODE FOR THE SEARCHBOX FUNCTIONALITY */
    //Pan To function declaration takes a latitude and a longitude
    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(11)

    }, [])
    //setting state for autocomplete instance
    const [autocomplete, setAutocomplete] = useState(null)

    // onLoad callback called when autocomplete has loaded.
    const onLoad = (autocomplete) => {
        // console.log('autocomplete', autocomplete)
        //setting the instaance of autocomplete
        setAutocomplete(autocomplete)
    }

    // onPlaceChanged is called when a user selects a location from the suggestions in the box dropdown.
    const onPlaceChanged = () => {
        if (autocomplete !== null) {

            let panLat = autocomplete.getPlace().geometry.location.lat()
            let panLng = autocomplete.getPlace().geometry.location.lng()
            console.log('lat and long', panLat, panLng)
            let LatLng = { lat: panLat, lng: panLng }
            setMapCenter(LatLng)
            panTo(LatLng)




        }
        else {
            console.log('Autocomplete is not loaded yet')
        }
    }

    const [newCatchLat, setNewCatchLat] = useState(34.48686532)
    const [newCatchLng, setNewCatchLng] = useState(-82.8805130)








    return isLoaded ? (
        <div class="MapPage">
            <h2 id="MapTitle">See What Local Anglers Have Been Catching Near You!</h2>
            <div id="MapInstructions">
                <p>Find your local fishing location using the search bar below.</p>
                <p> Then click the "Add Catch" button to add a new fish to the map.</p>
                <p> Drag the fish icon to the location where you landed your fish.</p>
                <p> Double click the icon to add details about the catch and save it to the map.</p>
                <button onClick={() => {
                    if (newFishMarker == false) {
                        setNewFishMarker(true)
                    }
                    else {
                        setNewFishMarker(false)
                    }
                }}>
                    Add Catch
                </button>
                <button onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
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
                >
                    Find Home
                </button>
            </div>
            <br />
            <div id="MapBox">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={11}
                    // options={options}
                    onLoad={onMapLoad}
                    onUnmount={onUnmount}
                    onClick={() => {
                        setActiveMarker(null);
                    }}
                // onClick={(event) => {
                //     setMarkers(current => [...current, {
                //         lat: event.latLng.lat(),
                //         lng: event.latLng.lng()
                //     }]);
                //     setActiveMarker(null);
                //     markerCount += 1;
                // }}
                >
                    <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                    >
                        <input
                            type="text"
                            placeholder="Enter your favorite fishing spot!"
                            id='searchbox'
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                                position: "absolute",
                                left: "50%",
                                marginLeft: "-120px"
                            }}
                        // onChange = {searchInput}
                        />
                    </Autocomplete>
                    {/* adding marker repositions map to default center zoom */}
                    {markers.map((marker) => (
                        <Marker
                            key={markerCount}
                            icon={hookicon}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            draggable={true}
                        />
                    ))}
                    {testMarkers.map(({ id, name, position }) => (
                        <Marker
                            key={id}
                            position={position}
                            icon={fishicon}
                            onClick={() => handleActiveMarker(id)}
                        >
                            {activeMarker === id ? (
                                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                    <div>{name}</div>
                                </InfoWindow>
                            ) : null}
                        </Marker>))}
                    {newFishMarker &&
                        <Marker
                            key={markerCount}
                            position={mapCenter}
                            icon={newcatch}
                            draggable={true}
                            onDragEnd={(event) => {
                                console.log("The Marker Has Moved")
                                console.log(event.latLng.lat())
                                console.log(event.latLng.lng())
                                setNewCatchLat(event.latLng.lat())
                                setNewCatchLng(event.latLng.lng())
                                // newCatchLat and newCatchLng have both been updated, but don't reflect changes until double click
                            }}
                            onDblClick={(event) => {
                                console.log("We can have the user use the double click property to set his icon and bring up the fish data form")
                                console.log("My catch coord states have been set to  " + newCatchLat + " and " + newCatchLng)
                            }}
                        />}
                    <></>
                </GoogleMap>
            </div>
        </div >
    ) : <></>

}

export default CatchMap



// const [userLat, setUserLat] = useState();
// const [userLong, setUserLong] = useState();

// useEffect(() => {
//     navigator.geolocation.getCurrentPosition(position => {
//         // setUserLat(position.coords.latitude);
//         // setUserLong(position.coords.longitude);
//         // lake winnie coords: 43.598484, -71.322488
//         setUserLat(43.598484)
//         setUserLong(-71.322488)
//         console.log(userLat, userLong);
//     })
// }, []);


{/* <div>
<img id="house" src={homeheart} alt="Geolocate"
    onClick={() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                props.panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            () => null
        );
    }}
/>
</div> */}