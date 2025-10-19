import L from "leaflet";
import React from "react";
import { Marker, Popup, useMap } from "react-leaflet";

export default function MarkerType(props) {
    const map = useMap();

    const mapIcon = L.icon({
        iconUrl: "favicon.ico",
        shadowUrl: "",
        iconSize: [55, 55]
    });

  return (
    <div>
      <Marker
        icon={props.icon}
        position={[props.lat, props.lng]}
        eventHandlers={{
          click: (e) => {
            map.flyTo(e.latlng, 14);
          },
        }}
        >
        <Popup>test popup</Popup>
      </Marker>
    </div>
  );
}
