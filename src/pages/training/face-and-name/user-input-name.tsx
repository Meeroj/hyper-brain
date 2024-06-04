import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button } from '@/components/ui/button';
import { processFinished } from '@/redux/slice/training.slice';
import { useNavigate } from 'react-router-dom';

// Define types for cardItems
interface CardItem {
  image: string;
  name: string;
}

const UserInputName: React.FC = () => {
  const { randomFaces } = useSelector((state: RootState) => state.training);
  const [inputValues, setInputValues] = useState<{ [key: number]: { correctName: string, userInputName: string } }>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initialInputValues = randomFaces.reduce((acc, item, index) => {
      acc[index] = { correctName: item.name, userInputName: '' };
      return acc;
    }, {} as { [key: number]: { correctName: string, userInputName: string } });
    setInputValues(initialInputValues);
  }, [randomFaces]);

  const handleInputChange = (index: number, name: string, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [index]: {
        correctName: name,
        userInputName: value,
      }
    }));
  };

  const handleSubmit = () => {
    dispatch(processFinished({
      userInputNames: inputValues
    }));
    navigate('/dashboard/training/face/check');
  };

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col justify-center items-center gap-10 p-4">
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwipe w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 1,
            },
          }}
        >
          {randomFaces.map((item: CardItem, index: number) => (
            <SwiperSlide
              key={index}
              className="bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-foreground))] border border-amber-400 rounded-xl flex flex-col items-center"
            >
              <label htmlFor={`input-${index}`} className="w-full">
                <img src={item.image} alt={item.name} className="w-full rounded-t-xl" />
              </label>
              <Input
                className="m-auto my-2 w-[90%]"
                id={`input-${index}`}
                value={inputValues[index]?.userInputName || ''}
                onChange={(e) => handleInputChange(index, item.name, e.target.value)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default UserInputName;
