export type Size = "sm" | "md" | "lg";
export type Variant = "primary" | "secondary" | "ghost" | "danger";
export type InputType = "text" | "email" | "password" | "number";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  size?: Size;
  label: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  size?: Size;
  helperText?: string;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
}

export type WeatherDataType = {
  city: string;
  type: string;
  description: string;
  temperature: number;
  minTemperature: number;
  maxTemperature: number;
  feelsLike: number;
  icon: WeatherCode;
};
export type DateType = {
  hour: string; // Convert 24h to 12h format
  minute: string;
  period: "AM" | "PM";
  weekday: string;
  day: number;
  month: string;
};
export type WeatherCode =
  | "01d"
  | "01n"
  | "02d"
  | "02n"
  | "03d"
  | "03n"
  | "04d"
  | "04n"
  | "09d"
  | "09n"
  | "10d"
  | "10n"
  | "11d"
  | "11n"
  | "13d"
  | "13n"
  | "50d"
  | "50n";

export type ShortcutType = {
  id: number;
  title: string;
  url: string;
};
