import React, { useState } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "core-js/full/promise/with-resolvers.js";

// Set the worker source for react-pdf
console.log(pdfjs.version)
pdfjs.GlobalWorkerOptions.workerSrc = `./pdf.worker.min.js`;


const PdfViewer = () => {
  const [pdfData, setPdfData] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const url = "/api/v1/cs";

  const fetchPdf = async () => {
    try {
      const requestData = `
      {"header":[[{"title":"C/S No.","name":"csNumber","nameEn":"C/S No.","sortable":true,"fixed":true,"displayOrder":1,"columnName":"csNumber","data":"csNumber","sTitle":"C/S No.","sName":"csNumber","bSortable":true,"mData":"csNumber"}
      ,{"title":"C/S 상태","name":"csStatus","nameEn":"C/S Status","sortable":false,"fixed":true,"displayOrder":2,"columnName":"csStatus","data":"csStatus","sTitle":"C/S 상태","sName":"csStatus","bSortable":false,"mData":"csStatus"}
      ,{"title":"접수 담당자","name":"csManager","nameEn":"Receptionist","sortable":false,"fixed":true,"displayOrder":3,"columnName":"csManager","data":"csManager","sTitle":"접수 담당자","sName":"csManager","bSortable":false,"mData":"csManager"}
      ,{"title":"접수일","name":"csDate","nameEn":"Reception Date","sortable":true,"fixed":false,"displayOrder":4,"columnName":"csDate","data":"csDate","sTitle":"접수일","sName":"csDate","bSortable":true,"mData":"csDate"}
      ,{"title":"요청일시","name":"requestDatetime","nameEn":"Request Date","sortable":true,"fixed":false,"displayOrder":5,"columnName":"requestDatetime","data":"requestDatetime","sTitle":"요청일시","sName":"requestDatetime","bSortable":true,"mData":"requestDatetime"}
      ,{"title":"고객사","name":"customer","nameEn":"Customer","sortable":false,"fixed":false,"displayOrder":6,"columnName":"customer","data":"customer","sTitle":"고객사","sName":"customer","bSortable":false,"mData":"customer"}
      ,{"title":"장비사","name":"equipment","nameEn":"Equipment","sortable":false,"fixed":false,"displayOrder":7,"columnName":"equipment","data":"equipment","sTitle":"장비사","sName":"equipment","bSortable":false,"mData":"equipment"}
      ,{"title":"협력사","name":"partner","nameEn":"Partner","sortable":false,"fixed":false,"displayOrder":8,"columnName":"partner","data":"partner","sTitle":"협력사","sName":"partner","bSortable":false,"mData":"partner"}
      ,{"title":"설비명","name":"equipmentName","nameEn":"Equipment Name","sortable":false,"fixed":false,"displayOrder":9,"columnName":"equipmentName","data":"equipmentName","sTitle":"설비명","sName":"equipmentName","bSortable":false,"mData":"equipmentName"}
      ,{"title":"설비ID","name":"equipmentId","nameEn":"Equipment ID","sortable":false,"fixed":false,"displayOrder":10,"columnName":"equipmentId","data":"equipmentId","sTitle":"설비ID","sName":"equipmentId","bSortable":false,"mData":"equipmentId"}
      ,{"title":"Chamber","name":"chamber","nameEn":"Chamber","sortable":false,"fixed":false,"displayOrder":11,"columnName":"chamber","data":"chamber","sTitle":"Chamber","sName":"chamber","bSortable":false,"mData":"chamber"}]]
      ,"allColumnNames":["csNumber","csStatus","csManager","csDate","requestDatetime","customer","equipment","partner","equipmentName","equipmentId","chamber"]
      ,"columns":["csNumber","csStatus","csManager","csDate","requestDatetime","customer","equipment","partner","equipmentName","equipmentId","chamber"]
      ,"search":{"value":""}
      ,"order":[{"columns":0,"name":"csNumber","dir":"asc"}],"length":10,"start":0,"allRows":true,"allColumns":true,"selectedRows":[]}
      `;

      console.log(requestData)

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/pdf`, requestData, {
        responseType: 'arraybuffer', // 바이너리 데이터로 받기
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response.data)

      const blob = new Blob([response.data], { type: 'application/pdf' });
      setPdfData(blob);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <button onClick={fetchPdf}>Load PDF</button>

      {pdfData && (
        <div>
          <Document
            file={pdfData}
            onLoadSuccess={handleDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
