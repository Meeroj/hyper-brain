import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { processFinished } from "@/redux/slice/training.slice";
import Clock from '@/components/clock/clcok';

export default function UserInputDate() {
    const { randomDates, systemTime } = useSelector((state: RootState) => state.training);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});

    const handleInputChange = (index: number, value: string) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [index]: value
        }));
    };

    const handleSubmit = () => {
        const finishedWords = randomDates.map((word, index) => ({
            translation: word.id,
            date: inputValues[index] || ""
        }));
        
        dispatch(processFinished({
            userInputDates: finishedWords
        }));
        navigate('/dashboard/training/date/check', { replace: true });
    };

    return (
        <div>
            <Clock route={'/dashboard/training/date/checkt'} time={systemTime}/>
            <Table>
                <TableCaption>
                    <Button onClick={handleSubmit}>Finish</Button>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-4">Tr</TableHead>
                        <TableHead className="">Sana</TableHead>
                        <TableHead className="">Hodisa</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {randomDates.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="">{index + 1}</TableCell>
                                <TableCell className="w-[140px]">
                                    <Input 
                                        type='number'
                                        value={inputValues[index] || ""}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                    />
                                </TableCell>
                                <TableCell className="">{item.event}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
