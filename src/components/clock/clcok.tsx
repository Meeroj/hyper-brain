import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ClockProps {
    route: string;
    time: number
}

export default function Clock({ route, time }: ClockProps) {

    const [initialClock, setInitialClock] = useState({
        minut: 0,
        second: 0
    });

    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setInitialClock((prevClock) => {
                const newSecond = prevClock.second + 1;
                const newMinute = prevClock.minut + (newSecond >= 60 ? 1 : 0);
                const updatedSecond = newSecond % 60;

                if (newMinute === Number(time)) {
                    clearInterval(intervalId);
                    navigate(route, { replace: true });
                }

                return {
                    minut: newMinute,
                    second: updatedSecond
                };
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [time, navigate, route]);


    return (
        <div className={`absolute top-0 left-1/2 px-3 rounded-b-md bg-secondary`}>
            <p>
                {initialClock.minut >= 10 ? initialClock.minut : '0' + initialClock.minut} :
                {initialClock.second >= 10 ? ' '+ initialClock.second : ' 0' + initialClock.second}
            </p>
        </div>
    );
}
