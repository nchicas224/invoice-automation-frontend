import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutBtn";
import NavbarLogo from "./NavbarBrand";
import { UserName } from "../hooks/UserName";

export function TopBar() {
  return (
    <Navbar className="lcf-bg-primary" variant="dark" expand="lg">
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
            <Nav.Link as={Link} to="/invoices">
              Invoices
            </Nav.Link>
            <Nav.Link as={Link} to="/support">
              Help and Support
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link disabled>
              <UserName />
            </Nav.Link>
            <LogoutButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
