import { useParams } from "react-router-dom";

export function InvoicePage(){
    const { id } = useParams<{ id: string }>();
    return <h1>Invoice Page: {id}</h1>
}

export default InvoicePage;