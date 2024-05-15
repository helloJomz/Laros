import { createContext, useContext, useState, FC } from "react";
import { type SearchGameProps } from "../types/search_api";
import { getApiResponse } from "../utils/utils";

type NavbarContextProps = {
  searchAPI: (type: string, query?: string) => void;

  isAPISearchLoading: boolean;
  setIsAPISearchLoading: (isLoading: boolean) => void;

  APISearchResult: SearchGameProps[];
  setAPISearchResult: (response: SearchGameProps[]) => void;

  searchBoxType: string;
  setSearchBoxType: (type: "Games" | "Users") => void;

  setWindowWidth: (width: number) => void;
  windowWidth: number;

  searchQuery: string;
  setSearchQuery: (search: string) => void;

  isSearchTyping: boolean;
  setIsSearchTyping: (isTyping: boolean) => void;
};

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

const NavbarContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State
  const [isAPISearchLoading, setIsAPISearchLoading] = useState<boolean>(false);
  const [APISearchResult, setAPISearchResult] = useState<SearchGameProps[]>([]);
  const [searchBoxType, setSearchBoxType] = useState<string>("Games");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchTyping, setIsSearchTyping] = useState<boolean>(false);

  // Fetch data from the API
  const searchAPI = async (type: string, query?: string | undefined) => {
    const APIQuerySearchType = type.toLowerCase();
    const APIQuery = query ? query.toLowerCase() : "";

    try {
      setIsAPISearchLoading(true);
      const response = await getApiResponse(APIQuerySearchType, APIQuery);
      setAPISearchResult(response);
      setIsAPISearchLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavbarContext.Provider
      value={{
        searchAPI,
        isAPISearchLoading,
        setIsAPISearchLoading,
        APISearchResult,
        setAPISearchResult,
        setSearchBoxType,
        searchBoxType,
        windowWidth,
        setWindowWidth,
        searchQuery,
        setSearchQuery,
        isSearchTyping,
        setIsSearchTyping,
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
      // FIXME:
      "useSearchContext must be used within a APISearchContextProvider"
    );
  }
  return context;
};

export { NavbarContextProvider, useNavbarContext };
