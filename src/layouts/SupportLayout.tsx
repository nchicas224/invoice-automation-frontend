import BaseSectionLayout from "./BaseSectionLayout";

const SUPPORT_NAV_ITEMS = [
    {to: "/support/tickets", label: "Submit Ticket"}
];

export default function SupportLayout() {
    return (
        <BaseSectionLayout
        sidebarItems={SUPPORT_NAV_ITEMS}
        defaultTitle="Help and Support"
        />
    );
}