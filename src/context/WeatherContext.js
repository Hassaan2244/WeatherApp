import { createContext, useContext, useState,useEffect } from "react";

const WeatherContext= createContext();

export const WeatherProvider = ({children}) =>{
    const [city, setCity] = useState("Lahore");
    const [weather, setWeather] = useState(null);
    // const[dailyWeather, setDailyWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const API_KEY = "92eafdab148e9830d356dfbe302be522";
    // const DAPI_KEY = "oyaTeEX2IvlUDgbkctBwCH48vIXsiKJL";

    useEffect(() => {
        if (!city || !API_KEY) return;
    
        const fetchWeather = async () => {
          try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
            const data = await response.json();
            console.log("Full API Response", data);
    
            if (response.ok) {
              setWeather(data);

              // const dailyResponse = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${city}&apikey=${DAPI_KEY}`);
              // const dailyData = await dailyResponse.json();
              // console.log("Daily weather response",dailyData);
              // if(dailyResponse.ok){
              //   setDailyWeather(dailyData);

              // }else{
              //   setError(`Error fetching Daily Data: ${dailyData.message}`)
              // }
            } else {
              setError(`Error: ${data.message}`);
            }
          } catch (err) {
            setError("Failed to fetch data");
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchWeather();
      }, [city, API_KEY]);

      return(
        <WeatherContext.Provider value={{ setCity, weather, isLoading, error}}>
            {children}
        </WeatherContext.Provider>
      )
}

export const useWeather = () =>{
    return useContext(WeatherContext);
}