import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix icon marker leaflet yang sering hilang di React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapTracker = ({ towerData }) => {
  const position = towerData?.geo ? [towerData.geo.lat, towerData.geo.lng] : [-6.2088, 106.8456];

  return (
    <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-white/10 grayscale-[0.8] contrast-[1.2]">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', background: '#0a0a0a' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {towerData?.geo && (
          <>
            <Marker position={position}>
              <Popup>
                <div className="text-black">
                  <strong>Target Tower</strong><br/>
                  CID: {towerData.tower_info.cid}
                </div>
              </Popup>
            </Marker>
            <Circle 
              center={position} 
              radius={500} 
              pathOptions={{ color: towerData.status === 'CRITICAL' ? '#ff003c' : '#00f3ff', fillColor: towerData.status === 'CRITICAL' ? '#ff003c' : '#00f3ff', fillOpacity: 0.2 }} 
            />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapTracker;
