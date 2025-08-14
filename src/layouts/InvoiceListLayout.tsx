/* 
This layout component will return the BaseSectionLayout with computed props.
The route child of this component will return a component to populate the BaseSectionLayout Outlet.
 */

import BaseSectionLayout from "./BaseSectionLayout";

const INVOICE_TABS = [
    {to: "/invoices/pending", label: "To Do"},
    {to: "/invoices/approvals", label: "Pending Approval"},
    {to: "/invoices/completed", label: "Completed"}
];

export function InvoiceListLayout() {
    return (
        <BaseSectionLayout
        sidebarItems={INVOICE_TABS}
        defaultTitle="Invoices"
        />
    );
}