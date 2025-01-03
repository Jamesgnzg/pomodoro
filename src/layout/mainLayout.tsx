import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = (): ReactElement => {
  return (
    <>
      <div className="scroll-smooth">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
