import { useLocation, useNavigate } from "react-router-dom";
import BaseSectionLayout from "./BaseSectionLayout";



export default function InvoicePageLayout() {
    const urlQ = new URLSearchParams(useLocation().search);
    const referrer = urlQ.get("ref");
    let navigate = useNavigate();

    const goBack = () => {
        if (referrer) {
        navigate(`/invoices/${referrer}`);
        } else {
        navigate(-1);
        }
    };

    const INV_DETAIL_NAV = [
        {label: "Back to list", onClick: goBack}
    ]

    return (
        <BaseSectionLayout
        sidebarItems={INV_DETAIL_NAV}
        defaultTitle="Invoice"
        />
    );
}

