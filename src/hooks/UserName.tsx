import { useUser } from "./UserContext";

export function UserName() {
  const { user } = useUser();
  if (user == null) {
    return <>Loading...</>;
  }

  return <>{user.name || "Name not found"}</>;
}
