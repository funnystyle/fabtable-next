import { useState } from 'react';
import axios from 'axios';

const ExcelUploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 파일 업로드 및 API 호출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // API 호출
      const response = await axios.post('http://localhost:8991/api/v1/user/excel/substitute', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // 파일 다운로드를 위한 설정
      });

      // 응답 데이터는 파일이므로, 브라우저에서 다운로드 처리
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'updated-file.xlsx'); // 다운로드될 파일 이름
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('파일 처리 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Excel 파일 업로드 및 텍스트 대체</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? '처리 중...' : '파일 업로드 및 대체'}
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default ExcelUploadPage;
