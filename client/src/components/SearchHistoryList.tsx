import { History, X } from "lucide-react";
import AvatarDisplay from "./AvatarDisplay";
import { Button } from "./ui/button";
import { capitalizeFirstLetter } from "../utils/utils";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { deleteRecentHistoryOne, getRecentHistoryList } from "../api/search";
import DataFetchStatus from "./DataFetchStatus";

const SearchHistoryList = () => {
  const queryClient = useQueryClient();
  const userId = "123";

  const {
    data: recentHistorylist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recent_history", userId],
    queryFn: ({ queryKey }) => {
      return getRecentHistoryList(queryKey[1]);
    },
  });

  const { mutate: mutateHistoryOne } = useMutation({
    mutationFn: (obj: string) => deleteRecentHistoryOne(userId, obj),
    onSuccess: () => {
      queryClient.invalidateQueries(["recent_history"]);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  if (isLoading) return <DataFetchStatus />;

  if (isError) return <DataFetchStatus type="error" />;

  if (recentHistorylist.length === 0)
    return <DataFetchStatus type="no_result" />;

  return (
    <div className="pt-1 pb-4 h-fit">
      <>
        <div className="text-sm lg:text-base font-semibold flex justify-between px-2">
          <div className="flex gap-x-2 items-center">
            <span>Recent</span>
          </div>
          <Button variant="link" size={"sm"} className="p-0 text-cyan-400">
            Edit
          </Button>
        </div>

        <div className="h-[92%] py-2 overflow-y-auto">
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
                      <AvatarDisplay variant="search" src={history.imageURL} />
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
                    onClick={() => mutateHistoryOne(history._id)}
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
  );
};

export default SearchHistoryList;
