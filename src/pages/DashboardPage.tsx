import usePageTitle from "../hooks/userPageTitle";

function DashboardPage() {
  usePageTitle();

  return (
    <div>
      <h1 id="greeting"></h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default DashboardPage;
