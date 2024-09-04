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

const DataTables = ({ columns, data, url, page }) => {
  const tableRef = useRef(null);
  const containerRef = useRef(null); // 테이블 컨테이너를 참조하기 위한 변수
  const router = useRouter();

  // Ctrl 키 상태와 드래그 상태를 추적하기 위한 변수들
  const isCtrlPressed = useRef(false);
  const isShiftPressed = useRef(false);
  const isDragging = useRef(false);
  const dragStartRow = useRef(null);
  const prevSelectedRow = useRef(null);
  const dragIsSelecting = useRef(true);

  // table 구현 및 페이지 별 뒤로가기 적용
  useEffect(() => {
    const dataTableOptions = createDataTablesOptions(columns, data, url, page);
    const table = $(tableRef.current).DataTable(dataTableOptions);

    let currentPage = null;

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

    // ########################################################
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) isCtrlPressed.current = true;
      if (e.shiftKey) isShiftPressed.current = true;
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        table.rows().select(); // 모든 행 선택
        // 이전 선택행은 제일 첫번째
        // 아래코드로 맞추기 위해 dom으로 설정
        prevSelectedRow.current = table.row(0).node();
      }
      // ESC 키가 눌렸을 때
      if (e.key === 'Escape' || e.key === 'Esc') {
        table.rows().deselect(); // 모든 행 선택 해제
        prevSelectedRow.current = null;
      }

      const isArrowUp = e.key === "ArrowUp";
      const isArrowDown = e.key === "ArrowDown";

      // 위/아래 방향키 처리
      if (isArrowUp || isArrowDown) {
        e.preventDefault();

        const selectedRowsIndexes = table.rows({ selected: true }).indexes().toArray();

        // 선택된 행이 없을 경우 첫 번째 행 선택
        if (selectedRowsIndexes.length === 0) {
          const firstIndex = 0;
          table.row(firstIndex).select();
          prevSelectedRow.current = table.row(firstIndex).node();
          return;
        }

        // 현재 선택된 행의 인덱스 가져오기
        const currentIndex = $(prevSelectedRow.current).index();
        const nextIndex = isArrowUp ? currentIndex - 1 : currentIndex + 1;

        // 인덱스 범위 검사
        if (nextIndex < 0 || nextIndex >= table.rows().count()) return;

        // Shift가 눌리지 않은 경우: 기존 선택 해제 후 새로운 행 선택
        if (!e.shiftKey) {
          table.rows().deselect();
          table.row(nextIndex).select();
          prevSelectedRow.current = table.row(nextIndex).node();
          return;
        }

        // Shift가 눌린 경우: 연속적인 선택/해제 처리
        if (prevSelectedRow.current) {
          const isSelected = table.row(nextIndex).node().classList.contains("selected");
          if (!isSelected) {
            table.row(nextIndex).select();
          } else {
            table.row(currentIndex).deselect();
          }
          prevSelectedRow.current = table.row(nextIndex).node();
        }
      }
    };

    const handleKeyUp = (e) => {
      if (!e.ctrlKey && !e.metaKey) isCtrlPressed.current = false;
      if (!e.shiftKey) isShiftPressed.current = false;
    };
    const handleMouseDown = (e) => {
      // 클릭한 영역이 테이블 바깥인지 확인
      if (!containerRef.current.contains(e.target)) {
        table.rows({ selected: true }).deselect(); // 선택 해제
        prevSelectedRow.current = null;
      }
    };
    const handleContextMenu = (e) => {
      e.preventDefault(); // 기본 동작 방지
    };
    // 선택 후 alert 표시
    const handleDraw = () => {
      prevSelectedRow.current = null;
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("contextmenu", handleContextMenu);
    table.on('draw', handleDraw); // draw 이벤트 핸들러 등록
    // ########################################################

    // ########################################################
    // 테이블의 행 클릭 및 드래그 이벤트 핸들러
    $(tableRef.current).on("mousedown", "tr", function (e) {
      console.log("shift current", isShiftPressed.current);
      console.log("prevSelectedRow", prevSelectedRow.current);
      e.preventDefault(); // 기본 동작 방지
      if (e.button !== 0) {
        const selectedRowsIndexes = table.rows({ selected: true }).indexes().toArray();
        const clickedRowIndex = table.row($(e.target).closest('tr')).index();
        // 선택된게 없다면 현재 행을 선택
        if (!selectedRowsIndexes.includes(clickedRowIndex)) {
          table.rows().deselect();
          table.row(this).select();
        }

        // 선택된 행들 중 우클릭한 행과 동일한 인덱스가 있는지 확인
        const alertString = table.rows({ selected: true }).data().toArray().map((row) => row.name).join(", ");
        console.log(alertString);

        return;
      }

      if (!isCtrlPressed.current) {
        table.rows().deselect(); // Ctrl 키가 눌리지 않았으면 기존 선택 해제
      }


      if (!isShiftPressed.current || prevSelectedRow.current == null) {
        prevSelectedRow.current = this; // 이전 선택 행 저장
        console.log("prevSelectedRow save!!!!");
      }

      isDragging.current = true; // 드래그 시작
      dragStartRow.current = table.row(this).index(); // 드래그 시작 행의 인덱스를 저장

      // Ctrl 키가 눌렸고, 현재행이 선택된 상태라면 선택 해제
      if (isCtrlPressed.current && table.row(this).selected()) {
        table.row(this).deselect(); // Ctrl 키가 눌렸고 이미 선택된 행을 다시 클릭하면 선택 해제
        prevSelectedRow.current = null;
        dragIsSelecting.current = false;
      } else {
        table.row(this).select(); // 현재 행 선택
        dragIsSelecting.current = true;
      }

      if (isShiftPressed.current && prevSelectedRow.current) {
        const start = Math.min(dragStartRow.current, table.row(prevSelectedRow.current).index());
        const end = Math.max(dragStartRow.current, table.row(prevSelectedRow.current).index());

        for (let i = start; i <= end; i++) {
          table.row(i).select(); // 시작 행부터 끝 행까지 선택
        }
      }

    });

    // 마우스가 다른 행으로 이동할 때 선택 범위를 확장
    $(tableRef.current).on("mouseover", "tr", function () {
      if (isDragging.current) {
        const endRow = table.row(this).index(); // 현재 마우스가 위치한 행의 인덱스
        const start = Math.min(dragStartRow.current, endRow);
        const end = Math.max(dragStartRow.current, endRow);

        // table.rows({ selected: true }).deselect(); // 모든 선택 해제

        for (let i = start; i <= end; i++) {
          if (dragIsSelecting.current) {
            table.row(i).select(); // 시작 행부터 끝 행까지 선택
          } else {
            table.row(i).deselect(); // 시작 행부터 끝 행까지 선택 해제
          }
        }
      }
    });

    // 드래그 종료 시점에 호출
    $(document).on("mouseup", function () {
      isDragging.current = false; // 드래그 종료
    });
    // ########################################################

    // 언마운트 시 destroy 및 이벤트 핸들러 제거
    return () => {
      // 이벤트 리스너 제거
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      $(document).off("mouseup");
      $(tableRef.current).off("mousedown mouseover");
      table.off('draw', handleDraw); // draw 이벤트 핸들러 제거

      window.removeEventListener("popstate", handlePopState);
      table.destroy();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <table ref={tableRef} style={{ width: "100%" }}></table>
    </div>
  );
};

export default DataTables;
