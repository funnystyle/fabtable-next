import { ExcelDownload } from "@components/ExcelDownload";
import $ from "jquery";
import { ExcelUpload } from "@components/ExcelUpload";

export const createDataTablesOptions = (tableRef, header, columns, data, url, page) => {

  // header가 null이면 columns와 동일
  if (!header) {
    header = columns;
  }

  console.log(columns);

  // columns의 모든 data 속성을 name 속성으로 복사
  columns.forEach((column) => {
    column.name = column.data;
  });


  let dataTableOptions = {
    fixedColumns: {
      leftColumns: 2, // 왼쪽에서 고정할 열의 수
      rightColumns: 0, // 오른쪽에서 고정할 열의 수 (필요 시 설정)
    },
    columns: columns,
    scrollX:true,
    // responsive: true, // 반응형 켜기
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
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/excel`, allRows:false, allColumns:false, type: 'EXCEL'}),
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/excel`, allRows:true, allColumns:false, type: 'EXCEL'}),
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/excel`, allRows:false, allColumns:true, type: 'EXCEL'}),
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/excel`, allRows:true, allColumns:true, type: 'EXCEL'})
          ]
      },
      bottom3: {
        buttons: [
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/pdf`, allRows:false, allColumns:false, type: 'PDF'}),
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/pdf`, allRows:true, allColumns:false, type: 'PDF'}),
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/pdf`, allRows:false, allColumns:true, type: 'PDF'}),
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/pdf`, allRows:true, allColumns:true, type: 'PDF'})
        ]
      },
      bottom4: {
        buttons: [
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/word`, allRows:false, allColumns:false, type: 'WORD'}),
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/word`, allRows:true, allColumns:false, type: 'WORD'}),
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/word`, allRows:false, allColumns:true, type: 'WORD'}),
          ExcelDownload({ tableRef, header, columns, downloadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/download/word`, allRows:true, allColumns:true, type: 'WORD'})
        ]
      },
      bottom5: {
        buttons: [
          ExcelUpload({ uploadUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}/excel/upload`})
        ]
      }
    },
    initComplete: function (dt) {
      const tr = this.find('thead tr');
      const th = $(tr[tr.length - 1]).find('th');
      th.each(function (i, data) {
        $(data).attr('colspan',1);
      });
    }
  };

  // data가 있으면 clientSide
  if (data) {
    return { ...dataTableOptions, data: data };
  }

  // url이 있으면 serverSide
  const serverUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;

  console.log("serverUrl", serverUrl)

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
        console.log("data", d);
        return JSON.stringify(d);
      },
    },
  };
};
