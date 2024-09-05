
export const ExcelDownload = ({ columns, data, downloadUrl, allRows, allColumns }) => {

  const text = allRows && allColumns ? 'Download All' : (allRows ? 'Download All Rows Selected Columns' : (allColumns ? 'Download Selected Rows All Columns' : 'Download Selected Rows Selected Columns'));

  return {
      text: text,
      action: function (e, dt, button, config) {
      // 선택된 열 정보 가져오기
      const selectedColumns = dt.columns(':visible').indexes().toArray();
      const selectedRows = dt.rows({ selected: true }).indexes().toArray();

      // 서버에 보낼 데이터 구성
      const requestData = {
        allColumnNames: columns.map(column => column.name), // 전체 열 이름
        columns: selectedColumns.map(index => dt.settings().init().columns[index].data), // 선택된 열의 data 속성
        search: {value:dt.search()},
        order: dt.order().map(([index, dir]) => ({
          columns: index,
          name: columns[index].name,
          dir: dir
        })),
        length: dt.page.len(), // 페이지 크기
        start: dt.page.info().start, // 현재 페이지 시작 인덱스
        allRows,
        allColumns,
        selectedRows
      };

      console.log('Excel download request data:', requestData)

      // 서버로 엑셀 다운로드 요청 보내기
      fetch(downloadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
        })
          .then(response => response.blob()) // 응답을 blob으로 변환
          .then(blob => {
            // 다운로드를 위해 링크 생성 후 클릭 이벤트 트리거
            const link = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            link.href = url;
            link.download = 'data.xlsx'; // 다운로드 파일 이름
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // URL 객체 해제
          })
          .catch(error => {
            console.error('Excel download failed:', error);
          });
      }
  }
}
