import {BASE_URL} from "./const";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  throw new Error(`Ответ не success: ${res}`);
};

const request = (endpoint, options = {}) => {
  // console.log(`${BASE_URL}/${endpoint}`)
  // console.log(options)
  return fetch(`${BASE_URL}/${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export default request;
