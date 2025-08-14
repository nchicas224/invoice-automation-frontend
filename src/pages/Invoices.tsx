import { Col, Row, Container } from "react-bootstrap";
import InvoiceNav from "../components/SideBarNav.tsx";
import InvoiceTab from "../components/InvoiceTabs.tsx";
import { useParams } from "react-router-dom";
import cleanTitle from "../helpers/CleanTitle.ts";

// export default function Invoices() {
//   const { invTab } = useParams();

//   let cleanedTab = "Loading...";
//   if (typeof invTab === "string") {
//     cleanedTab = cleanTitle(invTab);
//   }

//   return (
//     <Container fluid className="px-0">
//       <Row className="g-0 align-items-stretch">
//         <Col xs="auto" className="px-0 d-flex">
//           <InvoiceNav />
//         </Col>

//         <Col className="p-4">
//           <Row className="border-bottom border-2 border-dark">
//             <Col className="p-0">
//               <h1 className="text-start">{cleanedTab}</h1>
//             </Col>
//           </Row>
//           <Row className="d-flex">
//             <InvoiceTab invTab={invTab ?? "Error"} />
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// }
