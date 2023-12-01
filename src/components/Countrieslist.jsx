import PropTypes from "prop-types";

import styles from "./Countrieslist.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import Countryitem from './CountryItem';
import { useCities } from "../Contexts/CitiesContext";

function Countrieslist() {
  const {cities,isloading} = useCities();

  if (isloading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add Your first City by clicking on the city on the map"}
      />
    );
 console.log(cities)
   const countries=cities.reduce((acc,currentvalue)=> {
    if(!acc.map((el)=>el.country).includes(currentvalue.country)) 
    return [...acc,{country:currentvalue.country,emoji:currentvalue.emoji}];
    else return acc;
   },[])
  return (
    <ul className={styles.countrieslist}>
      {countries.map((country) => (
        <Countryitem country={country} key={country.id} />
      ))}
    </ul>
  );
}

Countrieslist.propTypes = {
  cities: PropTypes.object,
  isloading:PropTypes.func
};

export default Countrieslist;
