import axios from "axios";
import {API_URL, TOKEN} from "@/shared/api/api";

export const apiFetchContragents = async () => {
  const {data: {result}} =await axios.get(API_URL + "contragents/" + TOKEN);
  return result
};