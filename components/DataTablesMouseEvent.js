export const handleKeyDown = (e, table, isCtrlPressed, isShiftPressed, prevSelectedRow) => {

  // ctrl + a
  if ((e.ctrlKey || e.metaKey) && e.key === "a") {
    e.preventDefault();
    table.rows().select(); // 모든 행 선택
    // 이전 선택행은 제일 첫번째
    // 아래코드로 맞추기 위해 dom으로 설정
    prevSelectedRow.current = table.row(0).node();
  }

  // esc
  if (e.key === 'Escape' || e.key === 'Esc') {
    table.rows().deselect(); // 모든 행 선택 해제
    prevSelectedRow.current = null;
  }

  // ctrl
  if (e.ctrlKey || e.metaKey) isCtrlPressed.current = true;

  // shift
  if (e.shiftKey) isShiftPressed.current = true;

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

export const handleKeyUp = (e, isCtrlPressed, isShiftPressed) => {
  if (!e.ctrlKey && !e.metaKey) isCtrlPressed.current = false;
  if (!e.shiftKey) isShiftPressed.current = false;
};

// 선택 후 alert 표시
export const handleDraw = (prevSelectedRow) => {
  prevSelectedRow.current = null;
};

export const handleMouseDownOutside = (e, table, containerRef, prevSelectedRow) => {
  e.preventDefault(); // 기본 동작 방지
  if (!containerRef.current.contains(e.target)) {
    table.rows({ selected: true }).deselect(); // 선택 해제
    prevSelectedRow.current = null;
  }
}

export const handleMouseDown = (e, table, containerRef, isCtrlPressed, isShiftPressed, isDragging, dragIsSelecting, prevSelectedRow, dragStartRow) => {
  e.preventDefault(); // 기본 동작 방지

  if (e.button !== 0) {
    const selectedRowsIndexes = table.rows({ selected: true }).indexes().toArray();
    const clickedRowIndex = table.row($(e.target).closest('tr')).index();
    // 선택된게 없다면 현재 행을 선택
    if (!selectedRowsIndexes.includes(clickedRowIndex)) {
      table.rows().deselect();
      table.row(this).select();
    }

    const alertString = table.rows({ selected: true }).data().toArray().map((row) => row.name).join(", ");
    console.log(alertString);
    // 우클릭한 row의 컨텍스트 메뉴 활성화
    // contextMenu.show(e.clientX, e.clientY);
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
}

// 마우스가 다른 행으로 이동할 때 선택 범위를 확장
export const handleMouseOver = (e, table, isDragging, dragIsSelecting, dragStartRow) => {
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
}
// 드래그 종료 시점에 호출
export const handleMouseUp = (e, isDragging) => {
  isDragging.current = false; // 드래그 종료
}