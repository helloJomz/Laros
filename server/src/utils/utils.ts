import axios from "axios";
import { MakeAPIRequestProps } from "./types";

export const makeApiRequest = async ({
  url,
  apiKey,
  queryParams,
}: MakeAPIRequestProps) => {
  try {
    const response = await axios(url, {
      params: {
        api_key: apiKey,
        field_list: queryParams?.field_list,
        filter: queryParams?.filter,
        format: "json",
        limit: queryParams?.limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data from API");
  }
};

// GET THE API BASED ON THE TRACKERID
export const getAPIBasedOnTrackerId = async (
  origin: string,
  trackerid: string
) => {
  const ENDPOINT = `http://localhost:5000/api/recent_history/${origin}/${trackerid}`;
  try {
    const response = await axios.get(ENDPOINT);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
