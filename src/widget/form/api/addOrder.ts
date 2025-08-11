import axios from "axios";
import {API_URL} from "@/shared/api/api";

export const addOrder = async (order) => {
  const data = await axios.post(API_URL, [order], {
    headers: {
      "content-type": "application/json",
      "Accept": "application/json"
    }
  });

  const dataString = JSON.stringify(data);

  await alert(dataString);

  return data;
};