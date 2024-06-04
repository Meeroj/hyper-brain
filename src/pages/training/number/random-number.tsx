import { useState, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processStarted, userReadFinishing } from '@/redux/slice/training.slice';
import { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';



const SpeedNumberLook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [numberBg, setNumberBg] = useState(0);
  const {system, randomNumbers, systemTime} = useSelector((state: RootState) => state.training);

  let count=0
    if(systemTime==5){
        count=600
    }else if(systemTime==15){
        count=1800
    }else if(systemTime==1){
      count=200
    }else if(systemTime == 120){
        count = 5000
    }else{
      count = 600
    }


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setNumberBg((prev) => (Number(prev) + Number(system)) % count);
      } else if (e.key === 'ArrowLeft') {
        setNumberBg((prev) => (prev - system + count) % count);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [count, system]);

  useEffect(() => {
    const newNumbers = [];
    for (let index = 0; index < count; index++) {
      newNumbers.push(Number((Math.random() * 9).toFixed()));
    }
    dispatch(processStarted({
      randomNumbers: newNumbers
    }));
  }, [dispatch, count]);

  const handleFinish = () => {
    dispatch(userReadFinishing(5))
    navigate('/dashboard/training/number/user-input')
  };

  const handleNext = () => {
    setNumberBg((prev) => (Number(prev) + Number(system)) % count);
  };
  return (
    <div>
      <div className='flex items-center flex-col pt-3'>
        <h2 className='text-3xl font-[oswald]'>Speed Number {systemTime}minut</h2>
          <div className="flex flex-wrap xl:grid grid-cols-40 grid-rows-15 w-full md:w-[90%] font-[oswald]  bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-foreground))] my-20 p-2 lg:p-10 h-full rounded-2xl" onClick={handleNext}>
            {randomNumbers.map((el: ReactNode, index: number) => (
              <p key={index} className={`text-center max-w-9 min-w-7 mt-2 p-1 ${index === numberBg || ((index - system < numberBg) && (numberBg < index)) ? 'bg-amber-400 dark:bg-amber-800' : ''}`}>
                {el}
              </p>
            ))}
          </div>
        <button onClick={handleFinish} className='border border-amber-400 text-amber-600 px-3 py-1 rounded-md hover:text-white hover:bg-amber-500 ease-in duration-100'>Finish</button>
      </div>
    </div>
  );
};

export default SpeedNumberLook;
