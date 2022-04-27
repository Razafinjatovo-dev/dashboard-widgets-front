import React, {useState, useEffect} from 'react';
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";


const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [city, setCity] = useState('Paris');
    const [weatherData, setWeatherData] = useState('');
    useEffect(() => {
        async function fetchWeatherData() {
            document.querySelector('title').innerText = 'Dashboard';
            try {
                setIsLoading(true);
                //fetch data from weather api
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5855aa75b8b0bd44726f3a182ad9a770`);
                if (response.ok && response.status === 200) {
                    const data = await response.json();
                    setWeatherData(data);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    throw new Error('Failed fetching weather data');
                }
            } catch (e) {
                setIsLoading(false);
                alert(`Error:${e.message} `);
            }
        };
        fetchWeatherData();
    }, [city])

    return (
        <div>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
            <WeatherWidget weatherData={weatherData} city={city} setCity={setCity}/>
            }
            <NewsWidget/>
        </div>
    );
};

export default HomePage;