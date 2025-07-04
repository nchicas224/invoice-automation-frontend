import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutBtn";
import NavbarLogo from "./NavbarBrand";
import { UserName } from "../hooks/UserName";

export function TopBar() {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {/* Brand / logo */}
        <NavbarLogo />

        {/* Hamburger toggle on small screens */}
        <Navbar.Toggle aria-controls="main-nav" />

        <Navbar.Collapse id="main-nav">
          {/* Nav links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/pendingInvoices">
              Pending Invoices
            </Nav.Link>
            <Nav.Link as={Link} to="/helpSupport">
              Help and Support
            </Nav.Link>
            <UserName />
          </Nav>
          
          <LogoutButton />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
