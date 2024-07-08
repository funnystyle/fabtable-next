// apiClient.js (예시에서는 Axios를 사용하는 예시)
import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1`, // 환경 변수를 baseURL로 사용
  // baseURL: `http://localhost:8991/api/v1`, // 환경 변수를 baseURL로 사용
});

export default apiClient;
