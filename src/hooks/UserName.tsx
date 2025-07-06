import { useUser, getUserName } from "./UserContext";

export function UserName() {
  const { user } = useUser();
  const name = getUserName(user);
  if (user == null) {
    return <>Loading...</>;
  }

  return <>{name || "Name not found"}</>;
}
