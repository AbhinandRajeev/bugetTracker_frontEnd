import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

export const addBudgetAPI = async (data) => {
  return await commonAPI("POST", `${serverURL}/budget`, data);
};

export const getBudgetByMonthAPI = async (month) => {
  return await commonAPI("GET", `${serverURL}/budget?month=${month}`, "");
};

export const updateBudgetAPI = async (id, data) => {
  return await commonAPI("PUT", `${serverURL}/budget/${id}`, data);
};


export const deleteBudgetAPI = async (id) => {
  return await commonAPI("DELETE", `${serverURL}/budget/${id}`, "");
};
