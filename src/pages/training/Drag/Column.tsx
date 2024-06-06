import React from "react";
import { Droppable, Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import Task from "./Task";
import { ColumnType, TaskType } from "./data"; // Ensure this import path is correct based on your project structure

interface ColumnProps {
  tasks: TaskType[];
  column: ColumnType;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ tasks, column, index }) => {


  return (
    <Draggable  draggableId={column.id} index={index} >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`m-2 p-2 rounded-md border  w-[900px] ${
            snapshot.isDragging ? "bg-accent text-primary-foreground" : "bg-slate-900/40 text-[hsl(var(--sidebar-foreground))] "
          }`}
        >
          <h3 className="p-2">{column.title}</h3>

            <Droppable   droppableId={column.id} type="task" direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-2 flex flex-wrap min-h-[100px] transition-colors duration-200 ${
                  !snapshot.isDraggingOver ? "bg-palevioletred" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          </div>
      )}
    </Draggable>
  );
};

export default Column;
