import { useUser } from "../hooks/UserContext";

function DashboardPage() {
  const { user } = useUser();

  return (
    <div>
      <h1 id="greeting">
        Hello, { user?.name ?? "Guest" }
      </h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default DashboardPage;
