import { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-colreorder";
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-responsive-dt";
import "datatables.net-buttons/js/buttons.colVis"; // colVis 기능 임포트
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net-colreorder-dt/css/colReorder.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import { createDataTablesOptions } from "@components/DataTableOptions";
import { useRouter } from "next/router";
import DataTable from "datatables.net-dt";

const DataTables = ({ columns, data, url, page }) => {
  const dataTableOptions = createDataTablesOptions(columns, data, url, page);

  const tableRef = useRef(null);
  const router = useRouter();

  let currentPage = null;

  useEffect(() => {
    const table = $(tableRef.current).DataTable(dataTableOptions);

    // 페이지 변경 시 URL 업데이트
    table.on("draw", () => {
      const pageInfo = table.page.info();
      const newPage = pageInfo.page + 1;

      if (currentPage === newPage) return;
      currentPage = newPage;

      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, page: newPage },
        },
        undefined,
        { shallow: true }
      );
    });

    // popstate 이벤트 핸들러
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const page = parseInt(params.get("page"), 10) || 1;

      table.page(page - 1).draw(false); // DataTable에서 특정 페이지로 이동
    };

    window.addEventListener("popstate", handlePopState);

    // 언마운트 시 destroy 및 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("popstate", handlePopState);
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
