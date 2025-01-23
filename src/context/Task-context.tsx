import { Task } from "@/interface/task";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ITaskContextProps {
  children: ReactNode;
}

type TTaskContextType = {
  tasks: Task[];
  taskDialogOpen: boolean;
  selectedTask: Task | null;
  addTask: (newTask: Task) => void;
  selectTask: (task: Task) => void;
  openTaskDialog: () => void;
  closeTaskDialog: () => void;
  deleteTask: (taskId: string) => void;
  updateTaskItem: <T extends keyof Task>(
    id: string,
    field: T,
    value: any
  ) => void;
};

const TaskContext = createContext<TTaskContextType>(null!);

export const TaskContextProvider = ({ children }: ITaskContextProps) => {
  const [tasks, setTask] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [taskDialogOpen, setTaskDialog] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback(
    (newTask: Task) => {
      const newTaskList: Task[] = [...tasks, newTask];

      setTask(newTaskList);
    },
    [tasks]
  );

  const selectTask = useCallback(
    (task: Task) => {
      setSelectedTask(task);
    },
    [tasks]
  );

  const openTaskDialog = useCallback(() => {
    setTaskDialog(true);
  }, [taskDialogOpen]);

  const closeTaskDialog = useCallback(() => {
    setTaskDialog(false);
  }, [taskDialogOpen]);

  const deleteTask = useCallback(
    (taskId: string) => {
      const taskIndex = tasks.findIndex((task) => task.id == taskId);
      const updatedTasks = [...tasks];

      updatedTasks.splice(taskIndex, 1);

      setTask(updatedTasks);
      setSelectedTask(null);
    },
    [tasks]
  );

  const updateTaskItem = useCallback(
    <T extends keyof Task>(id: string, field: T, value: any): void => {
      setTask((currentTasks) => {
        return currentTasks.map((task) => {
          if (task.id == id) {
            task[field] = value;
          }

          return task;
        });
      });
    },
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskDialogOpen,
        selectedTask,
        addTask,
        selectTask,
        openTaskDialog,
        closeTaskDialog,
        deleteTask,
        updateTaskItem,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
