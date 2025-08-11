import axios from "axios";
import {API_URL} from "@/shared/api/api";

export const addOrder = async (order) => {
  const data = axios.post(API_URL, order);
};