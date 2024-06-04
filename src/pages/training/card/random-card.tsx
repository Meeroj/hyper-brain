import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { cardItems } from './mock-card-data';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CardItem {
  imageUrl: string;
  name: string;
}

function shuffleArray(array: CardItem[]): CardItem[] {
  return array.sort(() => Math.random() - 0.5);
}

const randomCards = shuffleArray(cardItems);


const RandomCard: React.FC = () => {
    const navigate = useNavigate()
    const handleFinish = ()=>{
     navigate('/dashboard/training/card/user-input')
    }
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
          {randomCards.map((item, index) => (
            <SwiperSlide key={index} className='flex-col bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-foreground))] border border-amber-400 rounded-xl'>
              <img src={item.imageUrl} className="w-full rounded-t-xl" alt={item.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      <Button onClick={handleFinish}>Finish</Button>
      </div>
    </div>
  );
}

export default RandomCard;
