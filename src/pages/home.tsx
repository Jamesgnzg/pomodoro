import Counter from "@/features/counter/counter";
import { ReactElement, useState, useCallback, useEffect } from "react";
import MainTask from "../features/task/maintTask";
import TaskList from "../features/task/taskList";
import { Task } from "@/interface/task";
import TaskDialog from "@/features/task/task-dialog";

const Home: React.FC = (): ReactElement => {
  const [tasks, setTask] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [taskDialogOpen, openTaskDialog] = useState<boolean>(false);
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

  const updateTask = useCallback(
    (dialogStatus: boolean) => {
      openTaskDialog(dialogStatus);
    },
    [taskDialogOpen]
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      const taskIndex = tasks.findIndex((task) => (task.id = taskId));
      const updatedTasks = [...tasks];

      updatedTasks.splice(taskIndex, 1);

      setTask(updatedTasks);
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
    <>
      <div className="max-w-full flex flex-col justify-between p-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="basis-[75%] gap-y-5">
            <Counter />
            <MainTask mainTask={selectedTask} />
          </div>
          <div className="basis-[25%]">
            <div className="grid gap-y-5">
              <TaskDialog
                dialogOpen={taskDialogOpen}
                addTask={addTask}
                updateTaskItem={updateTaskItem}
              />
              <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                selectTask={setSelectedTask}
                openTaskDialog={updateTask}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
