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

export default function InputWords() {
    const { randomWords } = useSelector((state: RootState) => state.training);
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
        const finishedWords = randomWords.map((word, index) => ({
            translation: word.dictionary,
            dictionary: inputValues[index] || ""
        }));
        
        dispatch(processFinished({
            userInputWords: finishedWords
        }));
        navigate('/dashboard/training/words/check');
    };

    return (
        <div>
            <Table>
                <TableCaption>
                    <Button onClick={handleSubmit}>Finish</Button>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-4">Tr</TableHead>
                        <TableHead className="">So'z</TableHead>
                        <TableHead className="">Tarjima</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {randomWords.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="">{index + 1}</TableCell>
                                <TableCell className="w-1/2">{item.translation}</TableCell>
                                <TableCell className="w-1/2">
                                    <Input 
                                        value={inputValues[index] || ""}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
