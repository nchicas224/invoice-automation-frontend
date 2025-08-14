import { Outlet } from "react-router-dom";
import { TopBar } from "../components/Topbar";

// This is the GLOBAL CHROME MODULE, differs from BaseSectionLayout which is used to inject base frame.

export function WorkspaceLayout() {
    return (
        <>
        <TopBar />
        {/* This container provides the Topbar for all routes and keeps the Outlet for child pages to show their content.
         Route children are found in App.tsx and are nested by relation. */}
        <Outlet />
        </>
    );
}