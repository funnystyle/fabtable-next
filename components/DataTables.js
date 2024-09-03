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

  const isFirstButton = (target) => {
    return $(target).data("dt-idx") === "first";
  };

  const isPrevButton = (target) => {
    return $(target).data("dt-idx") === "previous";
  };

  const isNextButton = (target) => {
    return $(target).data("dt-idx") === "next";
  };

  const isLastButton = (target) => {
    return $(target).data("dt-idx") === "last";
  };

  const getCurrentPage = (target) => {
    return +$(target).closest("nav").find("button.current").text();
  };

  const getButtonPage = (target) => {
    return +$(target).data("dt-idx") + 1;
  };

  const getClickedPage = (target, table) => {
    const currentPage = getCurrentPage(target);

    if (isFirstButton(target)) return 1;
    if (isNextButton(target)) return currentPage + 1;
    if (isPrevButton(target)) return currentPage - 1;
    if (isLastButton(target)) return table.page.info().pages;
    return getButtonPage(target);
  };

  useEffect(() => {
    const table = $(tableRef.current).DataTable(dataTableOptions);

    // 페이지 버튼 클릭 핸들러
    const handlePageClick = (e) => {
      const clickedPage = getClickedPage(e.target, table);

      const params = new URLSearchParams(window.location.search);
      params.set("page", clickedPage);
      const newUrl = `?${params.toString()}`;
      window.history.pushState("", "", newUrl);
    };

    // 클릭 이벤트 바인딩
    $(document).on("click", "button.dt-paging-button", handlePageClick);

    // popstate 이벤트 핸들러
    const handlePopState = () => {
      let page = 1;
      const querystring = window.location.search;
      const queries = querystring.substring(1).split("&"); // Remove '?' at the start
      queries.forEach((q) => {
        if (q.startsWith("page=")) {
          const p = q.split("=")[1];
          if (p) page = parseInt(p, 10);
        }
      });

      table.page(page - 1).draw(false); // DataTable에서 특정 페이지로 이동
    };

    window.addEventListener("popstate", handlePopState);

    // 언마운트 시 destroy 및 이벤트 핸들러 제거
    return () => {
      $(document).off("click", "button.dt-paging-button", handlePageClick);
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
