'use client'
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Popup, useMapEvents, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import L from "leaflet";
import MarkerType from "./Marker";
import yellowStar from "./yellowstar.png"

export const EventMap = ({ locations, sendClickLocation }) => {
    const mapRef = useRef(null);
    const [coords, setCoords] = useState(null);
    const latitude = 47.6560;
    const longitude = -122.3095;

    const handleMapClick = (event) => {
        const { lat, lng } = event.latlng;
        setCoords({ lat, lng });
        sendClickLocation(event.latlng);
      };

    const socialIcon = L.icon({
        iconUrl: "favicon.ico",
        shadowUrl: "",
        iconSize: [55, 55]
    });

    const academicIcon = L.icon({
        iconUrl: "favicon.ico",
        shadowUrl: "",
        iconSize: [55, 55]
    });

    const advocacyIcon = L.icon({
        iconUrl: "favicon.ico",
        shadowUrl: "",
        iconSize: [55, 55]
    });

    const newIcon = L.icon({
        iconUrl: "favicon.ico",
        shadowUrl: "",
        iconSize: [55, 55]
    });

    const userIcon = L.icon({
        iconUrl: yellowStar.src,
        shadowUrl: "",
        iconSize: [55, 55]
    });

    function UserMarker() {
        const [position, setPosition] = useState(null)
        const map = useMap();
        useEffect(() => {
            map.locate();
            const locationFoundHandler = (e) => {
            setPosition(e.latlng);
            // map.flyTo(e.latlng, 16);
            };
            map.on('locationfound', locationFoundHandler);

            return () => {
            map.off('locationfound', locationFoundHandler);
            };
        }, [map]);

        useMapEvents({
            click: handleMapClick,
        });
    
      
        return position === null ? null : (
          <Marker position={position} icon={userIcon}>
            <Popup>You are here</Popup>
          </Marker>
        )
    }

    return ( 
        <MapContainer 
            center={[latitude, longitude]} 
            zoom={16} 
            ref={mapRef} 
            style={{height: "80vh", width: "60vw"}}
            >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <UserMarker />
            {coords && (<Marker position={coords} icon={newIcon}>
                <Popup>
                    Testing
                </Popup>
            </Marker>
            )}
        </MapContainer>
    )
}

export default EventMap;