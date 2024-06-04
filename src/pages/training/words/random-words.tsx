import { useEffect, useState } from 'react';
import data from '../../../../data/db.json';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useDispatch } from 'react-redux';
import { processStarted } from '@/redux/slice/training.slice';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MnemonicWord {
    dictionary: string;
    transcription: string;
    translation: string;
    association: string;
    dependentCondition: string;
}

// Capitalize funksiyasi
function capitalize(word: string): string {
    if (!word) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function RandomWords() {
    const words: { [key: string]: MnemonicWord } = data['mnemonic-words'];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [randomKeys, setRandomKeys] = useState<string[]>([]);

    // Tasodifiy 30 ta kalit tanlash
    const getRandomKeys = (arr: string[], num: number): string[] => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    };

    useEffect(() => {
        const keys = getRandomKeys(Object.keys(words), 30);
        setRandomKeys(keys);
        const wordList = keys.map(key => words[key]);
        dispatch(processStarted({
            randomWords: wordList
        }));
    }, [dispatch, words]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowDown') {
                setCurrentWordIndex(prevIndex => (prevIndex + 1) % randomKeys.length);
            }
            if (event.key === 'ArrowUp') {
                setCurrentWordIndex(prevIndex => (prevIndex - 1 + randomKeys.length) % randomKeys.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [randomKeys]);

    const handleFinish = () => {
        navigate('/dashboard/training/words/user-input');
    }

    const currentWord = randomKeys.length > 0 ? words[randomKeys[currentWordIndex]] : null;

    return (
        <div>
            <Table>
                <TableCaption>
                    <Button onClick={handleFinish}>Finish</Button>
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-4">Tr</TableHead>
                        <TableHead className="">So'z</TableHead>
                        <TableHead className="">Tarjima</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {randomKeys.map((key, index) => {
                        const word = words[key];
                        return (
                            <TableRow key={key}>
                                <TableCell className="">{index + 1}</TableCell>
                                <TableCell className="w-1/2">{capitalize(word.translation)}</TableCell>
                                <TableCell className="w-1/2">{word.dictionary}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {currentWord && (
                <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 w-full lg:w-[60%] backdrop-blur-md rounded-2xl">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="w-[4%] text-center backdrop-blur-md bg-green-400/20 rounded-l-2xl text-2xl">{currentWordIndex + 1}</TableCell>
                                <TableCell className="w-1/2 text-center backdrop-blur-md bg-green-400/10 text-2xl">{capitalize(currentWord.translation)}</TableCell>
                                <TableCell className="w-1/2 text-center backdrop-blur-md bg-sky-500/10 rounded-r-2xl text-2xl">{currentWord.dictionary}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
