import FlippyBrain from "@/components/flippy-brain/flippy-brain";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CheckNumber() {
  const { randomNumbers, userInputNumbers, systemTime } = useSelector((state: RootState) => state.training);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const navigate = useNavigate()
  
  const handleBack = ()=>{
    navigate(-1)
  }

  return (
    <div>
      <div className="flex items-center flex-col pt-3">
        <FlippyBrain/>
        <h2 className="text-3xl">Speed Number {systemTime}minut</h2>
        <div className="grid grid-cols-40 grid-rows-15 w-full lg:w-[90%] font-[oswald] bg-[hsl(var(--sidebar-bg))]/60 backdrop-blur-md text-[hsl(var(--sidebar-foreground))] my-10 p-10 h-full rounded-2xl">
          {userInputNumbers.map((el: React.ReactNode, index: number) => (
            <p
              key={index}
              className={`w-[25px] h-[25px] remove-arrow outline-none focus:border focus:border-amber-400 text-center text sm:my-2 border rounded-full cursor-pointer ${el==''&&' opacity-40'} ${
                el != "" && Number(el) === Number(randomNumbers[index])
                  ? "text-green-500 border-green-500"
                  : "text-rose-500 border-rose-500 hover:border-amber-400 hover:text-amber-700 hover:opacity-100"
              } 
              `}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {hoverIndex === index ? randomNumbers[index] : el}
            </p>
          ))}
        </div>
        <button onClick={handleBack} className="border border-amber-400 text-amber-600 px-3 py-1 rounded-md hover:text-white hover:bg-amber-500 ease-in duration-100">
         Go back
        </button>
      </div>
    </div>
  );
}
