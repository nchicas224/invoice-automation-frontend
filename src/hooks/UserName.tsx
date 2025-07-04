import { Nav } from "react-bootstrap";
import { useUser } from "./UserContext";

export function UserName() {
  const { user } = useUser();
  if (user == null) {
    return <Nav.Item>Loading...</Nav.Item>;
  }

  return <>{user.name || "Name not found"}</>;
}
