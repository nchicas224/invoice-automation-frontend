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

    return (
        <BaseSectionLayout
        sidebarItems={INV_DETAIL_NAV}
        defaultTitle="Invoice"
        />
    );
}

