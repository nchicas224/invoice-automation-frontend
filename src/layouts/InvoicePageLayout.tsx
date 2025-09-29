import { useLocation, useNavigate } from "react-router-dom";
import BaseSectionLayout from "./BaseSectionLayout";
import { useCallback, useMemo } from "react";



export default function InvoicePageLayout() {
    const urlQ = new URLSearchParams(useLocation().search);
    const referrer = urlQ.get("ref");
    let navigate = useNavigate();

    const goBack = useCallback(() => {
        if (referrer) {
        navigate(`/invoices/${referrer}`);
        } else {
        navigate(-1);
        }
    }, [referrer, navigate]);

    const INV_DETAIL_NAV = useMemo(
        () => [{label: "Back to list", onClick: goBack}],
        [goBack]
    );
 
    const headerActions = 
        <>
            <button type="button" className="btn btn-success">Approve</button>
            <button type="button" className="btn btn-warning">Edit</button>
        </>

    return (
        <BaseSectionLayout
        sidebarItems={INV_DETAIL_NAV}
        headerActions={headerActions}
        defaultTitle="Invoice"
        />
    );
}

