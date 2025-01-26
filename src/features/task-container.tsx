import { FC, ReactElement } from "react";
import { useTasks } from "@/context/Task-context";
import { timeSettings } from "@/enums/time-settings";
import Counter from "./counter/counter";
import MainTask from "./task/maintTask";
import TaskDialog from "./task/task-dialog";
import TaskList from "./task/taskList";

const TaskContainer: FC = (): ReactElement => {
  const { colorTheme } = useTasks();
  const { POMODORO, SHORT_BREAK, LONG_BREAK } = timeSettings;

  const setBgColor = (): string => {
    let bgColor: string = "";

    switch (colorTheme) {
      case POMODORO.color:
        bgColor = "bg-main";
        break;
      case SHORT_BREAK.color:
        bgColor = "bg-second";
        break;
      case LONG_BREAK.color:
        bgColor = "bg-third";
        break;
      default:
        bgColor = "bg-main";
        break;
    }

    return bgColor;
  };

  return (
    <div
      className={`max-w-full flex flex-col justify-between p-5 transition-colors duration-500 ${setBgColor()}`}
    >
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="basis-[75%] gap-y-5">
          <Counter />
          <MainTask />
        </div>
        <div className="basis-[25%]">
          <div className="grid gap-y-5">
            <TaskDialog />
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskContainer;
