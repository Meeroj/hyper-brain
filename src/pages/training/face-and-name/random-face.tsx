import MySwiper from "@/components/swiper/card-swiper";
import { mockDataForFace } from "./mock-data";
import { useDispatch, useSelector } from "react-redux";
import { processStarted } from "@/redux/slice/training.slice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Clock from "@/components/clock/clcok"; // Ensure correct import
import { RootState } from "@/redux/store";
import { useEffect } from "react";

export default function RandomFace() {
  const dispatch = useDispatch();
  const { systemTime } = useSelector((state: RootState) => state.training);
  
  useEffect(() => {
    dispatch(processStarted({
      randomFaces: mockDataForFace  
    }));
  }, [dispatch]);

  const navigate = useNavigate();
  const handleFinish = () => {
    navigate('/dashboard/training/face/user-input', { replace: true });
  };

  return (
    <div className="my-5 flex justify-center items-center h-screen flex-col gap-10">
      <Clock route={'/dashboard/training/face/user-input'} time={systemTime} />
      <MySwiper cardItems={mockDataForFace} />
      <Button variant='outline' onClick={handleFinish}>Finish</Button>
    </div>
  );
}
