import { getUserDetails } from "../api/auth";
import { useQuery } from "react-query";

export const useGetUser = () => {
  const {
    data: userObject,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userAuthDetails"],
    queryFn: getUserDetails,
  });

  return {
    userObject,
    isLoading,
    isError,
  };
};
