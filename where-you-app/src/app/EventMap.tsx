'use client'
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Popup, useMapEvents, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import L from "leaflet";
import yellowStar from "./yellowstar.png"
import type { Event } from "./page"

type EventMapProps = {
    locations: Event[]; // Array of location objects
    sendClickLocation: (latlng: { lat: number; lng: number }) => void;
  };

export const EventMap = ({ locations, sendClickLocation }: EventMapProps) => {
    const mapRef = useRef(null);
    const [coords, setCoords] = useState(null);
    const [hasFlown, setHasFlown] = useState(false);
    const latitude = 47.6560;
    const longitude = -122.3095;

    const handleMapClick = (event) => {
        const { lat, lng } = event.latlng;
        setCoords({ lat: lat, lng: lng });
        sendClickLocation(event.latlng);
      };

    function RenderMarkers() {
        console.log(locations);
        if (!locations || locations.length === 0) {
            return null; 
        }
        const result = [];
        for (let i = 0; i < locations.length; i++) {
            var iconType = undefined;
            if (locations[i].eventType === "Academic") {
                iconType = academicIcon;
            } else if (locations[i].eventType === "Social") {
                iconType = socialIcon;
            } else {
                iconType = advocacyIcon;
            }
            const marker = <Marker position={locations[i].coords} icon={iconType} key={locations[i].coords.lat*locations[i].coords.lat}>
                <Popup>
                    <div className="marker-popup">
                        <h3>{locations[i].name}</h3>
                        {locations[i].time} @ {locations[i].location}
                        <div className="desc">
                            {locations[i].description}
                        </div>
                        
                    </div>
                </Popup>
            </Marker>
            result.push(marker)
        }
        return result;
    }

    const socialIcon = L.icon({
        iconUrl: "social-pin.svg",
        shadowUrl: "",
        iconSize: [250, 250]
    });

    const academicIcon = L.icon({
        iconUrl: "ac-pin.svg",
        shadowUrl: "",
        iconSize: [250, 250]
    });

    const advocacyIcon = L.icon({
        iconUrl: "adv-pin.svg",
        shadowUrl: "",
        iconSize: [250, 250]
    });

    const newIcon = L.icon({
        iconUrl: "drop-pin.svg",
        shadowUrl: "",
        iconSize: [50, 50]
    });

    const userIcon = L.icon({
        iconUrl: "me-pin.svg",
        shadowUrl: "",
        iconSize: [50, 50]
    });

    function UserMarker() {
        const [position, setPosition] = useState(null)
        const map = useMap();
        useEffect(() => {
            map.locate();
            const locationFoundHandler = (e) => {
            setPosition(e.latlng);
            if (!hasFlown) {
                map.flyTo(e.latlng);
                setHasFlown(true);
            }
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
            <Popup>You are here!</Popup>
          </Marker>
        )
    }

    return ( 
          <MapContainer 
                center={[latitude, longitude]} 
                zoom={16} 
                ref={mapRef} 
                style={{height: "100%", width: "100%"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <UserMarker />
            {coords && (<Marker position={coords} icon={newIcon}/>
            )}
            <RenderMarkers />
        </MapContainer>
    )
}

export default EventMap;