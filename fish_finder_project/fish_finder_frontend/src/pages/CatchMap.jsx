import { useCallback, useState, useRef, useMemo } from 'react'
import MapStyles from "../MapStyles"
import fishicon from "../assets/fishicon.png"
import hookicon from "../assets/hookicon.png"

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

    const center = {
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
        
        // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        //  R E P L A C E   T H I S   L I N E   W I T H   G O O G L E   M A P S   K E Y (line 8 of .env file)
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

    return isLoaded ? (
        <div class="MapPage">
            <h2 id="MapTitle">Welcome to the Map Page</h2>
            <br />
            <h3 id="MapInstructions">This is a placeholder for the instructions that will tell the user how to interact with this page.</h3>
            <br />
            <div id="MapBox">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={11}
                    options={options}
                    onLoad={onMapLoad}
                    onUnmount={onUnmount}
                    onClick={(event) => {
                        setMarkers(current => [...current, {
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng()
                        }]);
                        setActiveMarker(null);
                        markerCount += 1;
                    }}
                >
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
                    <></>
                </GoogleMap>
            </div>
        </div >
    ) : <></>

}

export default CatchMap