import { useLocation, useParams, useNavigate, useOutletContext } from "react-router-dom";
import type { Invoice } from "../components/InvoiceTabs";
import { useEffect, useState } from "react";
import LoadSpinner from "../components/LoadingSpinner";
import { PdfViewer } from "../components/PdfViewer";
import JSZip from "jszip";
import { Card, CardGroup } from "react-bootstrap";
import { type LayoutCtx } from "../types/layout-types";

export function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const stateInvoice = (location.state as { invoice?: Invoice })?.invoice;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  const [invoiceData, setInvoiceData] = useState<ArrayBuffer | null>(null);
  const [checkData, setCheckData] = useState<ArrayBuffer | null>(null);

  const { setHeaderTitle } = useOutletContext<LayoutCtx>();

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

        const zip = await JSZip().loadAsync(zipBytes);
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

  if (loading) return <LoadSpinner />;

  if (!invoice) return <h1>No invoice found</h1>;

  if (!invoiceData || !checkData)
    return <h1>Failed to retrieve invoice data</h1>;

  useEffect(() => {
    const title = invoice?.inv_name || "Invoice";
    setHeaderTitle(title);
    return () => setHeaderTitle("Invoice");
  },[invoice?.inv_name, setHeaderTitle]);

  return (
    <div>
      <h1>Invoice Page: {invoice?.id}</h1>
      <p>Invoice Date: {invoice.creation_date}</p>
      <CardGroup>
        <Card>
          <PdfViewer fileBytes={invoiceData} />
        </Card>
        <Card>
          <PdfViewer fileBytes={checkData} />
        </Card>
      </CardGroup>
    </div>
  );
}

export default InvoicePage;
