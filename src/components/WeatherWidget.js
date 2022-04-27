import React from 'react';

const WeatherWidget = ({weatherData, city, setCity}) => {
    const handleCity = (e) => {
        setCity(e.target.value);
    }
    return (
        <>
            {weatherData &&
            <div className='weather_widget_wrapper'>
                <h1>Weather</h1>
                <div className='weather_details'>
                    <select onChange={handleCity} value={city}>
                        <option value='Aberdeen'>Aberdeen</option>
                        <option value='Antananarivo'>Antananarivo</option>
                        <option value='Paris'>Paris</option>
                        <option value='Reykjavik'>Reykjavik</option>
                        <option value='Shanghai'>Shanghai</option>
                    </select>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Temperature: {weatherData.main.temp}</p>
                    <p>Feels like: {weatherData.main.feels_like}</p>
                    <p>Temp min: {weatherData.main.temp_min}</p>
                    <p>Temp max: {weatherData.main.temp_max}</p>
                </div>
            </div>
            }
        </>
    );
};

export default WeatherWidget;