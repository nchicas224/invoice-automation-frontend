import { useLocation, useParams, useNavigate } from "react-router-dom";
import type { Invoice } from "./InvoiceTabs";
import { useEffect, useState } from "react";
import LoadSpinner from "../components/LoadingSpinner";
import { PdfViewer } from "../components/PdfViewer";


interface Pdfs{
    inv_sas: string;
    cr_sas: string;
}

export function InvoicePage(){
    const { id } = useParams<{ id: string }>();
    const urlQ = new URLSearchParams(useLocation().search);
    const referrer = urlQ.get("ref");
    let navigate = useNavigate();
    const location = useLocation();
    const stateInvoice = (location.state as { invoice?: Invoice})?.invoice;

    const [ invoice, setInvoice ] = useState< Invoice | null >(null);
    const [ loading, setLoading ] = useState(true);

    const [ pdfs, setPdfs] = useState< Pdfs | null >(null);

    useEffect(() => {
        if (stateInvoice){
            setInvoice(stateInvoice);
            return;
        }

        const raw = localStorage.getItem(`inv-id:${id}`);
        if (raw){
            setInvoice(JSON.parse(raw));
            return;
        }

        setInvoice(null);
        setLoading(false);
        return; //Create Fetch API for singleton invoice as final fallback.
    },[id]);

    useEffect(() => {
        if (invoice){
            fetch(`/api/getInvoicePage?ib=${invoice.inv_blob}&cb=${invoice.cr_blob}&icn=${invoice.inv_container}&ccn=${invoice.cr_container}`)
            .then(r => r.json())
            .then(data => setPdfs(data))
            setLoading(false);
        }
    }, [invoice]);

    if (loading) return <LoadSpinner/>;

    if (!invoice) return <h1>No invoice found</h1>



    const goBack= () => {
        if (referrer){
            navigate(`/invoices/${referrer}`);
        } else {
            navigate(-1);
        }
    };

    return (
        <div>
            <button onClick={goBack}>Back to List</button>
            <h1>Invoice Page: {invoice?.id}</h1>
            <p>Invoice Date: {invoice.creation_date}</p>
            {!(pdfs?.inv_sas && pdfs?.cr_sas) ? (
                <p>No data found</p>
            ) : <div>
                    <PdfViewer fileUrl={pdfs.inv_sas}/>
                    <PdfViewer fileUrl={pdfs.cr_sas}/>
                </div>}
        </div>
    );
}

export default InvoicePage;