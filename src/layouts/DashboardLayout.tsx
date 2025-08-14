
import BaseSectionLayout from "./BaseSectionLayout";

const DASHBOARD_NAV_ITEMS = [
    {to: "/dashboard/reports", label: "Reports"}
];

export function DashboardLayout() {
    return (
        <BaseSectionLayout
        sidebarItems={DASHBOARD_NAV_ITEMS}
        defaultTitle="Dashboard"
        />
    );
}