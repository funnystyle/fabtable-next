import $ from "jquery";

export const handleKeyDown = (e, data) => {

  // ctrl + a
  if ((e.ctrlKey || e.metaKey) && e.key === "a") {
    e.preventDefault();
    data.table.rows().select(); // 모든 행 선택
    // 이전 선택행은 제일 첫번째
    // 아래코드로 맞추기 위해 dom으로 설정
    data.prevSelectedRow.current = data.table.row(0).node();
  }

  // esc
  if (e.key === 'Escape' || e.key === 'Esc') {
    data.table.rows().deselect(); // 모든 행 선택 해제
    data.prevSelectedRow.current = null;
  }

  // ctrl
  if (e.ctrlKey || e.metaKey) data.isCtrlPressed.current = true;

  // shift
  if (e.shiftKey) data.isShiftPressed.current = true;

  const isArrowUp = e.key === "ArrowUp";
  const isArrowDown = e.key === "ArrowDown";

  // 위/아래 방향키 처리
  if (isArrowUp || isArrowDown) {
    e.preventDefault();

    const selectedRowsIndexes = data.table.rows({ selected: true }).indexes().toArray();

    // 선택된 행이 없을 경우 첫 번째 행 선택
    if (selectedRowsIndexes.length === 0) {
      const firstIndex = 0;
      data.table.row(firstIndex).select();
      data.prevSelectedRow.current = data.table.row(firstIndex).node();
      return;
    }

    // 현재 선택된 행의 인덱스 가져오기
    const currentIndex = $(data.prevSelectedRow.current).index();
    const nextIndex = isArrowUp ? currentIndex - 1 : currentIndex + 1;

    // 인덱스 범위 검사
    if (nextIndex < 0 || nextIndex >= data.table.rows().count()) return;

    // Shift가 눌리지 않은 경우: 기존 선택 해제 후 새로운 행 선택
    if (!e.shiftKey) {
      data.table.rows().deselect();
      data.table.row(nextIndex).select();
      data.prevSelectedRow.current = data.table.row(nextIndex).node();
      return;
    }

    // Shift가 눌린 경우: 연속적인 선택/해제 처리
    if (data.prevSelectedRow.current) {
      const isSelected = data.table.row(nextIndex).node().classList.contains("selected");
      if (!isSelected) {
        data.table.row(nextIndex).select();
      } else {
        data.table.row(currentIndex).deselect();
      }
      data.prevSelectedRow.current = data.table.row(nextIndex).node();
    }
  }
};

export const handleKeyUp = (e, data) => {
  if (!e.ctrlKey && !e.metaKey) data.isCtrlPressed.current = false;
  if (!e.shiftKey) data.isShiftPressed.current = false;
};

export const handleMouseDownOutside = (e, data) => {
  if (!data.containerRef.current.contains(e.target)) {
    e.preventDefault(); // 기본 동작 방지
    data.table.rows({ selected: true }).deselect(); // 선택 해제
    data.prevSelectedRow.current = null;
  }
}

/**
 * 테이블 재생성 이벤트
 *
 * 1. 이전 선택된 행 초기화
 *
 * @param prevSelectedRow
 */
export const handleDraw = (e, data) => {
  data.prevSelectedRow.current = null;
}

/**
 * 마우스 클릭 이벤트
 *
 * 1. 마우스 오른쪽 버튼 클릭 시, 선택된 행이 없다면 현재 행을 선택
 * 2. 마우스 왼쪽 버튼 클릭 시, 컨트롤이 눌려있지 않다면 다른 행들 선택 해제 후 현재 행을 선택
 * 3. 마우스 왼쪽 버튼 클릭 시, 시작줄이 설정되어 있지 않거나 shift를 누른 상태가 아니라면 현재 행을 기준행으로 설정
 * 4. 마우스 왼쪽 버튼 클릭 시, shift를 누른 상태라면 기준행부터 현재 행까지 선택
 * 5. 마우스 왼쪽 버튼 클릭 시, ctrl을 누른 상태라면 현재 행을 선택/해제
 *
 */
