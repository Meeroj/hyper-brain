import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ClockProps {
  route: string;
  time: number;
}

export default function Clock({ route, time }: ClockProps) {
  const [initialClock, setInitialClock] = useState({
    minute: 0,
    second: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setInitialClock((prevClock) => {
        const newSecond = prevClock.second + 1;
        const newMinute = prevClock.minute + (newSecond >= 60 ? 1 : 0);
        const updatedSecond = newSecond % 60;

        if (newMinute === Number(time)) {
          clearInterval(intervalId);
          navigate(route, { replace: true });
        }

        return {
          minute: newMinute,
          second: updatedSecond,
        };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time, navigate, route]);

  return (
    <div className="absolute top-0 left-1/2 px-3 rounded-b-md bg-secondary">
      <p>
        {initialClock.minute >= 10 ? initialClock.minute : '0' + initialClock.minute} :
        {initialClock.second >= 10 ? initialClock.second : '0' + initialClock.second}
      </p>
    </div>
  );
}
