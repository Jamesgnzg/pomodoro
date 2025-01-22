import { useTasks } from "@/context/Task-context";
import { ReactElement } from "react";

import TaskItem from "./taskItem";

const TaskList: React.FC = (): ReactElement => {
  const { tasks, selectTask, deleteTask, updateTask } = useTasks();
  return (
    <>
      <div className="flex flex-col scroll-smooth border border-1 rounded-lg p-5 min-h-screen">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            deleteTask={deleteTask}
            selectTask={selectTask}
            openTaskDialog={updateTask}
          />
        ))}
      </div>
    </>
  );
};

export default TaskList;
