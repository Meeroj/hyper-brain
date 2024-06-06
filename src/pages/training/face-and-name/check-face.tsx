import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Ban, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
export default function CheckFace() {
    const {randomFaces, userInputNames} = useSelector((state:RootState) => state.training)
    const navigate = useNavigate()
    const handleBack = ()=>{
      navigate(-1)
    }
  return (
    <div className='flex flex-col items-center justify-betweenr gap-5'>
    <div className='grid sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3'>
        {randomFaces.map((item, index)=>{
            const isEqualize = item.name.toLowerCase() !== userInputNames[index].userInputName.toLowerCase()
            return (
                <Card className="rounded-xl border border-amber-400" key={item.image}>
                    <CardHeader className="p-0">
                        <img src={item.image} alt={item.image} className="w-full h-auto rounded-t-xl" />
                    </CardHeader>
                    <CardContent className="p-4 flex gap-2 justify-center min-h-20">
                        <CardTitle className={`text-sm sm:text-md xl:text-xl text-center w-full flex grow items-center justify-around ${isEqualize ? "bg-red-500":"bg-green-500"}`}>{userInputNames[index].userInputName }{+ isEqualize ?<Ban/>: <Check/>}</CardTitle>
                       {isEqualize &&
                         <CardTitle className="text-sm sm:text-md xl:text-xl text-center w-full">{item.name}</CardTitle>
                       }
                    </CardContent>
                </Card>
            )
        })}
    </div>
        <Button onClick={handleBack}>Go Back</Button>
    </div>
  )
}
