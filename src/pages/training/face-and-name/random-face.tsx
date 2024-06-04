import MySwiper from "@/components/swiper/card-swiper";
import { mockDataForFace } from "./mock-data";
import { useDispatch } from "react-redux";
import { processStarted } from "@/redux/slice/training.slice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function RandomFace() {
  const dispatch = useDispatch()
  dispatch(processStarted({
    randomFaces: mockDataForFace  
  }))
  const navigate = useNavigate()
  const handleFinish = ()=>{
      navigate('/dashboard/training/face/user-input')
  }
  return (
    <div className="my-5 flex justify-center items-center h-screen flex-col gap-10">
        <MySwiper cardItems={mockDataForFace}/>
        <Button variant='outline' onClick={handleFinish}>Finish</Button>
    </div>
  )
}
