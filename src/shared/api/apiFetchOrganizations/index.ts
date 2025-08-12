import axios from "axios";
import {API_URL, TOKEN} from "@/shared/api/api";

export const apiFetchOrganizations = async () => {
  const {data: {result}} = await axios.get(API_URL + "organizations/" + TOKEN);
  return result
};