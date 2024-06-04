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

export default function CheckWords() {
  const { userInputWords, randomWords } = useSelector((state: RootState) => state.training)
  const navigate = useNavigate()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleFinish = () => {
    navigate(-3)
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
            <TableHead className="">So'z</TableHead>
            <TableHead className="rounded-e-xl">Tarjima</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {randomWords.map((word, index) => {
            const isCorrect = word.dictionary.toLocaleLowerCase() === userInputWords[index].dictionary.toLocaleLowerCase();
            return (
              <TableRow key={word.association}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="w-1/2">{word.translation}</TableCell>
                <TableCell
                  className={`w-1/2 cursor-pointer transition-all duration-300 ease-linear transform ${isCorrect ? 'bg-green-400/70 backdrop-blur-sm' : 'bg-rose-500/70 backdrop-blur-sm hover:bg-amber-400/70 hover:scale-105'} ${userInputWords[index].dictionary === '' && 'opacity-50 cursor-not-allowed'}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {userInputWords[index].dictionary === '' ? word.dictionary : (hoveredIndex === index ? word.dictionary : userInputWords[index].dictionary)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  )
}
