import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button, Row, Col, Image } from 'antd';
import 'antd/dist/reset.css'; // antd 스타일 초기화
import "core-js/full/promise/with-resolvers.js";

// Web Worker 설정
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;

function PDFViewer() {

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handlePrevious() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function handleNext() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Document
        file="/test.pdf" // Next.js에서 정적 파일은 public 폴더에 위치
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
      </Document>
      <Row justify="center" align="middle" style={{ marginTop: '20px' }}>
        <Col>
          <Button onClick={handlePrevious} disabled={pageNumber <= 1}>
            이전
          </Button>
        </Col>
        <Col style={{ margin: '0 10px' }}>
          <span>
            Page {pageNumber} of {numPages}
          </span>
        </Col>
        <Col>
          <Button onClick={handleNext} disabled={pageNumber >= numPages}>
            다음
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default PDFViewer;
