import React, {useState, useEffect } from 'react';
//import the store
import {Store} from "../store";


const Main = () => {
 //grant access to the data inside our context provider
 const {state, dispatch} = React.useContext(Store);
 
 
 
 //action
 const fetchWeather = async (city) => {
   const data = await fetch(`http://api.apixu.com/v1/current.json?key=<YOUR_APIXU_KEY>=${city}`);
   const dataJSON = await data.json();
   
   // ____ FIXES NOT IN THE CODE REVIEW
   //------------ if there is a bad request this next line of code will return true
   //------------ since the json object will contain a property called error
   console.log(dataJSON.hasOwnProperty("error"));
  
 
   //return the action dispatch
    return dispatch({
        type: "FETCH_DATA",
        payload: dataJSON
    });

 }

 
 const [city, setCity] = useState("");
 const [conditions, setConditions] = useState("");
 /*
    //make and initial call when component is mounted
    useEffect(() => {
        fetchWeather("paris").then(res =>{
            setConditions(true);
        }).catch(err => {
            console.log(err);
        });
        
    }, []); 
*/
 const getWeatherInfo = (e) => {
    e.preventDefault();
    
    // ____ FIXES NOT IN THE CODE REVIEW
    if(city === "" || city === undefined){
        console.log("nothing to look for")
    }else{
        fetchWeather(city).then( res => {
            console.log("Fetched results");
            setConditions(true);
            
        }).catch( err => {
            console.log(err);
        });
    }

     
 }


 const weatherConditions = conditions;
 let elem = "";
 // ____ FIXES NOT IN THE CODE REVIEW
 //---------- check that the weatherData has the property location
 //---------- if there is an error, then the property location will not exist and 
 //---------- react will return an error
 if(weatherConditions && state.weatherData.hasOwnProperty("location")){
     elem = <div className="details">
                <h2>{state.weatherData.location.name} <span>{state.weatherData.location.country}</span> </h2>
                <p>{state.weatherData.location.localtime}</p>

                <div className="current">
                   
                   <p>{state.weatherData.current.temp_c}°C</p>
                   <img src={state.weatherData.current.condition.icon} />
                  
                </div>
                <div>
                    <p>{state.weatherData.current.condition.text}</p>
                </div>

            </div>
 }else{
     elem = <div>
                <p>There is nothing to search for</p>
            </div>
 } 
 
 return (
   <React.Fragment>
    
       {/**
        console.log the state inside the store
         {console.log(state)}
      */}
      <form onSubmit={getWeatherInfo}>
           <div className="control">
            <input type="text" name="name" placeholder="City to check weather, Ex. Paris" onChange={e => setCity(e.target.value)} />
           </div>

            
            <input type="submit" value="Check Weather" />
     </form>
 
    {elem}
    </React.Fragment>
  );


}

export default Main;