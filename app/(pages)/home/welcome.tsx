"use client";
import useDate from "@/hooks/useDate";
import useLocalStorage from "@/hooks/useLocalStorage";

const Greeter = () => {
  const date = useDate()!;

  const [username] = useLocalStorage("username", "User");
  return (
    <div className="flex flex-col justify-center">
      <span className="text-xl">
        Welcome, <b>{username}</b>!
      </span>
      <span className="text-5xl">
        {date.hour}:{date.minute}
        <span className="text-lg">{date.period}</span>
      </span>
      <span className="text-sm">
        {date.weekday}, {date.day} {date.month}
      </span>
    </div>
  );
};

export default Greeter;
