import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

interface UserProfile { userName: string; }

async function loadUsername(){
  const resp = await fetch("/api/getUser", { credentials: "include"} );
  if (!resp.ok) throw new Error("Failed to load user profile.");
  const { userName } = (await resp.json()) as UserProfile;
  return userName;
}

function loadCurrentPage(){
  const location = useLocation().pathname;
  const regex = "/.*\/([A-Za-z]+)"
  try {
    const page = location.match(regex);
    return page;
  } catch (e) {
    console.warn("Failed to load current page.");
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  //const name = await loadUsername();
  const page = loadCurrentPage();
  try {
    document.title = `Invoices - ${page}`;
    //document.getElementById("greeting")!.textContent = `Hello, ${name}`!;
  } catch (e) {
    console.log("Error: ${e}")
  } 
});
