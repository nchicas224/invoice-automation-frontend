import { useLocation } from "react-router-dom";

function usePageTitle(){
    const match = /\/([^/+])$/.exec(useLocation().pathname);
    const page = match ? match[1] : "Home";
    document.title = `Invoice App - ${page}`;
};

export default usePageTitle;