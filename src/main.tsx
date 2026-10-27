import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MembersProvider } from "./context/MembersContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MembersProvider>
        <App />
      </MembersProvider>
    </BrowserRouter>
  </StrictMode>,
);
