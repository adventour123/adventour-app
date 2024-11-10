import axios from "axios";

const api = axios.create({
  baseURL: "https://api.fruitask.com/v3/tables",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
