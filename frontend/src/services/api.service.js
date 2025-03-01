import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:3000/";

class ApiError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export class ApiService {
  _getError(e) {
    if (e instanceof AxiosError) {
      return new ApiError(
          e.response.data?.error?.message ?? e.message,
          e.response
      );
    } else {
      return new ApiError(e.message, e.response);
    }
  }

  _wrapper1(method, url) {
    return async () => {
      try {
        const response = await method(BASE_URL + url);
        return {
          __state: "success",
          ...response,
        };
      } catch (e) {
        return {
          __state: "error",
          data: this._getError(e),
        };
      }
    };
  }

  _wrapper2(method, url, payload) {
    return async () => {
      try {
        const response = await method(BASE_URL + url, payload);
        return {
          __state: "success",
          ...response,
        };
      } catch (e) {
        return {
          __state: "error",
          data: this._getError(e),
        };
      }
    };
  }

  $get(url) {
    return this._wrapper1(axios.get, url)();
  }

  $post(url, payload) {
    return this._wrapper2(axios.post, url, payload)();
  }

  $put(url, payload) {
    return this._wrapper2(axios.put, url, payload)();
  }

  $delete(url) {
    return this._wrapper1(axios.delete, url)();
  }
}
