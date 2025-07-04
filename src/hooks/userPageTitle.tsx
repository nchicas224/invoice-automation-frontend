import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PageSetter({ children }: { children: React.ReactNode }) {
    
    const { pathname } = useLocation();

    useEffect(() => {
        const match = /\/([^/]+)$/.exec(pathname);
        const page = match ? match[1] : "Home";
        document.title = `${page} | Invoice App`;
    }, [pathname]);

    return <>{children}</>;
}

export default PageSetter;
