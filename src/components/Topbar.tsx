import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutBtn";

export function TopBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {/* Brand / logo */}
        <Navbar.Brand as={Link} to="/dashboard">
          Living Classrooms
        </Navbar.Brand>

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
          </Nav>
        </Navbar.Collapse>
        <LogoutButton />
      </Container>
    </Navbar>
  );
}
