/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

function Map() {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();

  // eslint-disable-next-line no-unused-vars
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line no-unused-vars
  const mapLat = searchParams?.get("lat");
  // eslint-disable-next-line no-unused-vars
  const mapLng = searchParams?.get("lng");

  // eslint-disable-next-line no-unused-vars
  const {isLoading:isLoadingPositioon,position:geoLocationPosition,getPosition}= useGeolocation()
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(function(){
    if(geoLocationPosition) setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng||79])
  },[geoLocationPosition])
  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };

  return (
    <div className={styles.mapContainer}>
      <Button type='position'  onClick={getPosition}>{isLoadingPositioon?"Loading...":"Know your position"}</Button>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={false}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick/>
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  // useMap hook return current instance of map being displayed

  // Since this is a functional component we have to return some jsx
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e)=>{
    navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)}
  });
}
export default Map;
