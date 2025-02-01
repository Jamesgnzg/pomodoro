import { Task } from "@/interface/task";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { timeSettings } from "../enums/time-settings";

const { POMODORO, SHORT_BREAK, LONG_BREAK } = timeSettings;
type TColorTheme =
  | typeof POMODORO.color
  | typeof SHORT_BREAK.color
  | typeof LONG_BREAK.color;

interface ITaskContextProps {
  children: ReactNode;
}

type TTaskContextType = {
  tasks: Task[];
  timerRunning: boolean;
  taskDialogOpen: boolean;
  selectedTask: Task | null;
  colorTheme: string;
  addTask: (newTask: Task) => void;
  setTimer: (timerStatus: boolean) => void;
  selectTask: (task: Task) => void;
  openTaskDialog: () => void;
  closeTaskDialog: () => void;
  deleteTask: (taskId: string) => void;
  updateTaskItem: <T extends keyof Task>(
    id: string,
    field: T,
    value: any
  ) => void;
  updateColorTheme: (colorTheme: TColorTheme) => void;
  setTextClass: () => string;
};

const TaskContext = createContext<TTaskContextType>(null!);

export const TaskContextProvider = ({ children }: ITaskContextProps) => {
  const [tasks, setTask] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [timerRunning, setTimer] = useState<boolean>(
    localStorage.getItem("timerRunning") == "true"
  );
  const [taskDialogOpen, setTaskDialog] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [colorTheme, setColorTheme] = useState<TColorTheme>(POMODORO.color);

  useEffect(() => {
    document.body.style.backgroundColor = colorTheme;
  }, [colorTheme]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("timerRunning", timerRunning.toString());
  }, [timerRunning]);

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

  const setTextClass = (): string => {
    let textColor: string = "";

    switch (colorTheme) {
      case POMODORO.color:
        textColor = "text-main";
        break;
      case SHORT_BREAK.color:
        textColor = "text-second";
        break;
      case LONG_BREAK.color:
        textColor = "text-third";
        break;
      default:
        textColor = "text-main";
        break;
    }

    return textColor;
  };

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

  const updateColorTheme = (color: TColorTheme) => {
    setColorTheme(color);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        timerRunning,
        taskDialogOpen,
        selectedTask,
        colorTheme,
        addTask,
        setTimer,
        selectTask,
        openTaskDialog,
        closeTaskDialog,
        deleteTask,
        updateTaskItem,
        updateColorTheme,
        setTextClass,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
