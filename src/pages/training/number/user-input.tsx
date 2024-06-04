import { Input } from '@/components/ui/input';
import { processFinished } from '@/redux/slice/training.slice';
import { RootState } from '@/redux/store';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SpeedNumberLook: React.FC = () => {
  const dispatch = useDispatch();
  const { randomNumbers } = useSelector((state: RootState) => state.training);
  const navigate = useNavigate();

  const handleChange = useCallback((index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = document.getElementById(`input-${index}`) as HTMLInputElement;
    if (e.target.value.length >= 1 && index < randomNumbers.length - 1) {
      inputElement.classList.add('border-amber-400');
      const nextInput = document.getElementById(`input-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    } else if (e.target.value.length === 0 && index > 0) {
      inputElement.classList.remove('border-amber-400');
      const prevInput = document.getElementById(`input-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  }, [randomNumbers.length]);

  const getNumberArray = useCallback((): string[] => {
    return Array.from({ length: randomNumbers.length }, (_, index) =>
      (document.getElementById(`input-${index}`) as HTMLInputElement).value
    );
  }, [randomNumbers.length]);

  const handleSubmit = useCallback(() => {
    dispatch(processFinished({
      userInputNumbers: getNumberArray(),
      userInputTime: 15
    }));
    console.log(getNumberArray())
    navigate('/dashboard/training/number/check');

  }, [dispatch, getNumberArray, navigate]);

  return (
    <div className="flex items-center flex-col pt-3">
      <h2 className="text-3xl">Speed Number</h2>
        <div className="flex flex-wrap 2xl:grid grid-cols-40 grid-rows-15 gap-1 w-[95%] font-[oswald]  bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-foreground))] my-10 p-5  h-full rounded-2xl">
          {randomNumbers.map((_, index) => (
            <Input
              key={index}
              id={`input-${index}`}
              type="number"
              className="max-w-8 remove-arrow focus:outline-none focus:border-amber-400 text-center border"
              onChange={(e) => handleChange(index, e)}
            />
          ))}
        </div>
      <button onClick={handleSubmit} className="border border-amber-400 text-amber-600 px-3 py-1 rounded-md hover:text-white hover:bg-amber-500 ease-in duration-100">Submit</button>
    </div>
  );
};

export default SpeedNumberLook;
