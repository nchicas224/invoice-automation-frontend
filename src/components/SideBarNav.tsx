import { Nav, Navbar} from "react-bootstrap";
import { NavLink } from "react-router-dom";

export type NavItem = {
    to?: string;
    label: string;
    icon?: React.ReactNode;
    end?: boolean;
    onClick?: () => void;
}

export default function SidebarNav({items, extra}: { items: NavItem[]; extra?: React.ReactNode}){
    return (
        <Navbar
            variant="dark" 
            expand={false}
            className="flex-column min-vh-100 bg-dark bg-gradient"
        >
            <Nav variant="pills" className="flex-column w-100 p-4 fw-semibold sidebar-nav">
                {items.map((it) => 
                it.to ? (
                    <Nav.Link
                    as={NavLink}
                    to={it.to}
                    end={it.end}
                    key={it.to + it.label}>
                        {it.label}
                    </Nav.Link>
                ) : (
                    <Nav.Link
                    as="button"
                    key={it.label}
                    onClick={it.onClick}
                    >
                        {it.label}
                    </Nav.Link>
                )
                )}
                {extra}
            </Nav>
        </Navbar>
    )
}
