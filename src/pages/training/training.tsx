import { Outlet } from "react-router-dom";

export const Training = () => {
 
  return (
  <div className="p-4 w-full md:w-[70%] xl:w-[1600px] mx-auto overflow-hidden overflow-y-auto h-screen">
    <Outlet/>
  </div>
  );
};
