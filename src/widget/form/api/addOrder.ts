import axios from "axios";
import {API_URL, TOKEN} from "@/shared/api/api";

export const addOrder = async (order) => {
  const data = await axios.post(API_URL + "docs_sales/" + TOKEN, order, {
    headers: {
      "content-type": "application/json",
      "Accept": "application/json"
    }
  });

  await alert(JSON.stringify(data));

  return data;
};