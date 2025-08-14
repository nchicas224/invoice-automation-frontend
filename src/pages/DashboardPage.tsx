import { useUser, getUserName } from "../hooks/UserContext";
import { useOutletContext } from "react-router-dom";
import { type LayoutCtx } from "../types/layout-types";
import { useEffect } from "react";

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
    </div>
  );
}

export default DashboardPage;
