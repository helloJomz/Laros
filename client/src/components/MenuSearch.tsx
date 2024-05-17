import { cn } from "../utils/utils";
import { useNavbarContext } from "../context/NavbarContext";
import GameList from "./GameList";
import { Search } from "lucide-react";
import SearchHistoryList from "./SearchHistoryList";
import { Button } from "./ui/button";

const MenuSearch = () => {
  const {
    isAPISearchLoading,
    APISearchResult,
    recentSearchHistory,
    windowWidth,
    searchBoxType,
    searchQuery,
  } = useNavbarContext();

  const lowercasedSearchBoxType = searchBoxType.toLowerCase();

  return (
    // FIXME: Fix the length of the MenuSearch when there is no result
    //        As well as hide the 'see all' button
    <div
      className={cn(
        "w-full bg-secondary absolute z-10 px-4 pt-2 top-[2.5rem] rounded shadow-md overflow-hidden h-fit",
        {
          "top-[2.35rem]": windowWidth <= 1023,
          "h-24": isAPISearchLoading,
        }
      )}
    >
      <div>
        {recentSearchHistory.length > 0 &&
        APISearchResult.length === 0 &&
        searchQuery.trim() === "" &&
        !isAPISearchLoading ? (
          <div className="font-semibold flex justify-between px-2 pt-1">
            <div className="flex gap-x-2 items-center">
              <span>Recent</span>
            </div>
            <Button variant="link" size={"sm"} className="p-0 text-cyan-400">
              Edit
            </Button>
          </div>
        ) : (
          <div className="flex gap-x-2 items-center font-semibold">
            <Search size={16} />
            <span>Search results for '{searchQuery.trim()}'</span>
          </div>
        )}
      </div>

      {searchQuery.trim() === "" ? (
        <SearchHistoryList />
      ) : lowercasedSearchBoxType === "games" ? (
        <GameList />
      ) : (
        <span>hi</span>
      )}

      <div className="py-2 text-center hover:text-primary hover:underline text-xs border-t-2 lg:text-sm">
        <a href="#">See all</a>
      </div>
    </div>
  );
};

export default MenuSearch;
