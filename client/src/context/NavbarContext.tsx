import { createContext, useContext, useState, FC } from "react";

interface NavbarContextType {
  setSearchBoxType: React.Dispatch<React.SetStateAction<"Games" | "Users">>;
  searchBoxType: "Games" | "Users";
  windowWidth: number;
  setWindowWidth: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isSearchTyping: boolean;
  setIsSearchTyping: React.Dispatch<React.SetStateAction<boolean>>;
  triggerAlertFooter: null | {
    trigger: string;
    title: string;
    desc: string;
    alertType?: "default" | "error" | "success";
  };
  setTriggerAlertFooter: React.Dispatch<
    React.SetStateAction<null | {
      trigger: string;
      title: string;
      desc: string;
      alertType?: "default" | "error" | "success";
    }>
  >;
}

const NavbarContext = createContext<undefined | NavbarContextType>(undefined);

const NavbarContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State
  const [searchBoxType, setSearchBoxType] = useState<"Games" | "Users">(
    "Games"
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchTyping, setIsSearchTyping] = useState<boolean>(false);
  const [triggerAlertFooter, setTriggerAlertFooter] = useState<null | {
    trigger: string;
    title: string;
    desc: string;
    alertType?: "default" | "error" | "success";
  }>(null);

  return (
    <NavbarContext.Provider
      value={{
        setSearchBoxType,
        searchBoxType,
        windowWidth,
        setWindowWidth,
        searchQuery,
        setSearchQuery,
        isSearchTyping,
        setIsSearchTyping,
        triggerAlertFooter,
        setTriggerAlertFooter,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

// Custom hook to consume the context
const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error(
      "useSearchContext must be used within a APISearchContextProvider"
    );
  }
  return context;
};

export { NavbarContextProvider, useNavbarContext };
