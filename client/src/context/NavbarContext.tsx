import { createContext, useContext, useState, FC } from "react";

type NavbarContextProps = {
  searchBoxType: string;
  setSearchBoxType: (type: "Games" | "Users") => void;

  setWindowWidth: (width: number) => void;
  windowWidth: number;

  searchQuery: string;
  setSearchQuery: (search: string) => void;

  isSearchTyping: boolean;
  setIsSearchTyping: (isTyping: boolean) => void;

  triggerAlertFooter: {};
  setTriggerAlertFooter: (alerts: {}) => void;
};

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

const NavbarContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State
  const [searchBoxType, setSearchBoxType] = useState<string>("Games");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchTyping, setIsSearchTyping] = useState<boolean>(false);
  const [triggerAlertFooter, setTriggerAlertFooter] = useState({});

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
