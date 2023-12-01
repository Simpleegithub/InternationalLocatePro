import PropTypes from "prop-types";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";

function CityItems({ city }) {
  const { currentcity } = useCities();
  const { cityName, date, emoji, id, position } = city;
  const{DeleteCity}=useCities();

  function handleclick(e){
  e.preventDefault();
  DeleteCity(id);
  }
  // console.log(city)
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentcity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleclick}>&times;</button>
      </Link>
    </li>
  );
}

CityItems.propTypes = {
  city: PropTypes.object,
};

export default CityItems;
