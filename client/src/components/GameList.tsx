import { TailSpin } from "react-loading-icons";
import { useNavbarContext } from "../context/NavbarContext";
import { Badge } from "./ui/badge";
import { FishOff, MonitorSmartphone } from "lucide-react";
import { cn } from "../utils/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

const GameList = () => {
  // Context
  const { isAPISearchLoading, APISearchResult, windowWidth, searchQuery } =
    useNavbarContext();

  return (
    <div
      className={cn("w-full h-full overflow-y-auto", {
        "h-[32rem]":
          (!isAPISearchLoading && APISearchResult.length > 0) ||
          APISearchResult.length === 0 ||
          (windowWidth > 768 && APISearchResult.length === 10),
      })}
    >
      {isAPISearchLoading ? (
        <div className="flex justify-center">
          <TailSpin speed={1} />
        </div>
      ) : APISearchResult.length > 0 ? (
        APISearchResult.map((api) => (
          <div
            key={api.guid}
            className={cn("mb-4 p-2 rounded hover:bg-primary cursor-pointer", {
              "py-0": windowWidth <= 768,
            })}
            onClick={() => console.log(api.guid)}
          >
            <div
              className={cn("flex gap-x-3", {
                "items-center": windowWidth <= 768,
              })}
            >
              <img
                src={api.image.icon_url}
                alt={api.image.image_tags}
                className={cn(
                  "w-24 h-24 object-cover rounded border border-muted-foreground",
                  {
                    "w-10 h-10": windowWidth <= 768,
                  }
                )}
              />
              <div
                className={cn("flex flex-col", {
                  "gap-y-[0.25rem]": windowWidth <= 768,
                  "gap-y-2": windowWidth > 768,
                })}
              >
                <h3
                  className={cn("font-semibold", {
                    "text-sm": windowWidth <= 768,
                  })}
                >
                  {api.name}
                </h3>
                <div className="flex gap-x-2">
                  {/* FOR BADGES PLATFORMS */}
                  {api.platforms && api.platforms.length > 0 ? (
                    api.platforms
                      .slice(0, windowWidth <= 768 ? 3 : 5)
                      .map((platform) => (
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
                              .map((platform, index, array) =>
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
                      ? api.deck.substring(0, 150) + "..."
                      : api.deck
                    : "No description available."}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        searchQuery.trim() !== "" && (
          <div className="text-center text-muted-foreground">
            <div className="flex justify-center">
              <FishOff size={120} />
            </div>
            <span>No result found for '{searchQuery}'</span>
          </div>
        )
      )}
    </div>
  );
};

export default GameList;
