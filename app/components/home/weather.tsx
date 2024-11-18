"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { WeatherDataType } from "@/lib/types";
import { useEffect, useState } from "react";
import Loading from "../ui/loading";
import { WeatherIcon } from "../ui/weatherIcon";

enum Unit {
  "metric" = "°C",
  "imperial" = "°F",
}

const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [userCity] = useLocalStorage("userCity", "London");
  const [units] = useLocalStorage<"metric" | "imperial">("units", "imperial");
  const [weatherData, setWeatherData] = useState<WeatherDataType>();

  useEffect(() => {
    async function getWeather() {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&units=${units}&APPID=f8482c208c6d5f73b7a45157bdd459d4`;
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.dir(data);
          setWeatherData({
            city: data.name,
            type: data.weather[0].main,
            description: data.weather[0].description,
            temperature: Math.floor(data.main.temp),
            minTemperature: Math.floor(data.main.temp_min),
            maxTemperature: Math.floor(data.main.temp_max),
            feelsLike: Math.floor(data.main.feels_like),
            icon: data.weather[0].icon,
          });
          setLoading(false);
        });
    }
    getWeather();
  }, [userCity, units]);

  return (
    <div className="flex min-w-96 items-center">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-4 aspect-square h-24">
            <WeatherIcon
              iconCode={weatherData?.icon ?? "03d"}
              className="h-full w-full"
            />
          </div>
          <div className="details">
            <span className="text-3xl">
              {weatherData?.city},{" "}
              <span>
                {weatherData?.temperature}
                {Unit[units]}
              </span>
            </span>
            <p className="description">{weatherData?.description}</p>
            <span>
              Feels like {weatherData?.feelsLike}
              {Unit[units]}; Min {weatherData?.minTemperature}
              {Unit[units]}; Max {weatherData?.maxTemperature}
              {Unit[units]}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
