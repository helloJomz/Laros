import { useSelector } from "react-redux";
import { selectSearchVal } from "@/app/features/nav/navSlice";
import { History, LoaderCircle, X } from "lucide-react";
import {
  useAddGameToRecentHistoryMutation,
  useDeleteAllRecentHistoryMutation,
  useDeleteOneRecentHistoryMutation,
  useGetAllRecentHistoryQuery,
  useSearchQueryQuery,
} from "@/app/features/search/searchAPI";
import { useUserContext } from "@/context/UserContext";
import {
  addHistory,
  deleteAllHistory,
  selectIsSearchResultLoading,
  selectSearchHistories,
  selectSearchResults,
} from "@/app/features/search/searchSlice";
import { capitalizeFirstLetter, formatDateDistanceToNow } from "@/utils/utils";
import { useDispatch } from "react-redux";
import { deleteHistory } from "@/app/features/search/searchSlice";
import { useNavigate } from "react-router-dom";
import { setSearchVal } from "@/app/features/nav/navSlice";
import { setIsSearchOpen } from "@/app/features/nav/navSlice";

const SearchResult = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userid } = useUserContext().authenticatedUserObject;
  const searchVal = useSelector(selectSearchVal);

  useGetAllRecentHistoryQuery(userid, { skip: !userid });
  useSearchQueryQuery(searchVal, {
    skip: searchVal?.length === 0 || searchVal === null,
  });

  const [addGameToRecentHistory] = useAddGameToRecentHistoryMutation();
  const [deleteOneRecentHistory] = useDeleteOneRecentHistoryMutation();
  const [deleteAllRecentHistory] = useDeleteAllRecentHistoryMutation();

  const searchHistories = useSelector(selectSearchHistories);
  const isResultLoading = useSelector(selectIsSearchResultLoading);
  const { game, user } = useSelector(selectSearchResults);

  const handleDeleteOne = async (id: string) => {
    const { error } = await deleteOneRecentHistory({
      historyId: id,
      userId: userid,
    });
    if (!error) {
      dispatch(deleteHistory({ historyId: id }));
    }
  };

  const handleDeleteAll = async () => {
    const { error } = await deleteAllRecentHistory(userid);
    if (!error) {
      dispatch(deleteAllHistory());
    }
  };

  const EmptySearchHistory = () => {
    return (
      <>
        <div className="py-1 text-center">
          <span className="text-xs md:text-sm">No recent search history.</span>
        </div>
      </>
    );
  };

  const SearchHistoriesWithValue = () => {
    return (
      <>
        <div className="flex justify-between items-center pt-1.5">
          <span className="text-sm md:text-md font-semibold">Recent</span>
          <span
            className="text-xs hover:underline cursor-pointer"
            onClick={handleDeleteAll}
          >
            Clear all
          </span>
        </div>

        <div className="flex flex-col gap-y-2 md:gap-y-0.5">
          {searchHistories.map((history, index) => (
            <div
              className="flex justify-between items-center hover:bg-violet-900 hover:bg-opacity-40 lg:p-2 rounded cursor-pointer"
              key={`${index}-${history._id}`}
              onClick={() => {
                history.anon
                  ? console.log(history._id)
                  : history.user
                  ? navigate(`/${history.user.displayname}`)
                  : navigate(`/game/${history.game.guid}`);
                dispatch(setIsSearchOpen({ isOpen: false }));
                dispatch(setSearchVal({ search: null }));
              }}
            >
              <div className="flex gap-x-2 items-center text-sm">
                {history.anon ? (
                  <div className="w-8 h-8 rounded-full bg-gray-800 items-center flex flex-col justify-center">
                    <History stroke="#ffff" />
                  </div>
                ) : (
                  <img
                    src={
                      history.user
                        ? history.user.img_url
                        : history.game.icon_url
                    }
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                )}

                <div className="flex flex-col">
                  <div className="text-sm font-semibold">
                    {history.anon
                      ? history.anon.query
                      : history.user
                      ? capitalizeFirstLetter(history.user.displayname)
                      : capitalizeFirstLetter(history.game.gamename)}
                  </div>
                  <div className="text-xs -mt-0.5 text-slate-300">
                    {formatDateDistanceToNow(history.createdAt)}
                  </div>
                </div>
              </div>

              <div
                className="hover:bg-violet-900 hover:bg-opacity-40 p-2 rounded-full cursor-pointer z-[999999999]"
                onClick={() => handleDeleteOne(history._id)}
              >
                <X size={16} />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  if (!searchVal) {
    return (
      <>
        <div className="flex flex-col gap-y-3 ">
          {searchHistories.length === 0 && <EmptySearchHistory />}
          {searchHistories.length > 0 && <SearchHistoriesWithValue />}
        </div>
      </>
    );
  }

  return (
    <div>
      {!isResultLoading ? (
        <div className="py-2 flex flex-col gap-y-3 ">
          {user.map((u: any) => (
            <div
              key={u.displayname}
              className="flex gap-x-2 items-center cursor-pointer"
              onClick={async () => {
                if (userid) {
                  const newHistoryItem = {
                    userid: userid,
                    user: {
                      displayname: u.displayname,
                      img_url: u.imgURL,
                    },
                  };
                  const { data, error } = await addGameToRecentHistory(
                    newHistoryItem
                  );
                  if (!error) {
                    dispatch(addHistory(data));
                    dispatch(setIsSearchOpen({ isOpen: false }));
                    dispatch(setSearchVal({ search: null }));
                    navigate(`/${u.displayname}`);
                  }
                } else {
                  navigate(`/${u.displayname}`);
                }
              }}
            >
              <img
                src={u.imgURL}
                alt=""
                className="w-8 h-8 object-cover rounded-full"
              />
              <span className="text-xs font-semibold md:text-sm">
                {capitalizeFirstLetter(u.displayname)}
              </span>
            </div>
          ))}
          {game.map((item: any) => (
            <div
              key={item.name}
              className="flex gap-x-2 items-center cursor-pointer"
              onClick={async () => {
                if (userid) {
                  const newHistoryItem = {
                    userid: userid,
                    game: {
                      guid: item.guid,
                      gamename: item.name,
                      icon_url: item.image.icon_url,
                    },
                  };
                  const { data, error } = await addGameToRecentHistory(
                    newHistoryItem
                  );
                  if (!error) {
                    dispatch(addHistory(data));
                    dispatch(setIsSearchOpen({ isOpen: false }));
                    dispatch(setSearchVal({ search: null }));
                    navigate(`/game/${item.guid}`);
                  }
                } else {
                  navigate(`/game/${item.guid}`);
                }
              }}
            >
              <img
                src={item.image.icon_url}
                alt=""
                className="w-8 h-8 object-cover rounded-full"
              />
              <span className="text-xs font-semibold md:text-sm">
                {capitalizeFirstLetter(item.name)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center py-2">
          <LoaderCircle className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default SearchResult;
