import { cn } from "../utils/utils";
import { useNavbarContext } from "../context/NavbarContext";
import GameList from "./GameList";
import SearchHistoryList from "./SearchHistoryList";

const MenuSearch = () => {
  const {
    isAPISearchLoading,
    APISearchResult,
    windowWidth,
    searchBoxType,
    searchQuery,
    isSearchTyping,
  } = useNavbarContext();

  const lowercasedSearchBoxType = searchBoxType.toLowerCase();

  return (
    !isSearchTyping && (
      <div
        className={cn(
          "w-full bg-secondary absolute z-10 px-4 py-2 top-[2.5rem] rounded shadow-md overflow-hidden h-fit",
          {
            "top-[2.35rem]": windowWidth <= 1023,
            "h-24": isAPISearchLoading,
          }
        )}
      >
        {searchQuery.trim() === "" ? (
          <SearchHistoryList />
        ) : lowercasedSearchBoxType === "games" ? (
          <GameList />
        ) : (
          <span>Render user list</span>
        )}

        {!isAPISearchLoading &&
          APISearchResult.length > 0 &&
          searchQuery.trim() !== "" && (
            <div className="py-1 text-center hover:text-primary hover:underline text-xs border-t-2 lg:text-sm">
              <a href="#">See all</a>
            </div>
          )}
      </div>
    )
  );
};

export default MenuSearch;
