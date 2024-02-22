import axios from "axios";

export const zabApi = axios.create({
  baseURL: isRunningOnDev() ? "/devapi" : "/api",
  withCredentials: true,
});

export const vatusaApi = axios.create({
  baseURL: "https://api.vatusa.net/v2"
});

export const vatusaApiAuth = axios.create({
  baseURL: "https://api.vatusa.net/v2",
  withCredentials: true,
});

function isRunningOnDev() {
  const host = window.location.host;
  if (host.includes("localhost") || host == "beta.zabartcc.org") {
    return true;
  }

  return false;
}
