import React from 'react';
//reducer
import { weatherReducer } from "./reducers/weatherReducer";

//create the store
export const Store = React.createContext(); 

//initial state
const initialState =  {
    weatherData: {}
}; 

//props will give us access to the rest of the components
export const StoreProvider = (props) => {

    //add the reducer
    //hook returns the state and dispatch with the action
    const [state, dispatch] = React.useReducer(weatherReducer, initialState);
    const value = { state, dispatch };

    //return the Provider with the value from the reducer
    return <Store.Provider value={value}>
                {props.children}
           </Store.Provider>
}