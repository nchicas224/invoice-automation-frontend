import { useUser, getUserName } from "../hooks/UserContext";
import { useOutletContext } from "react-router-dom";
import { type LayoutCtx } from "../types/layout-types";
import { useEffect } from "react";

import { Card } from "react-bootstrap";
import EditForm from "../components/EditForm";

function DashboardPage() {
  const { user } = useUser();
  const name = getUserName(user);
  const firstName = name?.split("/\s+/")[0] ?? "";
  
  const { setHeaderTitle } = useOutletContext<LayoutCtx>();

  useEffect(() => {
    const title = `Hello, ${firstName || "Guest"}`;
    setHeaderTitle(title);
  },[firstName, setHeaderTitle]);

  return (
    <div>
      <br/>
      <h4>Welcome to your dashboard!</h4>
      <Card className="h-100 invoice-page-cards"><EditForm /></Card>
      
    </div>
  );
}

export default DashboardPage;
