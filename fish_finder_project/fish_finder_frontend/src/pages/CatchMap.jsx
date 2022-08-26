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

function CatchMap() {

    const libraries = ["places"]

    const mapRef = useRef();

    const containerStyle = {
        width: '1000px',
        height: '600px'
    };

    let center = {
        lat: 34.48686532,
        lng: -82.8805130
    };

    const options = {
        // styles: MapStyles,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        // process is undefined
        // googleMapsApiKey: { process.env.REACT_APP_GOOGLE_MAPS_API },
        googleMapsApiKey:
            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
            //  R E P L A C E   T H I S   L I N E   W I T H   G O O G L E   M A P S   K E Y
            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
            libraries
    })

    const [map, setMap] = useState(null)

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [markers, setMarkers] = useState([])

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

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

    let markerCount = 4;

    // const panTo = useCallback(({ lat, lng }) => {
    //     mapRef.current.panTo({ lat, lng });
    //     mapRef.current.setZoom(14);
    //     let newLat = lat;
    //     let newLng = lng
    //     console.log("new lat-lng " + newLat + newLng)
    //     center = { lat: newLat, lng: newLng }
    //     console.log("Great Success!")
    // }, []);

    const [newFishMarker, setNewFishMarker] = useState(false)

    /* THIS IS STATE CODE FOR THE SEARCHBOX FUNCTIONALITY */
    //Pan To function declaration takes a latitude and a longitude
    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng })
        mapRef.current.setZoom(14)
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

            let lat = autocomplete.getPlace().geometry.location.lat()
            let lng = autocomplete.getPlace().geometry.location.lng()
            console.log('lat and long', lat, lng)
            let LatLng = { lat: lat, lng: lng }
            panTo(LatLng)



        }
        else {
            console.log('Autocomplete is not loaded yet')
        }
    }

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
            </div>
            <br />
            <div id="MapBox">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={11}
                    options={options}
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
                            position={center}
                            icon={newcatch}
                            draggable={true}
                            onDragEnd={(event) => {
                                console.log("The Marker Has Moved")
                                console.log(event.latLng)

                            }}
                            onDblClick={(event) => {
                                console.log("We can have the user use the double click property to set his icon and bring up the fish data form")
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