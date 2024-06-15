import { BASE_URL } from "./const";

import { TOptions, TSuccessResponse } from "./types";

const checkResponse = (res: Response): Promise<any> => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(`Ошибка ${res.status}`);
};

const checkSuccess = (res: any): TSuccessResponse => {
  if (res && res.success) {
    return res;
  }
  throw new Error(`Ответ не success: ${res}`);
};

const request = (endpoint: string, options?: TOptions): Promise<TSuccessResponse> => {
  return fetch(`${BASE_URL}/${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export default request;
