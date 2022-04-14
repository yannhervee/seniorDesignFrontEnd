import axios from "axios";
import cookie from "cookie";

const getDate = () => {
    const date = new Date()
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
    return date
};

const COOKIE_PROPS = {
  path: "/",
  expires: getDate(),
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production"
};

export const DELETE_COOKIE_PROPS = {
  path: "/",
  expires: new Date(0)
};

const setDocumentAuthCookies = (headers) => {
  if (!headers["access-token"]) return;

  document.cookie = cookie.serialize("access-token", headers["access-token"], COOKIE_PROPS);
  document.cookie = cookie.serialize("uid", headers.uid, COOKIE_PROPS);
  document.cookie = cookie.serialize("expiry", headers.expiry, COOKIE_PROPS);
  document.cookie = cookie.serialize("client", headers.client, COOKIE_PROPS);
};

const removeDocumentAuthCookies = () => {
  document.cookie = cookie.serialize("uid", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("expiry", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("client", "", DELETE_COOKIE_PROPS);
  document.cookie = cookie.serialize("access-token", "", DELETE_COOKIE_PROPS);
};

// object is either axios init options or axios defaults object
// data is either parsed cookie or axios response header
const setAxiosAuthHeaders = (object, data) => {
    if (data["access-token"]) {
    object.headers.uid = data.uid;
    object.headers.expiry = data.expiry;
    object.headers.client = data.client;
    object.headers["token-type"] = "Bearer";
    object.headers["access-token"] = data["access-token"];
  }
  return object;
};

const setAuthInfo = (headers) => setDocumentAuthCookies(headers);

const axiosInstance = () => {  
    const axiosClientConfig = {
        baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://studentconnection.herokuapp.com',
        withCredentials: true, // This tells the browser to send cookies to the backend
        headers: { "X-Requested-With": "XMLHttpRequest" }
    };
    const cookieJar = cookie.parse(document.cookie);
    const axiosInstance = axios.create(setAxiosAuthHeaders(axiosClientConfig, cookieJar));
    return axiosInstance;
}

export { setAuthInfo, axiosInstance, removeDocumentAuthCookies };