import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableCard from './DraggableCard';

const DroppableContainer: React.FC<{ items: any[]; onDrop: (item: any) => void }> = ({ items, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 items-start gap-3 p-4 border-2 ${isOver ? 'border-green-400' : 'border-dashed border-gray-400'}`}>
      {items.map((item, index) => (
        <DraggableCard item={item} key={index} />
      ))}
    </div>
  );
};

export default DroppableContainer;
