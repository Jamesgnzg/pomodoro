import { FC, ReactElement, ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTasks } from "@/context/Task-context";
import { Task } from "@/interface/task";

interface ITaskAlertProps {
  children: ReactNode;
  task: Task;
}

const TaskAlert: FC<ITaskAlertProps> = ({
  children,
  task,
}: ITaskAlertProps): ReactElement => {
  const { timerRunning, selectTask, selectedTask } = useTasks();
  const [open, setOpen] = useState<boolean>(false);

  const openAlert = (): void => {
    if (timerRunning && selectedTask) {
      setOpen(!open);
    } else {
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={openAlert}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will change your task?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => selectTask(task)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TaskAlert;
