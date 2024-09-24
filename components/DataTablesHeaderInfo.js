import $ from "jquery";

export const saveTableHeaderState = (tableRef, columns) => {
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
  if (columns.length === newColumns.length) {
    localStorage.setItem('tableHeader', JSON.stringify(newHeader));
    localStorage.setItem('tableColumns', JSON.stringify(newColumns));
  }

  return {
    header: newHeader,
    columns: newColumns
  }
};