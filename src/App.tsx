import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
//import Invoices from "./pages/Invoices";
import HelpSupport from "./pages/SupportPage";
import InvoicePage from "./pages/InvoicePage";
import { useEffect, useState } from "react";
import LoadSpinner from "./components/LoadingSpinner";
import { WorkspaceLayout } from "./layouts/WorkspaceLayout";
import { InvoiceListLayout } from "./layouts/InvoiceListLayout";
import { InvoiceTabPage } from "./pages/InvoiceTabPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import SupportLayout from "./layouts/SupportLayout";
import InvoicePageLayout from "./layouts/InvoicePageLayout";


function App() {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    fetch("/.auth/me")
      .then(() => setLoading(false))
  },[]);

  if (loading) return <LoadSpinner/>

  return (
    <>  
        <Routes>
          <Route element={<WorkspaceLayout />}>
          {/* Pages that DO live under the WorkspaceLayout shell */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Simple dashboard page for now */}
            <Route path="/dashboard" element={<DashboardLayout />} >
              <Route index element={<DashboardPage/>} />
            </Route>

            {/* Invoices section uses InvoiceListLayout*/}
            <Route path="/invoices" element={<InvoiceListLayout />}>
              <Route index element={<Navigate to="pending" replace />} />
              <Route path=":invTab" element={<InvoiceTabPage/>} />
            </Route>

             {/* Invoice page section */}
            <Route path="/invoice/:id" element={<InvoicePageLayout />} >
              <Route index element={<InvoicePage />}/>
            </Route>

            {/* Support page section */}
            <Route path="/support" element={<SupportLayout />} >
              <Route index element={<HelpSupport/>} />
            </Route>
          </Route>

          {/* Pages that DO NOT live under the WorkspaceLayout shell */}
          
        </Routes>
    </>
  );
}

export default App;
