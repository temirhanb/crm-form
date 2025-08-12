import axios from "axios";
import {API_URL, TOKEN} from "@/shared/api/api";

export const apiFetchPaybox = async () => {
  const {data: {result}} = await axios.get(API_URL + "payboxes/" + TOKEN);
  return result;
};