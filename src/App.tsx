import { useState, useEffect } from "react";
import "./App.css";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import { TopBar } from "./components/Topbar";
import PendingInvoices from "./pages/PendingInvoices";
import { Container } from "react-bootstrap";
import HelpSupport from "./pages/HelpAndSupport";


function App() {

interface UserProfile { userName: string; }

const [userName, setUserName] = useState<string | null>(null);

async function loadUsername(){
  const resp = await fetch("/api/getUser", { credentials: "include"} );
  if (!resp.ok) throw new Error("Failed to load user profile.");
  const { userName } = (await resp.json()) as UserProfile;
  return userName;
}

const location = useLocation();

useEffect(() => {
  const match = /\/([^/+])$/.exec(location.pathname);
  const page = match ? match[1] : "Home";
  document.title = `Invoice App - ${page}`;
},[location.pathname]);

  return (
    <>
      {/* <div style={{ display: 'flex', minHeight: '100vh'}}> */}
      <TopBar />
      <Container fluid>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pendingInvoices" element={<PendingInvoices />} />
          <Route path="/helpSupport" element={<HelpSupport />} />
        </Routes>
      </Container>
      {/* </div> */}
    </>
  );
}

export default App;
