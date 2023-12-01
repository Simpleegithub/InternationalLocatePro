import PropTypes from 'prop-types';
import CityItems from './CityItems';
import styles from './CityList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../Contexts/CitiesContext';





function CityList() {

  
    const {cities,isloading} = useCities();

    if(isloading) return <Spinner/>
    if(!cities.length) return <Message message={'Add Your first City by clicking on the city on the map'}/>
    return (
        <ul className={styles.cityList}>
           {cities.map((city)=><CityItems city={city} key={city.id}/>)}
        </ul>
    )
}

CityList.propTypes={
    cities:PropTypes.object,
    isloading:PropTypes.func
}

export default CityList

