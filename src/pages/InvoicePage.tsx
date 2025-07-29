import { useLocation, useParams, useNavigate } from "react-router-dom";
import type { Invoice } from "./InvoiceTabs";
import { useEffect, useState } from "react";
import LoadSpinner from "../components/LoadingSpinner";

export function InvoicePage(){
    const { id } = useParams<{ id: string }>();
    const urlQ = new URLSearchParams(useLocation().search);
    const referrer = urlQ.get("ref");
    const location = useLocation();
    const stateInvoice = (location.state as { invoice?: Invoice})?.invoice;

    const [ invoice, setInvoice ] = useState< Invoice | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (stateInvoice){
            setInvoice(stateInvoice);
            setLoading(false);
            return;
        }

        const raw = localStorage.getItem(`inv-id:${id}`);
        if (raw){
            setInvoice(JSON.parse(raw));
            setLoading(false);
            return;
        }

        return; //Create Fetch API for singleton invoice as final fallback.
    });

    if (loading) return <LoadSpinner/>;

    if (!invoice) return <h1>No invoice found</h1>


    let navigate = useNavigate();
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
        </div>
    );
}

export default InvoicePage;