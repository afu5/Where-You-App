'use client'
import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Popup, useMapEvents, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerType from "./Marker";

type MapProps = {
    sendClickLocation: (latlng) => void;
}

export const EventMap = ({ locations }) => {
    const mapRef = useRef(null);
    const latitude = 47.6560;
    const longitude = -122.3095;

    const mapIcon = L.icon({
        iconUrl: "favicon.ico",
        shadowUrl: "",
        iconSize: [55, 55]
    });

    // function LocationMarker() {
    //     const [position, setPosition] = useState(null)
    //     const map = useMapEvents({
    //       click() {
    //         map.locate()
    //       },
    //       locationfound(e) {
    //         setPosition(e.latlng)
    //         map.flyTo(e.latlng, map.getZoom())
    //       },
    //     })
      
    //     return position === null ? null : (
    //       <Marker position={position} icon={mapIcon}>
    //         <Popup>You are here</Popup>
    //       </Marker>
    //     )
    //   }

    return ( 
          <MapContainer 
                center={[latitude, longitude]} 
                zoom={16} 
                ref={mapRef} 
                style={{height: "80vh", width: "60vw"}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <LocationMarker /> */}
            {/* <MarkerType /> */}
          </MapContainer>
    )
}

export default EventMap;