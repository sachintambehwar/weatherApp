import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useCurrentWeather = (city, unit = "metric") => {
  const [weatherData, setWeatherData] = useState({
    metric: null,
    imperial: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");

      try {
        const [metricRes, imperialRes] = await Promise.all([
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          ),
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
          ),
        ]);

        const [metricData, imperialData] = await Promise.all([
          metricRes.json(),
          imperialRes.json(),
        ]);

        if (metricRes.ok && imperialRes.ok) {
          setWeatherData({
            metric: metricData,
            imperial: imperialData,
          });
        } else {
          setError(
            metricData.message ||
              imperialData.message ||
              "Error fetching weather"
          );
        }
      } catch {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const weather = weatherData[unit];

  return { weather, loading, error };
};
