import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppProviders from "./AppProviders";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);
