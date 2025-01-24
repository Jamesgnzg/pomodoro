import { useTasks } from "@/context/Task-context";
import { ReactElement } from "react";

import TaskItem from "./taskItem";

const TaskList: React.FC = (): ReactElement => {
  const { tasks } = useTasks();
  return (
    <>
      <div className="flex flex-col scroll-smooth rounded-lg min-h-screen">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </div>
    </>
  );
};

export default TaskList;
