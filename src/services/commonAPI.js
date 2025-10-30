import axios from "axios";

export const commonAPI = async (httpMethod, url, reqBody) => {
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody,
  };

  // API call using axios
  return await axios(reqConfig)
    .then((res) => {
      return res.data; 
    })
    .catch((err) => {
      console.error("API Error:", err);
      return err;
    });
};
