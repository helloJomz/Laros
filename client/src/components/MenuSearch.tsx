import { cn } from "../utils/utils";
import { useNavbarContext } from "../context/NavbarContext";
import GameList from "./GameList";
import { Joystick, Search } from "lucide-react";

const MenuSearch = () => {
  const {
    isAPISearchLoading,
    APISearchResult,
    windowWidth,
    searchBoxType,
    searchQuery,
  } = useNavbarContext();

  const lowercasedSearchBoxType = searchBoxType.toLowerCase();

  return (
    <div
      className={cn(
        "w-full bg-secondary absolute z-10 px-2 pt-4  top-[2.5rem] rounded shadow-md overflow-hidden h-fit",
        {
          "top-[2.35rem]": windowWidth <= 1023,
          "h-24": isAPISearchLoading,
        }
      )}
    >
      {APISearchResult.length > 0 &&
      !isAPISearchLoading &&
      searchQuery.trim() !== "" ? (
        <div className="flex gap-x-2 items-center font-semibold">
          <Search size={16} />
          <span>Search results for '{searchQuery.trim()}'</span>
        </div>
      ) : (
        APISearchResult.length > 0 &&
        !isAPISearchLoading && (
          <div className="px-2 pb-3 flex gap-x-2 items-center font-semibold">
            <Joystick size={16} />
            <span>Random games</span>
          </div>
        )
      )}

      {lowercasedSearchBoxType === "games" ? (
        <>
          <GameList />
        </>
      ) : (
        "hi"
      )}

      <div className="py-2 text-center hover:text-primary hover:underline text-xs border-t-2 lg:text-sm">
        <a href="#">See all</a>
      </div>
    </div>
  );
};

export default MenuSearch;
