import { Nav } from "react-bootstrap";
import { useUser } from "./UserContext";

export function UserName(){
    const { user } = useUser();
    if (user == null) {
        return <Nav.Item>Loading...</Nav.Item>;
    }

    return (
        <Nav.Link disabled>
            { user.name || 'Name not found' }
        </Nav.Link>
    )
}