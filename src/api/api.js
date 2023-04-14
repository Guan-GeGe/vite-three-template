import axios from "axios";

export function getSmartcity() {
  return axios.get(
    "http://127.0.0.1:4523/m1/2587540-0-default/api/smartcity/info"
  );
}

export function getSmartcityList() {
  return axios.get(
    "http://127.0.0.1:4523/m1/2587540-0-default/api/smartcity/list"
  );
}
