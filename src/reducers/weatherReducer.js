
export const weatherReducer = (state, action) => {
    switch(action.type){
        //add more cases in order to improve the app
        case "FETCH_DATA":
            return {...state, weatherData: action.payload };
        
        default: 
            return state;
    }
}