import { Task } from "@/interface/task";
import { FC, ReactElement, memo } from "react";
import { priority } from "@/enums/priority";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@radix-ui/react-popover";
import { useTasks } from "@/context/Task-context";
import TaskAlert from "./task-alert";

interface TaskItemProps {
  task: Task;
}

interface TaskActionsProps {
  taskId: string;
}

const TaskActions: FC<TaskActionsProps> = ({
  taskId,
}: TaskActionsProps): ReactElement => {
  const { deleteTask, openTaskDialog } = useTasks();
  const menuItemStyling =
    "flex gap-2 py-2 px-3 cursor-pointer hover:bg-gray-100";

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
      <Portal>
        <PopoverContent
          className="flex flex-col mt-2 rounded border bg-white"
          sideOffset={5}
        >
          <div
            className={menuItemStyling}
            onClick={(e) => {
              e.stopPropagation();
              openTaskDialog();
            }}
          >
            <Pencil size={15} className="mt-1" />
            Update
          </div>
          <div
            className={menuItemStyling}
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(taskId);
            }}
          >
            <Trash size={15} className="mt-[3.2px]" />
            Delete
          </div>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

const TaskItem: FC<TaskItemProps> = ({ task }: TaskItemProps): ReactElement => {
  const { selectTask, timerRunning } = useTasks();
  const setTaskStyle = (): string => {
    let cardStyle =
      "mt-3 block max-w-sm p-6 border border-l-8 bg-white rounded-md shadow cursor-pointer transition delay-150 duration-500 ease-in-outbg-green-300 transform hover:-translate-y-1 hover:scale-110 ";
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

  const setTask = () => {
    if (!timerRunning) {
      selectTask(task);
    }
  };

  return (
    <>
      <TaskAlert task={task}>
        <div className={setTaskStyle()} onClick={() => setTask()}>
          <div className="flex justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight truncate text-gray-900 dark:text-white">
              {task.name}
            </h5>
            <div className="flex gap-4">
              <p className="pt-2">{`${task.completedPomodoros} / ${task.pomodoros}`}</p>
              <TaskActions taskId={task.id} />
            </div>
          </div>
        </div>
      </TaskAlert>
    </>
  );
};

export default memo(TaskItem);
