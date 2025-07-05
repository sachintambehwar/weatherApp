import { useState } from "react";
import { useCurrentWeather } from "../hooks/useCurrentWeather";
import Error from "./Error";
import "../css/WeatherCard.css";
import { useFavorites } from "../context/FavoritesContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CurrentWeatherCard = ({ city }) => {
  const [unit, setUnit] = useState("metric");
  const { weather, loading, error } = useCurrentWeather(city, unit);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(city);

  if (error) return <Error />;
  if (!weather) return null;

  const {
    name,
    sys: { country },
    main: { temp, feels_like, humidity, pressure },
    weather: weatherArray,
    wind: { speed },
    visibility,
  } = weather;

  const icon = weatherArray[0].icon;
  const condition = weatherArray[0].main;
  const description = weatherArray[0].description;
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "km/h" : "mph";

  return (
    <div className="weather-card">
      <div className="header">
        <h3>
          {name}, {country}
        </h3>
        <div>
          <p>
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <button
            onClick={() => (fav ? removeFavorite(city) : addFavorite(city))}
            className="favorite-btn"
            title={fav ? "Remove from favorites" : "Add to favorites"}
          >
            {fav ? <FaHeart color="red" size={18} /> : <FaRegHeart size={18} />}
          </button>
        </div>
      </div>

      <div className="main-info">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={condition}
          className="weather-icon"
        />
        <div className="temperature">
          <h1>
            {Math.round(temp)}
            {tempUnit}
          </h1>
          <p>{condition}</p>
          <small>
            Feels like {Math.round(feels_like)}
            {tempUnit}
          </small>
        </div>
        <div className="unit-toggle">
          <label>
            <input
              type="radio"
              value="metric"
              checked={unit === "metric"}
              onChange={(e) => setUnit(e.target.value)}
            />{" "}
            °C
          </label>
          <label>
            <input
              type="radio"
              value="imperial"
              checked={unit === "imperial"}
              onChange={(e) => setUnit(e.target.value)}
            />{" "}
            °F
          </label>
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <p>Updating temperature...</p>
        </div>
      )}

      <p className="summary">{description}</p>
      <div className="details-grid">
        <div>
          <span>Wind</span>
          <p>
            {speed} {windUnit}
          </p>
        </div>
        <div>
          <span>Humidity</span>
          <p>{humidity}%</p>
        </div>
        <div>
          <span>Visibility</span>
          <p>{(visibility / 1000).toFixed(1)} km</p>
        </div>
        <div>
          <span>Pressure</span>
          <p>{pressure} mb</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
