import { useGetUser } from "../hooks/useGetUser";
import { createContext, useContext, FC } from "react";

type UserContextProps = {
  id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { userObject, isLoading, isError } = useGetUser();

  if (isLoading || isError || !userObject) {
    return null;
  }

  const { firstname, lastname, id, email } = userObject;
  const fullname = `${firstname} ${lastname}`;

  return (
    <UserContext.Provider value={{ fullname, firstname, lastname, id, email }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the context
export const useUserContextProvider = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useSearchContext must be used within a APISearchContextProvider"
    );
  }
  return context;
};
