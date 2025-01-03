import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import { INDEX } from "./routes/Paths";
import { publicRoutes } from "./routes/Routes";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
          <Route key="/*" path="/*" element={<Navigate to={INDEX} />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
