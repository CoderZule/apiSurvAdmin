import React, { useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const GoogleMap = ({ google, onLocationSelect }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMapClick = (mapProps, map, clickEvent) => {
        const latitude = clickEvent.latLng.lat();
        const longitude = clickEvent.latLng.lng();
        const clickedLocation = { latitude, longitude };

 
        setSelectedLocation(clickedLocation);

       
        onLocationSelect(clickedLocation);
    };

    const mapStyles = {
        width: '100%',
        height: '300px',  
        position: 'relative',
        maxWidth: '100%'
    };
    return (
        <Map
            google={google}
            zoom={14}
            style={mapStyles}
            initialCenter={{ lat: 36.8065, lng: 10.1711 }} // Default center coordinates (Tunisia)
            onClick={handleMapClick}
        >
            {/* Display a marker at the selected location */}
            {selectedLocation && (
                <Marker
                    position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                />
            )}
        </Map>
    );
}

 
export default GoogleApiWrapper({
    apiKey: 'AIzaSyDllshhGTf_lnXvSQ7xVtTZ2nent3u6KYA'
})(GoogleMap);
