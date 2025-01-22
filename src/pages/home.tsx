import Counter from "@/features/counter/counter";
import { ReactElement } from "react";
import MainTask from "../features/task/maintTask";
import TaskList from "../features/task/taskList";
import TaskDialog from "@/features/task/task-dialog";
import { TaskContextProvider } from "@/context/Task-context";

const Home: React.FC = (): ReactElement => {
  return (
    <>
      <TaskContextProvider>
        <div className="max-w-full flex flex-col justify-between p-5">
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
      </TaskContextProvider>
    </>
  );
};

export default Home;
