import { useNavbarContext } from "../context/NavbarContext";
import GameList from "./GameList";
import SearchHistoryList from "./SearchHistoryList";
import MenuSearchUtil from "./MenuSearchUtil";

const MenuSearch = () => {
  const { searchBoxType, searchQuery } = useNavbarContext();

  const lowercasedSearchBoxType = searchBoxType.toLowerCase();
  const isEmptySearchBox = searchQuery.trim() === "";

  if (lowercasedSearchBoxType === "games" && !isEmptySearchBox)
    return <MenuSearchUtil children={<GameList />} />;

  if (lowercasedSearchBoxType === "users" && !isEmptySearchBox)
    return <MenuSearchUtil children={<span>users</span>} />;

  // This will be returned if the Search Box returns an empty string.
  return <MenuSearchUtil children={<SearchHistoryList />} />;
};

export default MenuSearch;
