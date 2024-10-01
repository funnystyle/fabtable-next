export const ExcelUpload = ({ uploadUrl }) => {
  const text = 'Upload Excel File';

  return {
    text: text,
    action: function (e, dt, button, config) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.xlsx, .xls';

      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
          alert('파일을 선택해 주세요.');
          return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            alert('파일 업로드 성공!');
            console.log('파일 업로드 성공:', response)
          } else {
            alert('파일 업로드 실패.');
          }
        } catch (error) {
          console.error('업로드 중 오류 발생:', error);
          alert('업로드 중 오류가 발생했습니다.');
        }
      };

      // 파일 선택 창 열기
      input.click();
    }
  };
};
