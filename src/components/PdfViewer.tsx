import { useState } from "react";
import { Document, Page } from "react-pdf";
import LoadSpinner from "./LoadingSpinner";

type PdfViewerProps = {
    fileUrl: string;
    width?: number;
    height?: number;
};

export function PdfViewer({
    fileUrl,
    width = 600,
    height = 800
}: PdfViewerProps){
    const [ numPages, setNumPages ] = useState(0);

    function onDocumentLoadSuccess({numPages}: {numPages: number}){
        setNumPages(numPages);
    }

    return (
        <div
            style={{
                width,
                height,
                overflowY: "auto",
                border: "1px solid #ccc",
            }}
        >
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<LoadSpinner/>}
                error={<p>Failed to load PDFs</p>}
            >
                {Array.from({ length: numPages }, (_,i) => (
                    <Page
                        key={i}
                        pageNumber={i+1}
                        width={width}
                        renderTextLayer={true}
                        renderAnnotationLayer={false}
                        className="mb-3"
                    />
                ))}
            </Document>
        </div>
    );
}