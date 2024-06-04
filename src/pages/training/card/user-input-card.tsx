import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DroppableContainer from './DroppableContainer';
import { cardItems } from './mock-card-data';

const UserInputCard: React.FC = () => {
  const [firstDivCards, setFirstDivCards] = useState(cardItems);
  const [secondDivCards, setSecondDivCards] = useState([]);

  const handleDrop = (item: any, target: string) => {
    if (target === 'first') {
      setSecondDivCards((prev) => prev.filter((card) => card.name !== item.name));
      setFirstDivCards((prev) => [...prev, item]);
    } else {
      setFirstDivCards((prev) => prev.filter((card) => card.name !== item.name));
      setSecondDivCards((prev) => [...prev, item]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-2 gap-4">
        <DroppableContainer
          items={firstDivCards}
          onDrop={(item) => handleDrop(item, 'first')}
        />
        <DroppableContainer
          items={secondDivCards}
          onDrop={(item) => handleDrop(item, 'second')}
        />
      </div>
    </DndProvider>
  );
};

export default UserInputCard;
