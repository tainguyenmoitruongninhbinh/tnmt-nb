import React, { useState, useEffect, useRef } from 'react';
import apiUrl from 'src/api/config';
import { pdfjs, Document, Page } from 'react-pdf';
import { Box, CircularProgress } from '@mui/material';

interface ShowFilePDFProps {
  src: string | null;
  name: string | null;
}

const ShowFilePDF = ({ src }: ShowFilePDFProps) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageWidth, setPageWidth] = useState<number>(800); // Default width
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

    if (src) {
      handleReadFile();
    }
  }, [src]);

  useEffect(() => {
    // Update the page width when the container width changes
    const updatePageWidth = () => {
      if (containerRef.current) {
        setPageWidth(containerRef.current.offsetWidth);
      }
    };

    updatePageWidth(); // Initial width setup

    window.addEventListener('resize', updatePageWidth); // Update on resize

    return () => {
      window.removeEventListener('resize', updatePageWidth);
    };
  }, []);

  const handleReadFile = async () => {
    const fileName = src?.split('/').slice(-1).pop();

    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/file/readfile?FilePath=pdfNB&FileName=${fileName}`);

      if (!response.ok) {
        throw new Error('File not found');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setFileUrl(url);

      // Get the total number of pages
      const pdf = await pdfjs.getDocument(url).promise;
      setNumPages(pdf.numPages);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate an array of <Page> components for all pages
  const renderPages = () => {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
      pages.push(
        <Page
          key={pageNumber}
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={pageWidth} // Set dynamic width here
        />
      );
    }

    return pages;
  };

  return (
    <Box ref={containerRef} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <CircularProgress size={20} />
      ) : fileUrl ? (
        <Document file={fileUrl} loading={loading}>
          <Box sx={{ width: '100%', height: '100%' }}>{renderPages()}</Box>
        </Document>
      ) : (
        <Box>KHÔNG CÓ FILE HIỂN THỊ</Box>
      )}
    </Box>
  );
};

export default ShowFilePDF;
