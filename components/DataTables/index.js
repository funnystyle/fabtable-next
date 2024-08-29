import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";

export default ({ data, columns }) => {
  const tableRef = useRef();

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data,
      columns,
      responsive: true, // 반응형 켜기
      // options
    });

    // 언마운트 시 destroy
    return () => {
      table.destroy();
    };
  }, []);

  return <table ref={tableRef} style={{ width: "100%" }}></table>;
};