export const handleMouseDown = (e, data) => {

  e.preventDefault(); // 기본 동작 방지
  const target = e.currentTarget;
  if (e.button !== 0) {
    const selectedRowsIndexes = data.table.rows({ selected: true }).indexes().toArray();
    const clickedRowIndex = data.table.row($(e.target).closest('tr')).index();
    // 선택된게 없다면 현재 행을 선택
    if (!selectedRowsIndexes.includes(clickedRowIndex)) {
      data.table.rows().deselect();
      data.table.row(target).select();
    }

    return;
  }

  if (!data.isCtrlPressed.current) {
    data.table.rows().deselect(); // Ctrl 키가 눌리지 않았으면 기존 선택 해제
  }


  if (!data.isShiftPressed.current || data.prevSelectedRow.current == null) {
    data.prevSelectedRow.current = target; // 이전 선택 행 저장
  }

  data.isDragging.current = true; // 드래그 시작
  data.dragStartRow.current = data.table.row(target).index(); // 드래그 시작 행의 인덱스를 저장
  data.dragBeforeSelectedIndexes.current = data.table.rows({ selected: true }).indexes().toArray(); // 드래그 이전 선택된 행의 인덱스를 저장

  // Ctrl 키가 눌렸고, 현재행이 선택된 상태라면 선택 해제
  if (data.isCtrlPressed.current && data.table.row(target).selected()) {
    data.table.row(target).deselect(); // Ctrl 키가 눌렸고 이미 선택된 행을 다시 클릭하면 선택 해제
    data.prevSelectedRow.current = null;
    data.dragIsSelecting.current = false;
  } else {
    data.table.row(target).select(); // 현재 행 선택
    data.dragIsSelecting.current = true;
  }

  if (data.isShiftPressed.current && data.prevSelectedRow.current) {
    const start = Math.min(data.dragStartRow.current, data.table.row(data.prevSelectedRow.current).index());
    const end = Math.max(data.dragStartRow.current, data.table.row(data.prevSelectedRow.current).index());

    for (let i = start; i <= end; i++) {
      data.table.row(i).select(); // 시작 행부터 끝 행까지 선택
    }
  }
}

/**
 * 드래그 이동 시
 * 1. 선택 드래그일 때 드래그를 모두 선택
 * 2. 선택 해제 드래그일 때 드래그를 모두 선택 해제
 */
export const handleMouseOver = (e, data) => {
  if (data.isDragging.current) {
    const target = e.currentTarget;
    const endRow = data.table.row(target).index();
    const start = Math.min(data.dragStartRow.current, endRow);
    const end = Math.max(data.dragStartRow.current, endRow);

    // 1. 모두 선택 해제
    data.table.rows().deselect();

    // 2. 기존 선택되어있던거 모두 선택
    data.dragBeforeSelectedIndexes.current.forEach((index) => {
      data.table.row(index).select();
    });

    // 3. 드래그 중인 행 선택
    for (let i = start; i <= end; i++) {
      if (data.dragIsSelecting.current) {
        data.table.row(i).select(); // 시작 행부터 끝 행까지 선택
      } else {
        data.table.row(i).deselect(); // 시작 행부터 끝 행까지 선택 해제
      }
    }
  }
}

/**
 * 드래그 종료
 *
 * @param e
 * @param data.isDragging
 */
export const handleMouseUp = (e, data) => {
  data.isDragging.current = false; // 드래그 종료
}

export const getEventWrapper = (eventData) => {
  const handleKeyDownWrapper = (e) => handleKeyDown(e, eventData);
  const handleKeyUpWrapper = (e) => handleKeyUp(e, eventData);
  const handleMouseDownOutsideWrapper = (e) => handleMouseDownOutside(e, eventData);
  const handleDrawWrapper = (e) => handleDraw(e, eventData);
  const handleMouseUpWrapper = (e) => handleMouseUp(e, eventData);
  const handleMouseDownWrapper = (e) => handleMouseDown(e, eventData);
  const handleMouseOverWrapper = (e) => handleMouseOver(e, eventData);

  return {
    handleKeyDownWrapper,
    handleKeyUpWrapper,
    handleMouseDownOutsideWrapper,
    handleDrawWrapper,
    handleMouseUpWrapper,
    handleMouseDownWrapper,
    handleMouseOverWrapper
  }
}