import { History, X } from "lucide-react";
import { useNavbarContext } from "../context/NavbarContext";
import { type SearchHistoryType } from "../types/SearchHistory";
import AvatarDisplay from "./AvatarDisplay";
import { Button } from "./ui/button";

const SearchHistoryList = () => {
  const { recentSearchHistory } = useNavbarContext();

  return (
    <div className="py-2">
      <div className="font-semibold flex justify-between px-2 ">
        <div className="flex gap-x-2 items-center">
          <span>Recent</span>
        </div>
        <Button variant="link" size={"sm"} className="p-0 text-cyan-400">
          Edit
        </Button>
      </div>

      {recentSearchHistory.map((recent: SearchHistoryType) => (
        <div key={recent._id}>
          {recent.history.map((history) => (
            <div
              key={history._id}
              className="flex justify-between p-2 items-center rounded cursor-pointer hover:bg-slate-700"
            >
              <div className="flex gap-x-3 items-center">
                {!history.data.trackerid ? (
                  <AvatarDisplay
                    variant="search"
                    icon={<History size={24} />}
                  />
                ) : (
                  <AvatarDisplay variant="search" />
                )}

                <span>
                  {history.data.trackerid
                    ? history.data.trackerid
                    : history.data.query}
                </span>
              </div>

              <span
                className="rounded-full hover:bg-slate-800 w-6 h-6 flex justify-center items-center"
                onClick={() => console.log(history._id)}
              >
                <X size={15} />
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SearchHistoryList;
