import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// GET A RESPONSE FROM THE API
export const getApiResponse = async (
  APIQuerySearchType: string,
  APIQuery: string
) => {
  try {
    if (APIQuerySearchType.toLowerCase() === "games") {
      const response = await axios.get(
        `http://localhost:5000/api/search/${APIQuerySearchType}/${APIQuery}`
      );
      return response.data.results;
    } else {
      // handle here the users
    }
  } catch (error) {
    throw new Error("Error getting data from API");
  }
};

// GET A RECENT HISTORY FOR SEARCH
export const getRecentSearchHistory = async (userid: string) => {
  const ENDPOINT = `http://localhost:5000/api/recent_history/${userid}`;
  try {
    const response = await axios.get(ENDPOINT);
    return response.data;
  } catch (error) {
    console.error(error);
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
