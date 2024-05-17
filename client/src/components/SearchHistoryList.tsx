import { History, X } from "lucide-react";
import { useNavbarContext } from "../context/NavbarContext";
import { type SearchHistoryType } from "../types/SearchHistory";
import AvatarDisplay from "./AvatarDisplay";
import { Button } from "./ui/button";
import { getAPIBasedOnTrackerId } from "../utils/utils";
import { useEffect, useState } from "react";

const SearchHistoryList = () => {
  const { recentSearchHistory } = useNavbarContext();
  const [deconstructedItems, setDeconstructedItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const updatedHistory = await Promise.all(
        recentSearchHistory.map(async (history) => {
          const dataArray = history.history;
          const updatedDataArray = await Promise.all(
            dataArray.map(async (entry: any) => {
              if (!entry.data.trackerid) return entry;
              const result = await getAPIBasedOnTrackerId(
                entry.origin,
                entry.data.trackerid
              );
              entry.data = result;
              return entry;
            })
          );
          history.history = updatedDataArray;
          return history;
        })
      );
      setDeconstructedItems(updatedHistory);
    };

    fetchData();
  }, []);

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

      {deconstructedItems.map((recent) => (
        <div key={recent._id}>
          {recent.history.map((history: any) => (
            <div
              key={history._id}
              className="flex justify-between p-2 items-center rounded cursor-pointer hover:bg-slate-700"
            >
              {/* THIS MAPS THE VALUE AND ALSO HAVE THE INDEX OF USERID I WANT TO FEED THE USERID TO MY CUSTOM FUNCTION TO REQUEST TO THE ENDPOINT API TO GET THE RESULTS AND THEN I WANT TO HANDLE HERE THE NAME,IMAGE */}
              <div className="flex gap-x-3 items-center">
                {history.data.query ? (
                  <AvatarDisplay
                    variant="search"
                    icon={<History size={24} />}
                  />
                ) : (
                  <AvatarDisplay
                    variant="search"
                    src={
                      history.data.imgURL
                        ? history.data.imgURL
                        : history.data.image.small_url
                    }
                  />
                )}

                <span>
                  {history.data.firstname || history.data.lastname
                    ? history.data.firstname + " " + history.data.lastname
                    : history.data.name
                    ? history.data.name
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
