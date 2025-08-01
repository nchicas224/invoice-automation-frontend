import { Nav, Navbar} from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function InvoiceNav(){
    return (
        <Navbar
            variant="dark" 
            expand={false}
            className="flex-column flex-fill min-vh-100 bg-dark bg-gradient"
        >
            <Nav variant="pills" className="flex-column w-100 p-4 fw-semibold sidebar-nav">
                <Nav.Link as={NavLink} to="/invoices/to-do">
                    To Do
                </Nav.Link>
                <Nav.Link as={NavLink} to="/invoices/pending-approval">
                    Pending Approval
                </Nav.Link>
                <Nav.Link as={NavLink} to="/invoices/completed">
                    Completed
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
