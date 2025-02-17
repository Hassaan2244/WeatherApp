import React from 'react'
import { useWeather } from './context/WeatherContext'

const WeatherContent = () => {
    const { setCity, weather, isLoading, error} = useWeather();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: "linear-gradient(to bottom, #87CEEB, #4682B4)" }}
    >
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">
        Weather App 🌤
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const inputCity = e.target.elements.city.value;
          if (inputCity) setCity(inputCity);
        }}
        className="flex space-x-2 mb-6"
      >
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          className="p-3 border border-gray-300 rounded-md text-black w-64"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md">
          Search
        </button>
      </form>

      {isLoading && <p className="text-xl text-white animate-pulse">Loading weather...</p>}
      {error && <p className="text-red-300 text-lg">{error}</p>}

      {weather && (
        <div className="backdrop-blur-md bg-white/30 text-gray-900 p-6 rounded-2xl shadow-xl text-center w-96 border border-white/40">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-24 mx-auto"
          />

          <h2 className="text-3xl font-semibold text-white">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-lg text-gray-200 capitalize">{weather.weather[0].description}</p>

          <div className="mt-4 grid grid-cols-1 gap-4 text-white">
            <p className="text-xl font-semibold">🌡️ {weather.main.temp}°C</p>
            <p className="text-xl font-semibold">💧 {weather.main.humidity}%</p>
            <p className="text-xl font-semibold">🔥 Feels Like {weather.main.feels_like}°C</p>
            <p className='text-xl font-semibold'></p>
          </div>
        </div>
      )}

{/* {dailyWeather && (
                <div className="mt-8 bg-white/30 p-6 rounded-xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-2xl font-bold text-white mb-4 text-center">7-Day Forecast</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {dailyWeather.map((day, index) => (
                            <div key={index} className="p-4 bg-white/40 rounded-lg text-center">
                                <p className="text-lg font-semibold">{new Date(day.time).toLocaleDateString()}</p>
                                <p>🌡️ {day.values.temperatureAvg}°C</p>
                                <p>💧 {day.values.humidityAvg}%</p>
                                <p>🌬️ {day.values.windSpeedAvg} km/h</p>
                            </div>
                        ))}
                    </div>
                </div>
            )} */}
</div>
  )
}

export default WeatherContent