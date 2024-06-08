import { RootState } from "@/redux/store"
import { useSelector } from "react-redux"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import FlippyBrain from "@/components/flippy-brain/flippy-brain";
import { useState } from 'react';

export default function CheckDate() {
  const { userInputDates, randomDates } = useSelector((state: RootState) => state.training)
  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleFinish = () => {
    navigate(-1)
  }

  return (
    <div>
      <FlippyBrain />
      <Table className="backdrop-blur-2xl rounded-xl">
        <TableCaption>
          <Button onClick={handleFinish}>Go Back</Button>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-4 rounded-s-xl">Tr</TableHead>
            <TableHead className="">Yil</TableHead>
            <TableHead className="rounded-e-xl">Hodisa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {randomDates.map((history, index) => {
            const isCorrect = history.date === userInputDates[index].date
            return (
              <TableRow key={history.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  className={` cursor-pointer transition-all duration-300 ease-linear transform ${isCorrect ? 'bg-green-400/70 backdrop-blur-sm' : 'bg-rose-500/70 backdrop-blur-sm hover:bg-amber-400/70 hover:scale-105'} ${userInputDates[index].date === '' && 'opacity-50 cursor-not-allowed'}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {userInputDates[index].date === '' ? history.date : (hoveredIndex === index ? history.date : userInputDates[index].date)}
                </TableCell>
                <TableCell>{history.event}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}
