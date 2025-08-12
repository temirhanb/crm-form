import axios from "axios";
import {API_URL, TOKEN} from "@/shared/api/api";

export const apiFetchNomenclature = async () => {
  const {data: {result}} = await axios.get(API_URL + "nomenclature/" + TOKEN);
  return result
};