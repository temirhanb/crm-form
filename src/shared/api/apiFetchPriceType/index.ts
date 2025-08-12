import axios from "axios";
import {API_URL, TOKEN} from "@/shared/api/api";

export const apiFetchPriceType = async () => {
  const {data: {result}} = await axios.get(API_URL + "price_types/" + TOKEN);
  return result;
};