import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-colreorder";
import "datatables.net-buttons";
import "datatables.net-buttons-dt";
import "datatables.net-responsive-dt";
import "datatables.net-buttons/js/buttons.colVis";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.min.css";
import "datatables.net-colreorder-dt/css/colReorder.dataTables.min.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-select";
import "datatables.net-select-dt/css/select.dataTables.min.css";
import { createDataTablesOptions } from "@components/DataTableOptions";
import { useRouter } from "next/router";
import ContextMenu from "@components/ContextMenu";
import { contextMenuOptions } from "@components/ContextMenuOption";
import { getEventWrapper, handleDraw, handleKeyDown, handleKeyUp, handleMouseDown, handleMouseDownOutside, handleMouseOver, handleMouseUp } from "@components/DataTablesMouseEvent";
import { handlePopState, popStatePush } from "@components/PopState";
import DataTablesHeader from "@components/DataTablesHeader";

const DataTables = ({ header, columns, data, url, page }) => {

  const tableRef = useRef(null);
  const containerRef = useRef(null); // 테이블 컨테이너를 참조하기 위한 변수
  const router = useRouter();

  const currentPage = useRef(null);

  // Ctrl 키 상태와 드래그 상태를 추적하기 위한 변수들
  const isCtrlPressed = useRef(false);
  const isShiftPressed = useRef(false);
  const isDragging = useRef(false);
  const dragStartRow = useRef(null);
  const prevSelectedRow = useRef(null);
  const dragIsSelecting = useRef(true);
  const dragBeforeSelectedIndexes = useRef([]);

  //
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    const { clientX: x, clientY: y } = event;

    setMenuPosition({ x, y });
    setMenuVisible(true);
  };


  useEffect(() => {

    console.log("DataTables useEffect");

    // 테이블 생성
    const dataTableOptions = createDataTablesOptions(header, columns, data, url, page);
    const table = $(tableRef.current).DataTable(dataTableOptions);

    // 페이지 변경 시 뒤로 가기 하도록
    const handlePopStatePushWrapper = popStatePush(table, currentPage, router);
    const handlePopStateWrapper = handlePopState(table, window);
    table.on("draw", handlePopStatePushWrapper);
    window.addEventListener("popstate", handlePopStateWrapper);

    // 테이블 이벤트
    const eventData = { table, tableRef, containerRef, isCtrlPressed, isShiftPressed, isDragging, dragIsSelecting, prevSelectedRow, dragStartRow, dragBeforeSelectedIndexes };
    const { handleKeyDownWrapper, handleKeyUpWrapper, handleMouseDownOutsideWrapper, handleDrawWrapper, handleMouseUpWrapper, handleMouseDownWrapper, handleMouseOverWrapper } = getEventWrapper(eventData);

    document.addEventListener("keydown", handleKeyDownWrapper);
    document.addEventListener("keyup", handleKeyUpWrapper);
    document.addEventListener("mousedown", handleMouseDownOutsideWrapper);
    document.addEventListener("contextmenu", handleContextMenu);
    $(tableRef.current).on("mousedown", "tr", handleMouseDownWrapper);
    $(tableRef.current).on("mouseover", "tr", handleMouseOverWrapper);
    table.on("draw", handleDrawWrapper); // draw 이벤트 핸들러 등록
    $(document).on("mouseup", handleMouseUpWrapper);

    // 테이블 헤더와 컬럼 순서를 로컬 스토리지에 저장하는 함수
    const saveTableState = () => {
      console.log("saveTableState");
      const trList = $(tableRef.current).find("thead tr");
      const newHeader = [];
      const newColumns = [];

      trList.each((i, tr) => {
        const newTr = [];
        let count = 0;

        $(tr).find("th").each((j, th) => {
          count += th.colSpan;
          const newTh = { title: th.innerText, colspan: th.colSpan, rowspan: th.rowSpan };
          newTr.push(newTh);

          if ($(th).data("dt-order") !== 'disable') {
            newColumns.forEach((column, k) => {
              if (column.count === count) {
                count++;
              }
            });
            newColumns.push({ title: th.innerText, count });
          }
        });

        newHeader.push(newTr);
      });

      newColumns.forEach((newColumn) => {
        columns.forEach((column) => {
          if (newColumn.title === column.title) {
            newColumn.data = column.data;
          }
        });
      });

      // newColumns을 count 기준으로 정렬
      newColumns.sort((a, b) => a.count - b.count);

      // 로컬 스토리지에 저장
      localStorage.setItem('tableHeader', JSON.stringify(newHeader));
      localStorage.setItem('tableColumns', JSON.stringify(newColumns));
    };

    // ColReorder 완료 후 열 순서 저장
    table.on('columns-reordered', saveTableState);
    // 언마운트 시 destroy 및 이벤트 핸들러 제거
    return () => {
      // 이벤트 리스너 제거
      document.removeEventListener("keydown", handleKeyDownWrapper);
      document.removeEventListener("keyup", handleKeyUpWrapper);
      document.removeEventListener("mousedown", handleMouseDownOutsideWrapper);
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("popstate", handlePopStateWrapper);
      $(tableRef.current).off("mousedown", "tr", handleMouseDownWrapper);
      $(tableRef.current).off("mouseover", "tr", handleMouseOverWrapper);
      table.off("draw", handleDrawWrapper);
      table.off("draw", handlePopStatePushWrapper);
      table.off('columns-reordered', saveTableState);
      $(document).off("mouseup", handleMouseUpWrapper);

      table.destroy();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <table ref={tableRef} style={{ width: "100%" }}>
        {header && (
          <DataTablesHeader header={header} columns={columns} />
        )}
      </table>
      {isMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          position={menuPosition}
          onClose={handleCloseMenu}
          isSubmenu={false}
        />
      )}
    </div>
  );
};

export default DataTables;
