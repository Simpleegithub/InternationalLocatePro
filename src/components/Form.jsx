// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { NavLink, useNavigate } from "react-router-dom";
import useUrllocation from "../Hooks/useUrllocation";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../Contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const{ createCity,isloading} =useCities();

  const[lat,lng] = useUrllocation();
  console.log(lat,lng)

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const[isloadinggeocoding,setisloadinggeocoding]=useState(false);
  const[geocodingerror,setgeocodingerror]=useState('');
  const navigate=useNavigate();
  const [emoji,setemoji]=useState('');

  useEffect(function(){
    if(!lat && !lng) return;
    async function Fetchcitydata(){
      try{
      setisloadinggeocoding(true);
      setgeocodingerror('');
      const resp = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?Latitude=${lat}&Longitude=${lng}`);
      
      const data=await resp.json();
      console.log(data);
      if(!data.countryCode) throw new Error('That doesnot seem to be a city. Click somewhere else 🙂')

      setCityName(data.city || data.locality || "");
      setCountry(data.countryName);
      setemoji(convertToEmoji(data.countryCode))

 

      }
      catch(err){
      console.log(err);
      setgeocodingerror(err.message)
      } finally{
        setisloadinggeocoding(false)
      }
    }
    Fetchcitydata()

  },[lat,lng])

  function handlesubmit(e){
  e.preventDefault();
  if(!cityName || !date)  return;
  const newcity={
    cityName,
    country,
    emoji,
    date,
    notes,
    position:{lat,lng}
  }
  createCity(newcity);
  navigate("/app/cities")
  
  }

  if(!lat && !lng) return <Message message='Start by Clicking somewhere on the map'/>

  if(isloadinggeocoding) return <Spinner/>

  if(geocodingerror)  return <Message message={geocodingerror}/>

  return (
   
    <form className={`${styles.form} ${isloading ? styles.loading :""}`} onSubmit={handlesubmit} >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
     
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id="date" onChange={(date)=>setDate(date)} selected={date} dateFormat='dd/MM/yyyy'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
      <Button type='primary'>Add</Button>
        <Button type='back' onClick={(e)=>{
          e.preventDefault()
          navigate(-1);
        }}>&larr; Back</Button>
      
     
      </div>
    </form>

  );
}

export default Form;
