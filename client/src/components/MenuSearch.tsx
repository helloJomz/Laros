import { useNavbarContext } from "../context/NavbarContext";
import GameList from "./GameList";
import SearchHistoryList from "./SearchHistoryList";
import MenuSearchUtil from "./MenuSearchUtil";
import { useDebounce } from "../hooks/useDebounce";

const MenuSearch = () => {
  const { searchBoxType, searchQuery } = useNavbarContext();

  const lowercasedSearchBoxType = searchBoxType.toLowerCase();
  const isEmptySearchBox = searchQuery.trim() === "";

  if (lowercasedSearchBoxType === "games" && !isEmptySearchBox)
    return <MenuSearchUtil children={<GameList />} />;

  if (lowercasedSearchBoxType === "users" && !isEmptySearchBox)
    return <MenuSearchUtil children={<span>users</span>} />;

  // This will be returned if the Search Box returns an empty string.
  return (
    <MenuSearchUtil
      children={<SearchHistoryList />}
      className="h-fit lg:h-fit"
    />
  );
};

export default MenuSearch;
