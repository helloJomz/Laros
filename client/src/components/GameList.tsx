import { useNavbarContext } from "../context/NavbarContext";
import { Badge } from "./ui/badge";
import { MonitorSmartphone } from "lucide-react";
import { cn } from "../utils/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useMutation, useQuery } from "react-query";
import { addGameRecentHistory, getGameListBasedOnSearch } from "../api/search";
import DataFetchStatus from "./DataFetchStatus";
import { useDebounce } from "../hooks/useDebounce";

const GameList = () => {
  const { windowWidth, searchQuery, isSearchTyping } = useNavbarContext();
  const debouncedSearch = useDebounce(searchQuery);

  const {
    data: gameList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["game_list", debouncedSearch],
    queryFn: ({ queryKey }) => getGameListBasedOnSearch(queryKey[1]),
    enabled: isSearchTyping === false,
  });

  const { mutate: mutateAddGameRecentHistory } = useMutation({
    mutationFn: (obj: any) => addGameRecentHistory(obj),
  });

  if (isLoading || gameList === undefined) return <DataFetchStatus />;

  if (isError) return <DataFetchStatus type="error" />;

  if (gameList.length === 0)
    return <DataFetchStatus type="no_length" query={debouncedSearch} />;

  return (
    <div className="w-full overflow-hidden h-full pb-16 ">
      <div className="text-sm pt-2 pb-3 lg:pb-2 px-2 lg:text-base flex gap-x-2  items-center font-semibold">
        <span>Search results for '{searchQuery.trim()}'</span>
      </div>

      <div className="overflow-y-auto h-full ">
        {gameList.map((api: any) => (
          <div
            key={api.guid}
            className={cn("mb-4 p-2 rounded hover:bg-primary cursor-pointer", {
              "py-0": windowWidth <= 768,
            })}
            onClick={() =>
              mutateAddGameRecentHistory({
                query: api.name,
                trackerid: api.guid,
                origin: "games",
                userid: "123",
                imageURL: api.image.icon_url,
              })
            }
          >
            <div className="flex gap-x-3 items-center">
              <img
                src={api.image.icon_url}
                alt={api.image.image_tags}
                className={cn(
                  "w-20 h-20 object-cover rounded border border-muted-foreground",
                  {
                    "w-10 h-10": windowWidth <= 768,
                  }
                )}
              />
              <div
                className={cn("flex flex-col gap-y-2 ", {
                  "gap-y-[0.25rem]": windowWidth <= 768,
                })}
              >
                <h4
                  className={cn("font-semibold", {
                    "text-sm": windowWidth <= 768,
                  })}
                >
                  {api.name}
                </h4>

                <div className="flex gap-x-2">
                  {/* FOR BADGES PLATFORMS */}
                  {api.platforms && api.platforms.length > 0 ? (
                    api.platforms
                      .slice(0, windowWidth <= 768 ? 3 : 5)
                      .map((platform: any) => (
                        <TooltipProvider key={platform.id}>
                          <Tooltip key={platform.id}>
                            <TooltipTrigger asChild>
                              <Badge
                                className={cn(
                                  "text-xs bg-emerald-500 hover:bg-secondary cursor-default",
                                  {
                                    "text-[0.6rem]": windowWidth <= 768,
                                  }
                                )}
                              >
                                {api.platforms.length >= 3 &&
                                platform.name.length > 15
                                  ? platform.name.substring(0, 12) + "..."
                                  : platform.name}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent
                              key={platform.id}
                              className="font-semibold"
                            >
                              <p>{platform.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))
                  ) : (
                    <span
                      className={cn("text-xs italic", {
                        "text-[0.6rem]": windowWidth <= 768,
                      })}
                    >
                      No platforms available
                    </span>
                  )}

                  {api.platforms &&
                    api.platforms.length - (windowWidth <= 768 ? 3 : 5) > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              className={cn(
                                "gap-x-1 bg-destructive text-xs hover:bg-secondary cursor-default",
                                {
                                  "text-[0.6rem]": windowWidth <= 768,
                                }
                              )}
                            >
                              <MonitorSmartphone size={14} />
                              {(
                                api.platforms.length -
                                (windowWidth <= 768 ? 3 : 5)
                              ).toString() + " more"}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="w-64 text-center font-semibold">
                            {api.platforms
                              .slice(
                                api.platforms.length - windowWidth <= 768
                                  ? 3 + 2
                                  : 5 + 2,
                                api.platforms.length
                              )
                              .map((platform: any, index: any, array: any) =>
                                index === array.length - 1
                                  ? platform.name
                                  : platform.name + ", "
                              )
                              .join("")}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                </div>
                <span
                  className={cn("text-muted-foreground text-xs", {
                    hidden: windowWidth <= 768,
                  })}
                >
                  {api.deck
                    ? api.deck.length >= 150
                      ? api.deck.substring(0, 100) + "..."
                      : api.deck
                    : "No description available."}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameList;
