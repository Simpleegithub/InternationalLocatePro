import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Contexts/CitiesContext";
import PropTypes from "prop-types";
import { useGeolocation } from "../Hooks/useGeolocation";
import Button from "./Button";
import useUrllocation from "../Hooks/useUrllocation";

function Map() {
  const [MapPostion, setMapPositon] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  
  // const [searchparams, setsearchparams] = useSearchParams();
  // const lat = searchparams.get("lat");
  // const lng = searchparams.get("lng");
  const[lat,lng] = useUrllocation();
  console.log(lng);
  console.log(lat);

  useEffect(
    function () {
      if (lat && lng) setMapPositon([lat, lng]);
    },
    [lat, lng]
  );

  useEffect(function(){
 if(geolocationPosition) setMapPositon([geolocationPosition.lat,geolocationPosition.lng])
  },[geolocationPosition])

  return (
    <div
      className={styles.mapContainer}
      //   onClick={() => {
      //     navigate("form");
      //   }}
    >
    { !geolocationPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPosition?"isloading...":"Use your Position"}
      </Button>}
      <MapContainer
        center={MapPostion}
        // center={[lat,lng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={MapPostion} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);

    },
  });
}

ChangeCenter.propTypes = {
  position: PropTypes.array,
};

export default Map;
