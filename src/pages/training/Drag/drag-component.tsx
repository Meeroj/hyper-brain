import { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
// import "reset-css";
import initialData, { ColumnType, TaskType } from "./data";
import Column from "./Column";

interface ContainerProps {
  isDraggingOver: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  background-color: ${props => (props.isDraggingOver ? "#639ee2" : "inherit")};
`;

interface StarterType {
  tasks: { [key: string]: TaskType };
  columns: { [key: string]: ColumnType };
  columnOrder: string[];
}

export default function DragComponent() {
  const [starter, setStarter] = useState<StarterType>(initialData);


  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = starter.columns[source.droppableId];
    const secondCol = starter.columns[destination.droppableId];

    if (type === "column") {
      const newOrder = [...starter.columnOrder];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);

      setStarter({
        ...starter,
        columnOrder: newOrder,
      });
      return;
    }

    if (start === secondCol) {
      const column = starter.columns[source.droppableId];
      const taskIds = [...column.taskIds];
      taskIds.splice(source.index, 1);
      taskIds.splice(destination.index, 0, draggableId);


      const newColumn = {
        ...column,
        taskIds,
      };
      setStarter({
        ...starter,
        columns: {
          ...starter.columns,
          [column.id]: newColumn,
        },
      });
      return;
    }

    const startTaskIds = [...start.taskIds];
    const secondColTaskIds = [...secondCol.taskIds];

    startTaskIds.splice(source.index, 1);
    secondColTaskIds.push(draggableId)

    const newStartColumn = {
      ...start,
      taskIds: startTaskIds,
    };
    const newEndColumn = {
      ...secondCol,
      taskIds: secondColTaskIds, // 
    };

    console.log({draggableId})

    setStarter({
      ...starter,
      columns: {
        ...starter.columns,
        [start.id]: newStartColumn,
        [secondCol.id]: newEndColumn,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-column" type="column" direction="horizontal">
        {(provided, snapshot) => (
          <Container
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {starter.columnOrder.map((columnId, index) => {
              const column = starter.columns[columnId];
              const tasks = column.taskIds.map(taskId => starter.tasks[taskId]);

              return (
                <Column
                  index={index}
                  key={column.id}
                  column={column}
                  tasks={tasks}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}