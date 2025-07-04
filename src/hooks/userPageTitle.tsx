import { useEffect } from "react";
import { useLocation } from "react-router-dom";


function PageSetter({ children }: { children: React.ReactNode }) {
    
    const { pathname } = useLocation();

    useEffect(() => {
        const match = /\/([^/]+)$/.exec(pathname);
        const page = match ? match[1] : "Home";

        let title = "";
        if (page !== "Home") {
            let regex = /[a-z]+|[A-Z][a-z]+/g;
            const words = page.match(regex) || [];

            if (words.length){
                for ( const e of words ){
                    const cap = e[0].toUpperCase();
                    const word = cap.concat(e.slice(1));
                    title += `${word} `
                };
            }
        };

        if (title){
            document.title = `${title} | Invoice App`;
        } else {
            document.title = `${page} | Invoice App`;
        };
    }, [pathname]);

    return <>{children}</>;
}

export default PageSetter;
