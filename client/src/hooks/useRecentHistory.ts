import { getRecentHistoryList } from "../api/search";
import { useQuery } from "react-query";

export const useRecentHistory = (userid: string) => {
  return useQuery({
    queryKey: ["recent_history", userid],
    queryFn: ({ queryKey }) => getRecentHistoryList(queryKey[1]),
  });
};
