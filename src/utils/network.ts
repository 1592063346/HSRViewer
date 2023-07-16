import axios, { AxiosError, AxiosResponse } from "axios";
import { Language } from "../components/Language";
import { replaceIconWithURL } from "./tools";

const network = axios.create({
  baseURL: "",
});

enum NetworkErrorType {
  CORRUPTED_RESPONSE,
  UNKNOWN_ERROR,
}

export class NetworkError extends Error {
  type: NetworkErrorType;
  message: string;

  constructor(
    _type: NetworkErrorType,
    _message: string,
  ) {
    super();

    this.type = _type;
    this.message = _message;
  }

  toString(): string { return this.message; }
  valueOf(): Object { return this.message; }
}

export const request = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  params?: any
) => {
  const response = await network.request({ method, url, params, data })
    .catch((err: AxiosError) => {
      return err.response;
    });
  return response?.data;
};

export const requestAPI = async (
  uid: number,
  lang: Language,
  params: { [key: string] : string } = {},
) => {
  const url = "/api/" + uid.toString();
  params["lang"] = lang;
  return request(url, "GET", undefined, params);
};

export const fetchUser = async (
  uid: number,
  lang: Language,
  replaceIcon: boolean = false
) => {
  let data = await requestAPI(uid, lang);
  if (replaceIcon === true) {
    data = await replaceIconWithURL(data);
  }
  if (data.detail) {
    throw new NetworkError(
      NetworkErrorType.UNKNOWN_ERROR,
      data.detail
    );
  }
  return data;
};