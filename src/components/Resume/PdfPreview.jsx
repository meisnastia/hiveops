import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PdfPreview({ pdfPath }) {
  const [width, setWidth] = useState(900);
  const [pdfReady, setPdfReady] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scale = width >= 2560 ? 2.0 : width >= 1920 ? 1.7 : width >= 1200 ? 1.4 : width > 786 ? 1.1 : 0.55;

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-secondary)" }}>
        PDF preview unavailable.{" "}
        <a href={pdfPath} download style={{ color: "var(--accent)" }}>Download instead</a>
      </div>
    );
  }

  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-card)",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {!pdfReady && (
        <div style={{ padding: "3rem 0", display: "flex", justifyContent: "center" }}>
          <div className="spinner" />
        </div>
      )}
      <Document
        file={pdfPath}
        onLoadSuccess={({ numPages: n }) => { setNumPages(n); setPdfReady(true); }}
        onLoadError={() => { setPdfReady(true); setError(true); }}
        className="d-flex flex-column align-items-center"
      >
        {Array.from({ length: numPages || 1 }, (_, i) => (
          <Page
            key={`page-${i}`}
            pageNumber={i + 1}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        ))}
      </Document>
    </div>
  );
}
