import { Col, Row, Container } from "react-bootstrap";
import InvoiceNav from "../components/InvoiceSideBar.tsx";

export default function Invoices() {
  return (
    <Container fluid className="px-0">
      <Row className="g-0">
        <Col xs="auto" className="px-0">
          <InvoiceNav/>
        </Col>
      

        <Col className="p-4">
          <Row className="border-bottom border-2 border-dark">
            <Col className="p-0">
              <h1 className="text-start">Invoices</h1>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
