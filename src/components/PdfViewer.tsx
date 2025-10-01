import { useState } from "react";
import { Document, Page } from "react-pdf";
import LoadSpinner from "./LoadingSpinner";
import { useElementWidth } from "../hooks/useElementWidth";

type PdfViewerProps = {
    fileBytes: ArrayBuffer;
    width?: number;
    height?: number;
};

export function PdfViewer({
    fileBytes,
    height = 800
}: PdfViewerProps){
    const [ numPages, setNumPages ] = useState(0);
    const [ err, setErr ] = useState<string|null>(null);
    const { ref, width = 600 } = useElementWidth<HTMLDivElement>(); 

    if (err){
        return (
            <div>
                <h4>Failed to Load PDF</h4>
                <p>{err}</p>
            </div>
        )
    }

    function onDocumentLoadSuccess({numPages}: {numPages: number}){
        setNumPages(numPages);
    }

    return (
        <div
            ref={ref}
            style={{
                height,
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: ".375rem",
                borderTopLeftRadius: "0",
                borderTopRightRadius: "0.1175rem",
                borderBottomRightRadius: "0.1175rem"
            }}
        >
            <Document
                file={fileBytes}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<LoadSpinner/>}
                onSourceError={(err: Error) => setErr(err.message)}
                onLoadError={(err: Error) => setErr(err.message)}
            >
                {Array.from({ length: numPages }, (_,i) => (
                    <Page
                        key={i}
                        pageNumber={i+1}
                        width={width}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="mb-3"
                    />
                ))}
            </Document>
        </div>
    );
}