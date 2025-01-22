import { useTasks } from "@/context/Task-context";
import { FC, ReactElement } from "react";

const MainTask: FC = (): ReactElement => {
  const { selectedTask } = useTasks();

  return (
    <>
      <div className="p-6 bg-white">
        {selectedTask ? (
          <div>
            <div className="flex justify-between">
              <p className="text-5xl font-bold">{selectedTask?.name}</p>
              <p className="text-5xl font-bold">{`0 / ${selectedTask?.pomodoros}`}</p>
            </div>
            <br />
            <p className="text-3xl font-semibold">{selectedTask?.note}</p>
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
