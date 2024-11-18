import {
  WiCloud,
  WiDaySunny,
  WiMoonAltNew,
  WiDaySunnyOvercast,
  WiNightAltCloudyHigh,
  WiCloudy,
  WiRainMix,
  WiDayRainMix,
  WiNightAltHail,
  WiDayLightning,
  WiNightAltLightning,
  WiDaySnow,
  WiNightAltSnow,
  WiFog,
  WiNightFog,
} from "react-icons/wi";
import { FC } from "react";
import { IconBaseProps } from "react-icons";
import { WeatherCode } from "@/lib/types";

// Map weather codes to their corresponding icons
const WEATHER_ICONS = {
  "01d": WiDaySunny,
  "01n": WiMoonAltNew,
  "02d": WiDaySunnyOvercast,
  "02n": WiNightAltCloudyHigh,
  "03d": WiCloud,
  "03n": WiCloud,
  "04d": WiCloudy,
  "04n": WiCloudy,
  "09d": WiRainMix,
  "09n": WiRainMix,
  "10d": WiDayRainMix,
  "10n": WiNightAltHail,
  "11d": WiDayLightning,
  "11n": WiNightAltLightning,
  "13d": WiDaySnow,
  "13n": WiNightAltSnow,
  "50d": WiFog,
  "50n": WiNightFog,
};

interface WeatherIconProps extends IconBaseProps {
  iconCode: WeatherCode;
}

export const WeatherIcon: FC<WeatherIconProps> = ({ iconCode, ...props }) => {
  const IconComponent = WEATHER_ICONS[iconCode];
  return <IconComponent {...props} />;
};
