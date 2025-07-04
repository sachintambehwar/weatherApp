import { useState } from "react";
import "./App.css";
import { useForecast } from "./hooks/useForecast";
import CurrentWeatherCard from "./components/CurrentWeatherCard ";
import ForecastGrid from "./components/ForecastGrid";
import { useTheme } from "./context/ThemeContext";
import Loder from "./components/Loder";
import Error from "./components/Error";

const App = () => {
  const [city, setCity] = useState("");
  const [inputCity, setInputCity] = useState("");
  const { theme, toggleTheme } = useTheme();
  const { forecast, loading, error } = useForecast(city);

  const handleSearch = () => {
    setCity(inputCity);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="forecast-container">
      <div className="header-bar">
        <h1 className="forecast-title">Weather Forecast</h1>
        <button className="toggle-button" onClick={toggleTheme}>
          <span className="toggle-knob">{theme === "light" ? "🌞" : "🌙"}</span>
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Enter city name"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value.trim())}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <Loder />}
      {error && <Error message={error} />}

      {!loading && !error && forecast.length > 0 && (
        <>
          <CurrentWeatherCard city={city} />
          <ForecastGrid forecast={forecast} />
        </>
      )}
    </div>
  );
};

export default App;
