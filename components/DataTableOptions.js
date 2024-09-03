export const createDataTablesOptions = (columns, data, url, page) => {

  // columns의 모든 data 속성을 name 속성으로 복사
  columns.forEach((column) => {
    column.name = column.data;
  });

  let dataTableOptions = {
    columns: columns,
    responsive: true, // 반응형 켜기
    colReorder: true,
    buttons: [
      {
        extend: 'colvis',
        text: 'Select Columns', // 버튼에 표시될 텍스트
      }
    ],
    // options
    layout: {
      topStart: {
        buttons: [
          'colvis'
        ]
      }
    }
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
        // d.order.forEach(function (o, i) {
        //   o.columnName = d.columns[o.column].data;
        // }); // sort data
        // d.length = 10;
        // d.start = (page -1) * 10;
        console.log(d);
        return JSON.stringify(d);
      },
    },
  };
};
