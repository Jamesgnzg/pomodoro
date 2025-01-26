import { ReactElement } from "react";
import { TaskContextProvider } from "@/context/Task-context";
import TaskContainer from "@/features/task-container";

const Home: React.FC = (): ReactElement => {
  return (
    <>
      <TaskContextProvider>
        <TaskContainer />
      </TaskContextProvider>
    </>
  );
};

export default Home;
