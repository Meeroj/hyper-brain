import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import { FC } from 'react';

// cardItems uchun tiplarni aniqlash
interface CardItem {
  image: string;
  name: string;
}

interface MySwiperProps {
  cardItems: CardItem[];
}

const MySwiper: FC<MySwiperProps> = ({ cardItems }) => {
  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col justify-center items-center gap-10 p-4">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwipe w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-x" // max-w-lg eng katta kenglikni belgilaydi
        breakpoints={{
          // Responsiv breakpoints
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
        {cardItems.map((item, index) => (
          <SwiperSlide key={index} className='flex-col bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-foreground))] border border-amber-400 rounded-xl'>
            <img src={item.image} alt={item.name} className="w-full rounded-t-xl" />
            <h1 className='my-3 text-3xl mx-3'>{item.name}</h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default MySwiper;
