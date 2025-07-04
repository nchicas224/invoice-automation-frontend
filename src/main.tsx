import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";
import PageSetter from "./hooks/userPageTitle.tsx";
import { UserContext, UserProfile } from "./hooks/UserContext.tsx";

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
