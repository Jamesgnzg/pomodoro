import { ReactElement } from "react";
import { Task } from "@/interface/task";
import TaskItem from "./taskItem";

interface TaskListProps {
  tasks: Task[];
  selectTask: (selectedTask: Task) => void;
  deleteTask: (taskId: string) => void;
  openTaskDialog: (status: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  selectTask,
  deleteTask,
  openTaskDialog,
}): ReactElement => {
  return (
    <>
      <div className="flex flex-col scroll-smooth border border-1 rounded-lg p-5 min-h-screen">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            deleteTask={deleteTask}
            selectTask={selectTask}
            openTaskDialog={openTaskDialog}
          />
        ))}
      </div>
    </>
  );
};

export default TaskList;
