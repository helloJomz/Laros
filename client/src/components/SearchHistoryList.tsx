import { History, X } from "lucide-react";
import AvatarDisplay from "./AvatarDisplay";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { capitalizeFirstLetter } from "../utils/utils";
import DataFetchStatus from "./DataFetchStatus";
import {
  useGetAllRecentHistoryQuery,
  useDeleteOneRecentHistoryMutation,
  useDeleteAllRecentHistoryMutation,
} from "@/redux/features/search/searchAPI";

const SearchHistoryList = () => {
  const userid = "6651c9017d25ff4478471968";

  const {
    data: recentHistorylist,
    isLoading,
    isError,
    refetch,
  } = useGetAllRecentHistoryQuery(userid);

  const [deleteOneRecentHistory] = useDeleteOneRecentHistoryMutation();
  const [deleteAllRecentHistory] = useDeleteAllRecentHistoryMutation();

  if (isLoading || recentHistorylist === undefined)
    return <DataFetchStatus type="loading" />;

  if (isError) return <DataFetchStatus type="error" />;

  if (recentHistorylist.length === 0)
    return <DataFetchStatus type="no_result" />;

  return (
    <div
      className={cn(
        "w-full bg-secondary absolute z-10 px-4 pt-2 top-[2.35rem] lg:top-[2.5rem] rounded shadow-md h-fit"
      )}
    >
      <div className="pt-1 h-full  pb-4">
        <>
          <div className="text-sm lg:text-base font-semibold flex justify-between px-2 pb-1">
            <div className="flex gap-x-2 items-center">
              <span>Recent</span>
            </div>
            <Button
              variant="link"
              size={"sm"}
              className="p-0 text-cyan-400"
              onClick={async () => {
                await deleteAllRecentHistory({ userid: userid });
                refetch();
              }}
            >
              Clear all
            </Button>
          </div>

          <div className="h-[92%] overflow-y-auto">
            {recentHistorylist.map((recent: any) => (
              <div key={recent._id}>
                {recent.history.map((history: any) => (
                  <div
                    key={history._id}
                    className="flex justify-between p-2 items-center rounded cursor-pointer hover:bg-slate-700"
                  >
                    <div className="flex gap-x-3 items-center">
                      {!history.imageURL ? (
                        <AvatarDisplay
                          variant="search"
                          icon={<History size={24} />}
                        />
                      ) : (
                        <AvatarDisplay
                          variant="search"
                          src={history.imageURL}
                        />
                      )}

                      <div className="text-xs">
                        <span className="font-semibold lg:text-sm">
                          {history.query}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {history.origin !== "undefined" &&
                            capitalizeFirstLetter(history.origin)}
                        </span>
                      </div>
                    </div>

                    <span
                      className="rounded-full hover:bg-slate-800 w-6 h-6 flex justify-center items-center"
                      onClick={async () => {
                        await deleteOneRecentHistory({
                          userid: userid,
                          historyid: history._id,
                        });
                        refetch();
                      }}
                    >
                      <X size={15} />
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default SearchHistoryList;
