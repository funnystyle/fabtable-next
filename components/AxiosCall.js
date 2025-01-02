import axios from "axios";
// import * as SecureStore from "expo-secure-store";
import * as qs from "qs";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

console.log("API_BASE_URL", API_BASE_URL);

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
  // const token = await getToken(); // 토큰을 가져오는 함수를 호출합니다.

  let queryString = "";
  if (typeof data === "object" && Object.keys(data).length > 0) {
    queryString = "?" + axios.defaults.paramsSerializer(data);
  }

  console.log("url", API_BASE_URL + url + queryString);

  try {
    const response = await axios.get(API_BASE_URL + url + queryString, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description axios를 사용하여 POST 요청을 보내는 함수입니다.
 * @param {string} url - API 주소를 입력합니다.
 * @param {object} data - 요청 바디에 포함될 데이터를 입력합니다.
 * @returns {Promise<any>} API 호출 결과를 반환합니다.
 */
export const postAxios = async (url, data, fileYn) => {
  const token = await getToken(); // 토큰을 가져오는 함수를 호출합니다.

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (fileYn) {
    config.headers["Content-Type"] = "multipart/form-data";
  }


  const response = await axios.post(API_BASE_URL + url, data, config);

  return response.data.data;
};

/**
 * @description axios를 사용하여 PUT 요청을 보내는 함수입니다.
 * @param {string} url - API 주소를 입력합니다.
 * @param {object} data - 요청 바디에 포함될 데이터를 입력합니다.
 * @returns {Promise<any>} API 호출 결과를 반환합니다.
 */
export const putAxios = async (url, data) => {
  // console.log(url);
  const token = await getToken(); // 토큰을 가져오는 함수를 호출합니다.

  const response = await axios.put(API_BASE_URL + url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

/**
 * @description axios를 사용하여 DELETE 요청을 보내는 함수입니다.
 * @param {string} url - API 주소를 입력합니다.
 * @param {object} data - 요청 바디에 포함될 데이터를 입력합니다.
 * @returns {Promise<any>} API 호출 결과를 반환합니다.
 */
export const deleteAxios = async (url, data) => {
  const token = await getToken(); // 토큰을 가져오는 함수를 호출합니다.

  let queryString = "";
  if (typeof data === "object" && Object.keys(data).length > 0) {
    queryString = "?" + axios.defaults.paramsSerializer(data);
  }

  // console.log("url", API_BASE_URL + url + queryString);

  const response = await axios.delete(API_BASE_URL + url + queryString, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};
