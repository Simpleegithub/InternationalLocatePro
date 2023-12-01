import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import PropTypes from 'prop-types';


const CitiesContext = createContext();

const initialstate={
  cities:[],
  isloading:false,
  currentcity:{},
  error:""
}

function reducer(state,action){
switch(action.type){

  case "loading":
    return {...state,isloading:true}

  case "cities/loaded":
    return(
      {...state,isloading:false,cities:action.payload}
    )

  case "city/loaded":
    return{...state,isloading:false, currentcity:action.payload}
    

  case "city/created":
    return {...state,isloading:false,cities:[...state.cities,action.payload],currentcity:action.payload}
   

  case "city/deleted":
    return {...state,isloading:false,cities:state.cities.filter((city)=>city.id!==action.payload),currentcity:{}}



  case "rejected":
    return { ...state, isloading:false,error:action.payload }
  
  default:
    throw new Error('Unknown action performed')

}
}


function CitiesProvider({children}) {
  // const [cities, setcities] = useState([]);
  // const [isloading, setisloading] = useState(false);
  // const [currentcity,setcurrentcity]=useState({});
  const[state,dispatch]=useReducer(reducer,initialstate) ;
  const{cities,isloading,currentcity,error} =state;

  useEffect(function () {
    async function fetchData() {
      try {
        dispatch({type:'loading'})
        const resp = await fetch("http://localhost:8003/cities");
        const data = await resp.json();
        console.log(data);
        dispatch({type:"cities/loaded",payload:data})
      
      } catch (err) {
        dispatch({type:"rejected",payload:"Error while fetching the data"})
      } 
    }
    fetchData();
  }, []);

   const getcity= useCallback(  async function getcity(id){
    if(Number(id)===currentcity.id) return;
    
        try {
          dispatch({type:'loading'})

          const resp = await fetch(`http://localhost:8003/cities/${id}`);
          const data = await resp.json();
          console.log(data);
          dispatch({type:"city/loaded",payload:data})
        } catch (err) {
          dispatch({type:"rejected",payload:"Error while loading the city"})

        }
      
  },[currentcity.id])



  async function createCity(newcity){
    
    try {
      dispatch({type:'loading'})

      const resp = await fetch(`http://localhost:8003/cities`,{
        method:'POST',
        body:JSON.stringify(newcity),
        headers:{
          "Content-type":"application/json"
        }
      });
      const data = await resp.json();
      console.log(data);
     
     dispatch({type:"city/created",payload:data})
    } catch (err) {
      dispatch({type:"rejected",payload:"Error while adding the city"})

    } 
  
}




async function DeleteCity(id){
    
  try {
    dispatch({type:'loading'})

     await fetch(`http://localhost:8003/cities${id}`,{
      method:'Delete',

   
    });

 
    dispatch({type:"city/deleted",payload:id})
  } catch (err) {
    dispatch({type:"rejected",payload:"Error while deleting the data"})
    
  } 

}





  return (
    <CitiesContext.Provider
      value={{
        cities,
        isloading,
        currentcity,
        getcity,
        createCity,
        DeleteCity,
        error
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}


function useCities(){
    const context=useContext(CitiesContext);
    return context;
}


CitiesProvider.propTypes={
    children:PropTypes.object,
    onClick:PropTypes.elementType,
    type:PropTypes.func
}

export  {CitiesProvider,useCities};
