import React from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { TaskType } from "./data"; // Ensure this import path is correct based on your project structure

interface TaskProps {
  task: TaskType;
  index: number;
  className?: string; // Add this line to accept className as a prop
}

const Task: React.FC<TaskProps> = ({ task, index, className }) => {
  return (
    <Draggable draggableId={task.id} index={index} >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-2 m-2 rounded-md border inline w-[150px] ${snapshot.isDragging ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"} ${className}`} // Add className here
        >
          <img src={task.imageUrl} alt={task.id} className="w-full h-auto" />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
