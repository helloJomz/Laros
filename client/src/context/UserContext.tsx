import { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/features/auth/authSlice";
import { type UserObject } from "@/types/Profile";

interface UserContextType {
  authenticatedUserObject: UserObject;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const authenticatedUserObject = useSelector(selectCurrentUser);

  return (
    <UserContext.Provider value={{ authenticatedUserObject }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the context
const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      "useUserContext must be used within a APISearchContextProvider"
    );
  }
  return context;
};

export { UserContextProvider, useUserContext };
