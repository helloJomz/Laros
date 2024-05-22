import axios from "axios";

export const getNavSearchResponse = async (type: string, query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/search/${type}/${query}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRecentHistoryList = async (userid: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/search/recent_history/${userid}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecentHistoryOne = async (
  userid: string,
  objectid: string
) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/search/recent_history/${userid}/${objectid}`
    );
  } catch (error) {
    console.error(error);
  }
};

// GAME LIST
export const getGameListBasedOnSearch = async (query: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/search/games/${query}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
};

export const addGameRecentHistory = async ({
  query,
  trackerid,
  origin,
  userid,
  imageURL,
}: {
  query: string;
  trackerid?: string;
  origin: string;
  userid: string;
  imageURL: string;
}) => {
  const PARAMS = {
    query: query,
    trackerid: trackerid,
    origin: origin,
    userid: userid,
    imageURL: imageURL,
  };

  await axios.post("http://localhost:5000/api/search/recent_history", PARAMS, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
