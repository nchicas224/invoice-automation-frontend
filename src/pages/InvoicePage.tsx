import { useLocation, useParams, useNavigate } from "react-router-dom";

export function InvoicePage(){
    const { id } = useParams<{ id: string }>();
    const urlQ = new URLSearchParams(useLocation().search);
    const referrer = urlQ.get("ref");
    let navigate = useNavigate();

    const goBack= () => {
        if (referrer){
            navigate(`invoice/${referrer}`);
        } else {
            navigate(-1);
        }
    };

    return (
        <div>
            <button onClick={goBack}>Back to List</button>
            <h1>Invoice Page: {id}</h1>
        </div>
    );
}

export default InvoicePage;