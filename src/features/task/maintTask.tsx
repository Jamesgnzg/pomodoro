import { Task } from "@/interface/task";
import { FC, ReactElement } from "react";

interface MainTaskProps {
  mainTask: Task | null;
}
const MainTask: FC<MainTaskProps> = ({ mainTask }): ReactElement => {
  return (
    <>
      <div className="p-6 bg-white">
        {mainTask ? (
          <div>
            <div className="flex justify-between">
              <p className="text-5xl font-bold">{mainTask?.name}</p>
              <p className="text-5xl font-bold">{`0 / ${mainTask?.pomodoros}`}</p>
            </div>
            <br />
            <p className="text-3xl font-semibold">{mainTask?.note}</p>
          </div>
        ) : (
          <div className="text-center">
            Start adding your task and be productive!
          </div>
        )}
      </div>
    </>
  );
};

export default MainTask;
