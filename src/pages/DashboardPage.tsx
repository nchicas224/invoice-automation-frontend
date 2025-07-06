import { useUser, getUserName } from "../hooks/UserContext";

function DashboardPage() {
  const { user } = useUser();
  const name = getUserName(user);
  const arr: string[] | undefined = name?.split(" ");
  let firstName = "";
  if (arr && arr.length){
    firstName = arr[0];
  } 

  return (
    <div>
      <h1 id="greeting">
        Hello, { firstName ? firstName : "Guest" }
      </h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export default DashboardPage;
