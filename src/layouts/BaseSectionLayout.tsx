/* Use this component layout to render the base frame that includes SideNavBar + Workspace */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarNav, { type NavItem } from "../components/SideBarNav";
import type { LayoutCtx } from "../types/layout-types";
import { Col, Container, Row } from "react-bootstrap";

type Props = {
    sidebarItems: NavItem[];
    defaultTitle: string;
    extraSidebar?: React.ReactNode;
    headerActions?: React.ReactNode;
};

export default function BaseSectionLayout({
    sidebarItems,
    defaultTitle,
    extraSidebar,
    headerActions,
}: Props) {
    const [ title, setTitle ] = useState(defaultTitle);
    
    return (
    <Container fluid className="px-0">
      <Row className="g-0 align-items-stretch">
        <Col xs="auto" className="px-0 flex-grow 1" style={{width: 200}}>
          <SidebarNav items={sidebarItems} extra={extraSidebar}/>
        </Col>
      

        <Col className="p-4 flex-grow 1">
          <Row className="border-bottom border-2 border-dark">
            <Col className="p-0">
              <h1 className="text-start">{title}</h1>
            </Col>
            <Col className="p-0 ms-auto d-flex gap-2 justify-content-end">
                {headerActions}
            </Col>
          </Row>
          <Row className="d-flex">
            {/* Pass the setHeaderTitle function down to the children so they can set the context to the column above. */}
            <Outlet context={{ setHeaderTitle: setTitle } satisfies LayoutCtx} />
          </Row>
        </Col>
      </Row>
    </Container>
    );
}