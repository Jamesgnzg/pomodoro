import { ReactElement } from "react";
import { Task } from "@/interface/task";
import TaskItem from "./taskItem";

interface TaskListProps {
  tasks: Task[];
  selectTask: (selectedTask: Task) => void;
  openTaskDialog: (status: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectTask,
  openTaskDialog,
}): ReactElement => {
  return (
    <>
      <div className="flex flex-col scroll-smooth border border-1 rounded-lg p-5 min-h-80">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            selectTask={selectTask}
            openTaskDialog={openTaskDialog}
          />
        ))}
      </div>
    </>
  );
};

export default TaskList;
