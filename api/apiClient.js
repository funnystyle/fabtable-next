import axios from "axios";
import qs from "qs";
import { getAccessToken} from "@lib/UserInfo";
import { LOCAL_STORAGE_FABTABLE_USERINFO } from "@/lib/Constant";

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`, // 환경 변수를 baseURL로 사용
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }

  // 히스토리 기록 요청
  // if(getBranchUuid() != null){
  //   await logHistory(config);
  // }

  return config;
}, (error) => {
    return Promise.reject(error);
});

// TODO: 아래 코드는 필요 없으면 안해도 됩니다.
// 응답 인터셉터 추가 (에러 응답에 대해서도 히스토리 기록 요청 가능)
// apiClient.interceptors.response.use(
//   response => response,
//   async (error) => {
//       // 여기에 에러 기록 로직 추가 가능
//       await logHistory(error.config, true);
//       return Promise.reject(error);
//   }
// );

// key를 인자로 받아 query string 또는 request body에서 값을 추출하는 함수
const getValueByKey = (config, key) => {
  // query string에서 key 추출
  const url = new URL(config.url, window.location.origin);
  const queryParams = new URLSearchParams(url.search);
  const valueFromQuery = queryParams.get(key);

  // request body에서 key 추출
  let valueFromBody = null;
  if (config.data) {
      try {
          const requestBody = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
          valueFromBody = requestBody[key] || null;
      } catch (error) {
          console.error('Failed to parse request body:', error);
      }
  }

  // query string 또는 request body에서 key를 추출
  return valueFromQuery || valueFromBody;
};

/**
 * @description 히스토리 기록을 위한 요청을 보내는 함수입니다.
 * @param {object} config - Axios 요청 설정 객체입니다.
 * @param {boolean} [isError=false] - 에러 발생 여부를 나타냅니다.
 */
// const logHistory = async (config, isError = false) => {
//   const historyData = {
//       host: `${location.protocol}//${location.host}`,
//       branchUuid: getBranchUuid(),
//       referer: document.referrer,
//       menu: '', // TODO: 메뉴 정보 추가 필요
//       userUuid: getUserUuid(),
//       userId: getUserId(),
//       page: window.location.pathname,
//       action: isError ? 'ERROR' : getAction(config.method),
//       cookie: document.cookie,
//       bannerUuid: getValueByKey(config, 'bannerUuid'),
//       brandUuid: getValueByKey(config, 'brandUuid'),
//       storeUuid: getValueByKey(config, 'storeUuid'),
//   };

//   console.log('히스토리 기록 요청:', historyData);
//   // try {
//   //     const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/hvm/v1/common/history`, historyData);
//   //     if (response.data.result === "SUCCESS") {
//   //         console.log('히스토리 기록 성공:', response.data);
//   //     }
//   // } catch (error) {
//   //     console.error('히스토리 기록 중 오류 발생:', error);
//   // }
// };

/**
 * @description 요청 메소드에 따른 액션을 반환합니다.
 * @param {string} method - 요청 메소드 (get, post, put, delete 등)
 * @returns {string} - 액션 문자열 (GET, POST, PUT, DELETE)
 */
const getAction = (method) => {
  switch (method.toLowerCase()) {
      case 'get': return 'GET';
      case 'post': return 'POST';
      case 'put': return 'PUT';
      case 'delete': return 'DELETE';
      default: return 'UNKNOWN';
  }
};

/**
 * @description URL 파라미터를 쿼리 문자열로 변환합니다.
 * @param {object} data - 쿼리 문자열로 변환할 데이터를 포함하는 객체입니다.
 * @returns {string} - 쿼리 문자열
 */
const toQueryString = (data) => {
  if (typeof data === "object" && Object.keys(data).length > 0) {
      return "?" + new URLSearchParams(data).toString();
  }
  return "";
};

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};
/**
 * @description axios를 사용하여 API를 호출하는 함수입니다.
 * @param {string} url - API 주소를 입력합니다.
 * @param {object} data - 추가적인 데이터를 입력합니다.
 * @returns {Promise<any>} API 호출 결과를 반환합니다.
 */
export const getAxios = async (url, data) => {
  const queryString = toQueryString(data);

  try {
    const response = await apiClient.get(url + queryString);
    var tmp = JSON.stringify(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error); // 에러 처리 함수 호출
  }
};

/**
 * @description axios를 사용하여 POST 요청을 보내는 함수입니다.
 * @param {string} url - API 주소를 입력합니다.
 * @param {object} data - 요청 바디에 포함될 데이터를 입력합니다.
 * @returns {Promise<any>} API 호출 결과를 반환합니다.
 */
export const postAxios = async (url, data, fileYn) => {
  let config = {
    headers: {} // headers 속성 미리 추가
  };
  if (fileYn) {
    config.headers["Content-Type"] = "multipart/form-data";
  }


  console.log("postAxios", url, data, config)
  try {
    const response = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    handleApiError(error); // 에러 처리 함수 호출
  }
};

/**
 * @description axios를 사용하여 POST 요청을 보내는 함수입니다.
 * @param {string} url - API 주소를 입력합니다.
 * @param {object} data - 요청 바디에 포함될 데이터를 입력합니다.
 * @returns {Promise<any>} API 호출 결과를 반환합니다.
 */
export const postBlobAxios = async (url, data, fileYn) => {
  let config = {
    headers: {},
    responseType: "blob", // 응답을 Blob으로 받도록 설정
  };

  if (fileYn) {
    config.headers["Content-Type"] = "multipart/form-data";
    //{ responseType: "blob" }
    config.responseType = "blob";
  }

  try {
    const response = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    handleApiError(error); // 에러 처리 함수 호출
  }
};

/**
 * @description axios를 사용하여 PUT 요청을 보내는 함수입니다.
 * @param {string} url - API 주소를 입력합니다.
 * @param {object} data - 요청 바디에 포함될 데이터를 입력합니다.
 * @returns {Promise<any>} API 호출 결과를 반환합니다.
 */
export const putAxios = async (url, data) => {
  try {
    const response = await apiClient.put(url, data);
    return response.data;
  } catch (error) {
    handleApiError(error); // 에러 처리 함수 호출
  }
};

/**
 * @description axios를 사용하여 DELETE 요청을 보내는 함수입니다.
 * @param {string} url - API 주소를 입력합니다.
 * @param {object} data - 요청 바디에 포함될 데이터를 입력합니다.
 * @returns {Promise<any>} API 호출 결과를 반환합니다.
 */
export const deleteAxios = async (url, data) => {
  const queryString = toQueryString(data);

  try {
      const response = await apiClient.delete(url + queryString);
      return response.data;
  } catch (error) {
      handleApiError(error); // 에러 처리 함수 호출
    return error;
  }
};

// 에러 처리 함수
export const handleApiError = (error) => {
  // 에러가 response를 가지고 있을 경우 상태 코드 확인
  const status = error ? error.status : null;

  switch (status) {
    case 401:
      console.log('401 에러 - 인증 실패');
      break;

    case 403:
      console.log('403 에러 - 권한 없음');
      // alert('권한이 없습니다.');
      break;

    case 404:
      console.log('404 에러 - 페이지 찾을 수 없음');
      // alert('요청한 페이지를 찾을 수 없습니다.');
      break;

    case 500:
      console.log('500 에러 - 서버 오류');
      // alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
      break;

    default:
      console.error('API 요청 중 오류 발생:', error);
      // alert('요청 처리 중 오류가 발생했습니다.');
      break;
  }

  // 에러를 다시 throw해서 다음 catch에서 사용할 수 있도록 처리
  throw error;
};

export default apiClient;