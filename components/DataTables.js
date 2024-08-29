import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

const DataTables = ({ columns, data, url }) => {
  const tableRef = useRef();

  let dataTableOptions = {
    columns: columns,
    responsive: true, // 반응형 켜기
    // options
  };

  if (url) {
    const serverUrl = `${process.env.REACT_APP_API_BASE_URL}${url}`;

    dataTableOptions = {
      ...dataTableOptions,
      serverSide: true,
      processing: true,
      paging: true,
      ajax: {
        contentType: "application/json",
        url: serverUrl,
        type: "POST",
        data: function (d) {
          d.order.forEach(function (o, i) {
            o.columnName = d.columns[o.column].data;
          }); // sort data
          return JSON.stringify(d);
        },
      },
    };
  } else {
    dataTableOptions = { ...dataTableOptions, data: data };
  }

  useEffect(() => {
    // $.springFriendly();

    const table = $(tableRef.current).DataTable(dataTableOptions);

    // 언마운트 시 destroy
    return () => {
      table.destroy();
    };
  }, []);

  return (
    <div>
      <table ref={tableRef} style={{ width: "100%" }}></table>
    </div>
  );
};

export default DataTables;
