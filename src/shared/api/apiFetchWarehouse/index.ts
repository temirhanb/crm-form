import axios from "axios";
import {API_URL, TOKEN} from "@/shared/api/api";

export const apiFetchWarehouse = async () => {
  const {data: {result}} = await axios.get(API_URL + "warehouses/" + TOKEN);
  return result;
};