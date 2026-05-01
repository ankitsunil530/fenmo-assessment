import axios from "axios";

const API = axios.create({
  baseURL: "https://fenmo-backend-p4u7.onrender.com",
});

export const getExpenses = (params) => API.get("/expenses", { params });
export const createExpense = (data) => API.post("/expenses", data);