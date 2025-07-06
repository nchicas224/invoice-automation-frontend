import { useUser, getUserName } from "../hooks/UserContext";

function DashboardPage() {
  const { user } = useUser();
  const name = getUserName(user);

  return (
    <div>
      <h1 id="greeting">
        Hello, { name ?? "Guest" }
      </h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default DashboardPage;
