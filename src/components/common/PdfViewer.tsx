"use client";


// Polyfill for older mobile browsers (Promise.withResolvers)
if (!(Promise as any).withResolvers) {
  (Promise as any).withResolvers = function () {
    let resolve: any;
    let reject: any;

    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return { promise, resolve, reject };
  };
}


import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./PdfViewer.module.css";

// Required for v10+
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PdfViewerProps {
  file: File | null;
}

export default function PdfViewer({ file }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  if (!file) return null;



  return (
    <div className={styles.viewerWrapper}>
    <div className={styles.zoomWrapper} >
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <Page 
            key={index} 
            pageNumber={index + 1} 
            width={600}
            scale={1.6}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
      </div>
    </div>
  );
}