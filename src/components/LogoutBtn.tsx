import { Button } from "react-bootstrap";

export default function LogoutButton(){
    const handleLogout = () => {
        window.location.assign('/.auth/logout?post_logout_redirect_uri=/');
    }

    return <Button onClick={handleLogout}>Log Out</Button>
}