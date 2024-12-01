import { DateType } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useDate() {
  const [currentDate, setCurrentDate] = useState<DateType>({
    hour: "00", // Convert 24h to 12h format
    minute: "00",
    period: "AM",
    weekday: "Monday",
    day: 31,
    month: "July",
  });

  function updateDate() {
    const date = new Date();

    setCurrentDate({
      hour: (date.getHours() % 12 || 12).toString().padStart(2, "0"), // Convert 24h to 12h format
      minute: date.getMinutes().toString().padStart(2, "0"),
      period: date.getHours() >= 12 ? "PM" : "AM",
      weekday: date.toLocaleString("en-US", { weekday: "long" }),
      day: date.getDate(),
      month: date.toLocaleString("en-US", { month: "long" }),
    });
  }
  useEffect(() => {
    updateDate();
  }, []);

  useEffect(() => {
    const interval = setInterval(updateDate, 3000);

    return () => clearInterval(interval);
  }, []);

  return currentDate;
}
