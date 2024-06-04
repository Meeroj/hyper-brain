import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardHeader } from '@/components/ui/card';

const DraggableCard: React.FC<{ item: any }> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card
      ref={drag}
      className={`rounded-xl border border-amber-400 ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      key={item.name}
    >
      <CardHeader className="p-0 overflow-hidden">
        <img src={item.imageUrl} alt={item.name} className="w-full h-auto rounded-t-xl" />
      </CardHeader>
    </Card>
  );
};

export default DraggableCard;
