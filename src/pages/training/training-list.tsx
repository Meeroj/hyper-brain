import NumberImage from '@/assets/number.jpg'
import WordsImage from '@/assets/words.png'
import CardsImage from '@/assets/cards.jpg'
import FaceImage from '@/assets/face.jpg' 
import HistoryDateImage from '@/assets/history-date.jpeg'
import FlippyBrain from "@/components/flippy-brain/flippy-brain";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { processPending } from '@/redux/slice/training.slice';

export const TrainingList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [time, setTime] = useState('');
  const [systemValue, setSystemValue] = useState('');

  const handleStartNumber = () => {
    dispatch(processPending({
      systemTime: time && time,
      system: systemValue ? systemValue : 2
    }));
    navigate('/dashboard/training/number/read');
  };

  const handleStarWords = ()=>{
    dispatch(processPending({
      systemTime: time && time,
      system: systemValue ? systemValue : 2
    }));
    navigate('/dashboard/training/words/read');
  }
  const handleStarFace = ()=>{
    dispatch(processPending({
      systemTime: time && time,
      system: systemValue ? systemValue : 2
    }));
    navigate('/dashboard/training/face/read');
  }
  const handleStarCard = ()=>{
    dispatch(processPending({
      systemTime: time && time,
      system: systemValue ? systemValue : 2
    }));
    navigate('/dashboard/training/card/read');
  }

  const handleStartHistoryDate = ()=>{
    dispatch(processPending({
      systemTime: time && time,
      system: systemValue ? systemValue : 2
    }));
    navigate('/dashboard/training/date/read');
  }

  return (
    <div className="p-4 mx-auto overflow-auto h-screen">
      <Outlet/>
      <FlippyBrain/>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-[hsl(var(--sidebar-bg))]/30 text-[hsl(var(--sidebar-foreground))] backdrop-blur-lg">
          <CardHeader>
            <img src={NumberImage} alt="" className="h-60 w-full" />
          </CardHeader>
          <CardContent>
            <CardTitle className="my-2">Speed Number</CardTitle>
            <CardDescription className="my-2 min-h-20">Tezkor raqamlarni yodalsh orqali o'z xotirangizni 10x yaxshilang hamda istalgan ma'lumotni tezroq o'rganing</CardDescription>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex gap-2">
                  <div className="flex flex-col space-y-1.5 grow">
                    <Label htmlFor={'speedNumberTime'}>Time (daqiqa)</Label>
                    <Select onValueChange={setTime}>
                      <SelectTrigger id={'speedNumberTime'}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value='1'>1</SelectItem>
                        <SelectItem value='5'>5</SelectItem>
                        <SelectItem value='15'>15</SelectItem>
                        <SelectItem value='120'>120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex flex-col space-y-1.5 grow'>
                  <Label htmlFor='speedNumberSystem'>System</Label>
                    <Select onValueChange={setSystemValue}>
                      <SelectTrigger id={'speedNumberSystem'}>
                        <SelectValue placeholder="Double" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value='1'>Single</SelectItem>
                        <SelectItem value='2'>Double</SelectItem>
                        <SelectItem value='3'>Triple</SelectItem>
                        <SelectItem value='4'>Quad</SelectItem>
                        <SelectItem value='5'>Penta</SelectItem>
                        <SelectItem value='6'>Hexa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleStartNumber}>Start</Button>
          </CardFooter>
        </Card>

        <Card className="bg-[hsl(var(--sidebar-bg))]/30 text-[hsl(var(--sidebar-foreground))] backdrop-blur-lg">
          <CardHeader>
            <img src={WordsImage} alt="" className="h-60 w-full" />
          </CardHeader>
          <CardContent>
            <CardTitle className="my-2">Xorijiy so'zlar</CardTitle>
            <CardDescription className="my-2 min-h-20">Xorijiy so'zlarni kuniga 300+ yod olin va hammani hayratda qoldiring</CardDescription>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex gap-2">
                  <div className="flex flex-col space-y-1.5 grow">
                    <Label htmlFor={'speedNumberTime'}>Time (daqiqa)</Label>
                    <Select onValueChange={setTime}>
                      <SelectTrigger id={'speedNumberTime'}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value='1'>1</SelectItem>
                        <SelectItem value='5'>5</SelectItem>
                        <SelectItem value='15'>15</SelectItem>
                        <SelectItem value='120'>120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleStarWords}>Start</Button>
          </CardFooter>
        </Card>

        <Card className="bg-[hsl(var(--sidebar-bg))]/30 text-[hsl(var(--sidebar-foreground))] backdrop-blur-lg">
          <CardHeader>
            <img src={FaceImage} alt="" className="h-60 w-full" />
          </CardHeader>
          <CardContent>
            <CardTitle className="my-2">Yuz va ismlar</CardTitle>
            <CardDescription className="my-2 min-h-20">Yuz va ismlarni eslab qoling hamda yod oling va hammani hayratda qoldiring</CardDescription>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex gap-2">
                  <div className="flex flex-col space-y-1.5 grow">
                    <Label htmlFor={'speedNumberTime'}>Time (daqiqa)</Label>
                    <Select onValueChange={setTime}>
                      <SelectTrigger id={'speedNumberTime'}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value='1'>1</SelectItem>
                        <SelectItem value='5'>5</SelectItem>
                        <SelectItem value='15'>15</SelectItem>
                        <SelectItem value='120'>120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleStarFace}>Start</Button>
          </CardFooter>
        </Card>

        <Card className="bg-[hsl(var(--sidebar-bg))]/30 text-[hsl(var(--sidebar-foreground))] backdrop-blur-lg">
          <CardHeader>
            <img src={CardsImage} alt="" className="h-60 w-full" />
          </CardHeader>
          <CardContent>
            <CardTitle className="my-2">O'yin Qartalari</CardTitle>
            <CardDescription className="my-2 min-h-20">O'yin qartalarini yod oling va hammani hayratda qoldiring</CardDescription>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex gap-2">
                  <div className="flex flex-col space-y-1.5 grow">
                    <Label htmlFor={'speedNumberTime'}>Time (daqiqa)</Label>
                    <Select onValueChange={setTime}>
                      <SelectTrigger id={'speedNumberTime'}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value='1'>1</SelectItem>
                        <SelectItem value='5'>5</SelectItem>
                        <SelectItem value='15'>15</SelectItem>
                        <SelectItem value='120'>120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleStarCard}>Start</Button>
          </CardFooter>
        </Card>

        <Card className="bg-[hsl(var(--sidebar-bg))]/30 text-[hsl(var(--sidebar-foreground))] backdrop-blur-lg">
          <CardHeader>
            <img src={HistoryDateImage} alt="" className="h-60 w-full" />
          </CardHeader>
          <CardContent>
            <CardTitle className="my-2">Tarixiy sanalar</CardTitle>
            <CardDescription className="my-2 min-h-20">Tarixiy sanalarni 5 daqiqada 120+ yod oling va hammani hayratda qoldiring</CardDescription>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex gap-2">
                  <div className="flex flex-col space-y-1.5 grow">
                    <Label htmlFor={'speedNumberTime'}>Time (daqiqa)</Label>
                    <Select onValueChange={setTime}>
                      <SelectTrigger id={'speedNumberTime'}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value='1'>1</SelectItem>
                        <SelectItem value='5'>5</SelectItem>
                        <SelectItem value='15'>15</SelectItem>
                        <SelectItem value='120'>120</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleStartHistoryDate}>Start</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
