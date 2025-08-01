import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import PageSetter from "./hooks/userPageTitle.tsx";
import { UserProfile } from "./hooks/UserContext.tsx";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PageSetter>
        <UserProfile>
          <App />
        </UserProfile>
      </PageSetter>
    </BrowserRouter>
  </StrictMode>
);
