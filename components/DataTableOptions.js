import { ExcelDownload } from "@components/ExcelDownload";
import $ from "jquery";

export const createDataTablesOptions = (columns, data, url, page) => {
  // columns의 모든 data 속성을 name 속성으로 복사
  columns.forEach((column) => {
    column.name = column.data;
    column.orderable = true;
  });


  let dataTableOptions = {
    columns: columns,
    responsive: true, // 반응형 켜기
    colReorder: true,
    buttons: [
      {
        extend: "colvis",
        text: "Select Columns", // 버튼에 표시될 텍스트
      },
      {
        extend: "pageLength",
        text: "Page Size",
      },
    ],
    // options
    layout: {
      topStart: {
        // features: ["pageLength"],
        buttons: [
          "colvis",
          "pageLength",
        ],
      },
      bottom2: {
        buttons: [
          ExcelDownload({ columns, data, downloadUrl: `${process.env.REACT_APP_API_BASE_URL}${url}/download/excel`, allRows:false, allColumns:false }),
          ExcelDownload({ columns, data, downloadUrl: `${process.env.REACT_APP_API_BASE_URL}${url}/download/excel`, allRows:true, allColumns:false }),
          ExcelDownload({ columns, data, downloadUrl: `${process.env.REACT_APP_API_BASE_URL}${url}/download/excel`, allRows:false, allColumns:true }),
          ExcelDownload({ columns, data, downloadUrl: `${process.env.REACT_APP_API_BASE_URL}${url}/download/excel`, allRows:true, allColumns:true })

          ]
      }
    },
  };

  // data가 있으면 clientSide
  if (data) {
    return { ...dataTableOptions, data: data };
  }

  // url이 있으면 serverSide
  const serverUrl = `${process.env.REACT_APP_API_BASE_URL}${url}`;

  return {
    ...dataTableOptions,
    serverSide: true,
    processing: true,
    displayStart: (page - 1) * 10,
    ajax: {
      contentType: "application/json",
      url: serverUrl,
      type: "POST",
      data: function (d) {
        console.log(d);
        return JSON.stringify(d);
      },
    },
  };
};
