import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const useForecast = (city) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchForecast = async () => {
    if (!city) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== "200") {
        setError(data.message || "Error fetching forecast");
        console.log(data.message, "message");
        setForecast([]);
        return;
      }

      const daily = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(daily);
    } catch (err) {
      setError("Network error");
      console.log("error while fetaching forcast", err);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, [city]);

  return { forecast, loading, error };
};
