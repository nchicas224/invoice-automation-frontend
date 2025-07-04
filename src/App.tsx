import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import { TopBar } from "./components/Topbar";
import PendingInvoices from "./pages/PendingInvoices";
import { Container } from "react-bootstrap";
import HelpSupport from "./pages/HelpAndSupport";


function App() {

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
