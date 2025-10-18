'use client'
import React, { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const EventMap = () => {
    const mapRef = useRef(null);
    const latitude = 47.6560;
    const longitude = -122.3095;

    // var map = L.map('map').setView([latitude, longitude], 16);

    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map);
    
    // googleStreets.addTo(map);
    // return map;
// }

    // return map;
    // const Map = () => {
    //     const mapContainer = useRef(null);
    //     const map = useRef(null);
    //     const center = {[longitude, latitude]};
    //     const [zoom] = useState(16);
    // }
    
    // export default Map;
    
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
            {}
          </MapContainer>
    )
}

//         // <MapContainer
//         //     center={[latitude, longitude]}
//         //     zoom={13}
//         //     minZoom={5}
//         //     style={{ width: '100%', height: '100%' }}
//         // >
//         //     <TileLayer
//         //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         //         url='https://mt0.google.com/vt/lyrs=m&hl=en&x=%7Bx%7D&y=%7By%7D&z=%7Bz%7D'
//         //     />
//         //     {/* <GeoJSON data={wa} style={{fillColor: 'transparent'}}/> */}

//         //     {/* {clinics.map(renderMarkers)} */}
//         // </MapContainer>
//     );
// };

export default EventMap;