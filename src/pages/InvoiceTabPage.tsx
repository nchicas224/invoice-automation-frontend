/*
This module will feed its parent, InvoiceListLayout, the InvoiceTabs component which dynamically fetches
invoice lists based on which tab is chosen. This component will populate into the Outlet element in this modules parent.

The component also pulls in its parents Outlet context and sets it based on the current active tab (See LayoutCtx for type).
*/
import { useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import type { LayoutCtx } from "../types/layout-types";
import InvoiceTab from "../components/InvoiceTabs";

const TITLES: Record<string, string> = {
  pending: "To Do",
  approval: "Pending Approval",
  completed: "Completed",
};

export function InvoiceTabPage() {
  const { invTab } = useParams();
  const { setHeaderTitle } = useOutletContext<LayoutCtx>();

  useEffect(() => {
    const title = invTab && TITLES[invTab] ? TITLES[invTab] : "Invoices";
    setHeaderTitle(title);
    return () => setHeaderTitle("Invoices");
  }, [invTab, setHeaderTitle]);

  return <InvoiceTab invTab={invTab ?? "pending"} />;
}
