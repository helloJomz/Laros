import { useNavbarContext } from "../context/NavbarContext";
import GameList from "./GameList";
import SearchHistoryList from "./SearchHistoryList";

const MenuSearch = () => {
  const { searchBoxType, searchQuery } = useNavbarContext();

  const lowercasedSearchBoxType = searchBoxType.toLowerCase();
  const isEmptySearchBox = searchQuery.trim() === "";

  if (lowercasedSearchBoxType === "games" && !isEmptySearchBox)
    return <GameList />;

  if (lowercasedSearchBoxType === "users" && !isEmptySearchBox)
    return <span>users</span>;

  // This will be returned if the Search Box returns an empty string.
  return <SearchHistoryList />;
};

export default MenuSearch;
