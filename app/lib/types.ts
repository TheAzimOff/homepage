import React from "react";
import { IconBaseProps } from "react-icons";

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
export interface WeatherIconProps extends IconBaseProps {
  iconCode: WeatherCode;
}

export type ShortcutType = {
  id: string;
  title: string;
  url: string;
};
export type ShortcutProps = {
  shortcuts: ShortcutType[];
  index: number;
  setShortcuts: React.Dispatch<React.SetStateAction<ShortcutType[]>>;
  shortcut: ShortcutType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDefaultModalValues: React.Dispatch<React.SetStateAction<ShortcutType>>;
};
export type GmailProps = {
  emails: {
    id: string;
    threadId: string;
    internalDate: string;
    subject: string;
    snippet: string;
    date: string;
    from: string;
    unRead: boolean;
    senderName: string;
    senderEmail: string;
  }[];
  userEmail: string;
  signedIn: string;
  loading: boolean;
  handleLogout: () => void;
  reloadEmails: () => void;
  markAsRead: (id: string) => void;
  handleAuth: () => void;
};
