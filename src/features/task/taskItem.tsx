import { Task } from "@/interface/task";
import { FC, ReactElement, memo } from "react";
import { priority } from "@/enums/priority";
import { Button } from "@/components/ui/button";

interface TaskItemProps {
  task: Task;
  selectTask: (selectedTask: Task) => void;
  openTaskDialog: (status: boolean) => void;
}

const TaskItem: FC<TaskItemProps> = ({
  task,
  selectTask,
  openTaskDialog,
}: TaskItemProps): ReactElement => {
  const setTaskStyle = (): string => {
    let cardStyle =
      "block max-w-sm p-6 border border-l-8 border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";
    switch (task.priority) {
      case priority.LOW:
        cardStyle = `${cardStyle} border-l-green-200`;
        break;
      case priority.MEDIUM:
        cardStyle = `${cardStyle} border-l-yellow-200`;
        break;
      case priority.HIGH:
        cardStyle = `${cardStyle} border-l-red-200`;
        break;
      default:
        cardStyle = `${cardStyle} border-l-green-200`;
        break;
    }

    return cardStyle;
  };

  return (
    <>
      <div className="mt-3">
        <a href="#" className={setTaskStyle()} onClick={() => selectTask(task)}>
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight truncate text-gray-900 dark:text-white">
              {task.name}
            </h5>
            <p>{`0 / ${task.pomodoros}`}</p>
            <Button onClick={() => openTaskDialog(true)}>Update</Button>
          </div>
        </a>
      </div>
    </>
  );
};

export default memo(TaskItem);
