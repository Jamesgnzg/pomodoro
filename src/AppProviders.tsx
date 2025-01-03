import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const AppProviders: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
