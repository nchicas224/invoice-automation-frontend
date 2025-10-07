import { useLocation, useParams, useOutletContext } from "react-router-dom";
import type { Invoice } from "../components/InvoiceTabs";
import { useEffect, useState } from "react";
import LoadSpinner from "../components/LoadingSpinner";
import { PdfViewer } from "../components/PdfViewer";
import JSZip from "jszip";
import { Card, Col, Row } from "react-bootstrap";
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import { type LayoutCtx } from "../types/layout-types";
import EditForm from "../components/EditForm";

export function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const stateInvoice = (location.state as { invoice?: Invoice })?.invoice;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  const [invoiceData, setInvoiceData] = useState<ArrayBuffer | null>(null);
  const [checkData, setCheckData] = useState<ArrayBuffer | null>(null);

  const { setHeaderTitle } = useOutletContext<LayoutCtx>();
  const { contentRef } = useOutletContext<LayoutCtx>();

  const [active, setActive] = useState<string>("checkRequest");

  useEffect(() => {
    if (stateInvoice) {
      setInvoice(stateInvoice);
      return;
    }

    const raw = localStorage.getItem(`inv-id:${id}`);
    if (raw) {
      setInvoice(JSON.parse(raw));
      return;
    }

    setInvoice(null);
    return; //Create Fetch API for singleton invoice as final fallback.
  }, [id]);

  useEffect(() => {
    async function loadZip() {
      try {
        if (!invoice) return;
        const resp = await fetch(
          `/api/getInvoicePage?id=${invoice.id}&ib=${invoice.inv_blob}&cb=${invoice.cr_blob}&icn=${invoice.inv_container}&ccn=${invoice.cr_container}`
        );
        if (!resp.ok) throw new Error("Failed to load ZIP");
        const zipBytes = await resp.arrayBuffer();

        const zip = await JSZip.loadAsync(zipBytes);
        const invoiceByteBuffer = await zip
          .file(invoice.inv_blob)!
          .async("arraybuffer");
        const checkByteBuffer = await zip
          .file(invoice.cr_blob)!
          .async("arraybuffer");

        setInvoiceData(invoiceByteBuffer);
        setCheckData(checkByteBuffer);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    loadZip();
  }, [invoice]);

  useEffect(() => {
    const title = invoice?.inv_name ?? "Invoice";
    setHeaderTitle(title);
    return () => setHeaderTitle("Invoice");
  },[invoice?.inv_name, setHeaderTitle]);

  useEffect(() => {
    requestAnimationFrame(() => {
      contentRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  if (loading) return <LoadSpinner />;

  if (!invoice) return <h1>No invoice found</h1>;

  if (!invoiceData || !checkData)
    return <h1>Failed to retrieve invoice data</h1>;

  return (
    <Row className="g-3 w-100">
      <Col md={6} className="min-w-0">
        <Tabs className="invoice-page-tabs">
          <Tab eventKey="invoice" title="Invoice">
            <Card className="h-100 invoice-page-cards">
              <PdfViewer fileBytes={invoiceData} />
            </Card>
          </Tab>
        </Tabs>
      </Col>
      <Col md={6} className="min-w-0">
        <Tabs activeKey={active} onSelect={(t) => setActive(t!)} className="invoice-page-tabs">
          <Tab eventKey="checkRequest" title="Check Request">
            <Card className="h-100 invoice-page-cards">
              <PdfViewer fileBytes={checkData} />
            </Card>
          </Tab>
          <Tab eventKey="editCheckRequest" title="Edit">
            <Card className="h-100 invoice-page-cards">
              <EditForm />
            </Card>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
}

export default InvoicePage;
