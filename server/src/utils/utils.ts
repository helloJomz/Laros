import axios from "axios";
import { MakeAPIRequestProps } from "./types";

// Generate random 10 values on default click on search bar.
export const generateDefaultSearch = () => {
  const min = 1; // Minimum value
  const max = 60000; // Maximum value
  const randomNumbers: number[] = [];

  // Seed the random number generator based on current time
  const seed: number = Date.now();
  let seedValue: number = seed % 1000; // Use last 3 digits of the current timestamp as seed

  for (let i = 0; i < 10; i++) {
    // Generate random number using Math.random()
    seedValue = (seedValue * 9301 + 49297) % 233280;
    const randomNumber = min + (seedValue / 233280) * (max - min + 1);
    randomNumbers.push(Math.floor(randomNumber));
  }

  return randomNumbers.join("|").toString();
};

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
