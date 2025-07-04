import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PageSetter({ children }: { children: React.ReactNode }) {
    
    const { pathname } = useLocation();

    useEffect(() => {
        const match = /\/([^/]+)$/.exec(useLocation().pathname);
        const page = match ? match[1] : "Home";
        document.title = `Invoice App - ${page}`;
    }, [pathname]);

    return <>{children}</>;
}

export default PageSetter;
