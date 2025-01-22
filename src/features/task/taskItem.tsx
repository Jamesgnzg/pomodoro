import { Task } from "@/interface/task";
import { FC, ReactElement, memo } from "react";
import { priority } from "@/enums/priority";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

interface TaskItemProps {
  task: Task;
  selectTask: (selectedTask: Task) => void;
  deleteTask: (taskId: string) => void;
  openTaskDialog: (status: boolean) => void;
}

interface TaskActionsProps {
  taskId: string;
  deleteTask: (taskId: string) => void;
  openTaskDialog: (status: boolean) => void;
}

const TaskActions: FC<TaskActionsProps> = ({
  taskId,
  deleteTask,
  openTaskDialog,
}: TaskActionsProps): ReactElement => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="TaskAction"
          className="p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <EllipsisVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2 p-3 mt-2 rounded border bg-white">
        <Button variant="outline" onClick={() => openTaskDialog(true)}>
          Update
        </Button>
        <Button
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(taskId);
          }}
        >
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
};

const TaskItem: FC<TaskItemProps> = ({
  task,
  selectTask,
  deleteTask,
  openTaskDialog,
}: TaskItemProps): ReactElement => {
  const setTaskStyle = (): string => {
    let cardStyle =
      "mt-3 block max-w-sm p-6 border border-l-8 border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700";
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
      <div className={setTaskStyle()} onClick={() => selectTask(task)}>
        <div className="flex justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight truncate text-gray-900 dark:text-white">
            {task.name}
          </h5>
          <div className="flex gap-4">
            <p className="pt-2">{`${task.completedPomodoros} / ${task.pomodoros}`}</p>
            <TaskActions
              taskId={task.id}
              deleteTask={deleteTask}
              openTaskDialog={openTaskDialog}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TaskItem);
