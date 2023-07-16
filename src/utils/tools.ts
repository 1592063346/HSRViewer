import { ASSET_URL } from "../constants/constants";

export const replaceIconWithURL = (data: any) => {
  if (typeof(data) === "object") {
    if (Array.isArray(data)) {
      for (let key = 0; key < data.length; ++key) {
        data[key] = replaceIconWithURL(data[key]);
      }
    } else {
      for (let key in data) {
        data[key] = replaceIconWithURL(data[key]);
      }
    }
  } else if (typeof(data) === "string") {
    if (data.includes(".png")) {
      data = ASSET_URL + "/" + data;
    }
  }
  return data;
};