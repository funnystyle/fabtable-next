import { LOCAL_STORAGE_FABTABLE_USERINFO } from "@lib/Constant";

export const getUserInfo = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_FABTABLE_USERINFO)) || {};
}

export const isAuthenticated = () => {
    return !!getUserInfo().token;
};

export const getAccessToken = () => {
    return getUserInfo().token || "";
};

export const setAccessToken = (token) => {
    const userInfo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FABTABLE_USERINFO) || "{}");
    const updatedUserInfo = { ...userInfo, token: token };
    localStorage.setItem(LOCAL_STORAGE_FABTABLE_USERINFO, JSON.stringify(updatedUserInfo));
};
