import styles from "./City.module.css";

import {  useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCities } from "../Contexts/CitiesContext";
import { useEffect } from "react";
import Button from "./Button";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  
  }).format(new Date(date));

function City() {
  const navigate=useNavigate();
  const [searchparams,setsearchparams]=useSearchParams();
const lat=searchparams.get('lat');
const lng=searchparams.get('lng');
console.log(lat,lng)
  const {id}=useParams();

  const{getcity,currentcity,isloading} =useCities();
console.log(currentcity)

  
  useEffect(function(){
  getcity(id)
  },[id,getcity])

  
  const { cityName, emoji, date, notes } = currentcity;
  
  if(isloading) return <Spinner/>

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
      <Button type='back' onClick={(e)=>{
          e.preventDefault()
          navigate(-1);
        }}>&larr; Back</Button>
      </div>
    </div>
  );
}

export default City;
