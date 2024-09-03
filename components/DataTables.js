import { useEffect, useMemo, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import { createDataTablesOptions } from "@components/DataTableOptions";

const DataTables = ({ columns, data, url, page }) => {

  const dataTableOptions = useMemo(
    () => createDataTablesOptions(columns, data, url, page),
    [columns, data, url, page]
  );
  const tableRef = useRef();

  useEffect(() => {

    const table = $(tableRef.current).DataTable(dataTableOptions);

    // *** 추가된 부분 시작 ***
    let pushState = true;

    // 페이지 버튼 클릭 핸들러
    const handlePageClick = (e) => {
      if (pushState) {
        let page = $(e.target).text();
        if (isNaN(+page)) {
          if (page === '이전') {
            page = +$(e.target).closest('nav').find("button.current").text() - 1;
          } else if (page === '다음') {
            page = +$(e.target).closest('nav').find("button.current").text() + 1;
          }
        }

        let url = '';
        const querystring = window.location.search;

        if (querystring === '') {
          url = `?page=${page}`;
        } else {
          let queries = querystring.substring(1).split("&"); // Remove '?' at the start
          queries = queries.map(q => {
            if (q.startsWith("page=")) return `page=${page}`;
            else return q;
          });
          // Ensure only one 'page' parameter exists
          const pageExists = queries.some(q => q.startsWith("page="));
          if (!pageExists) {
            queries.push(`page=${page}`);
          }
          url = `?${queries.join("&")}`;
        }

        window.history.pushState('', '', url);
      }
      pushState = true;
    };

    // 클릭 이벤트 바인딩
    $(document).on('click', 'button.dt-paging-button', handlePageClick);

    // popstate 이벤트 핸들러
    const handlePopState = () => {
      let page = 1;
      const querystring = window.location.search;
      const queries = querystring.substring(1).split("&"); // Remove '?' at the start
      queries.forEach(q => {
        if (q.startsWith("page=")) {
          const p = q.split("=")[1];
          if (p) page = parseInt(p, 10);
        }
      });

      pushState = false;
      table.page(page - 1).draw(false); // DataTable에서 특정 페이지로 이동
    };

    window.addEventListener('popstate', handlePopState);

    // *** 추가된 부분 끝 ***

    // 언마운트 시 destroy 및 이벤트 핸들러 제거
    return () => {
      // *** 추가된 부분 정리 ***
      $(document).off('click', 'button.dt-paging-button', handlePageClick);
      window.removeEventListener('popstate', handlePopState);
      // *** 추가된 부분 끝 ***
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
