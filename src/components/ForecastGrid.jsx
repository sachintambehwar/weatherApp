import "../css/ForecastGrid.css";

const ForecastGrid = ({ forecast }) => {
  return (
    <div className="forecast-grid">
      {forecast &&
        forecast.map((day, index) => (
          <div key={index} className="forecast-card">
            <p className="forecast-date">
              {new Date(day.dt_txt).toDateString()}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
            />
            <p className="forecast-temp">🌡️ {day.main.temp}°C</p>
            <p className="forecast-temp">⬆️ {Math.ceil(day.main.temp_max)}°C</p>
            <p className="forecast-temp">
              ⬇️ {Math.floor(day.main.temp_min)}°C
            </p>
          </div>
        ))}
    </div>
  );
};

export default ForecastGrid;
