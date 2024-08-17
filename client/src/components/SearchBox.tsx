import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { cn } from "../lib/utils";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchVal, selectSearchVal } from "@/app/features/nav/navSlice";
import { useAddGameToRecentHistoryMutation } from "@/app/features/search/searchAPI";
import { useUserContext } from "@/context/UserContext";
import { addHistory } from "@/app/features/search/searchSlice";
import { useDebouncedCallback } from "use-debounce";

type SearchBoxProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchBox = ({ className, ...props }: SearchBoxProps) => {
  const { userid } = useUserContext().authenticatedUserObject;

  const dispatch = useDispatch();
  const searchVal = useSelector(selectSearchVal);

  // FOR FOCUSING THE INPUTBOX WHEN THE COMPONENT MOUNTS
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const [addGameToRecentHistory] = useAddGameToRecentHistoryMutation();

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const newHistoryItem = {
          userid: userid,
          anon: {
            query: searchVal,
          },
        };
        const { data, error } = await addGameToRecentHistory(newHistoryItem);

        if (!error) {
          dispatch(addHistory(data));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleOnClick = async () => {
    try {
      const newHistoryItem = {
        userid: userid,
        anon: {
          query: searchVal,
        },
      };
      await addGameToRecentHistory(newHistoryItem);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedOnChange = useDebouncedCallback((value) => {
    dispatch(setSearchVal({ search: value }));
  }, 700);

  return (
    <div className={cn("justify-center items-center ", className)}>
      <div className="relative w-full bg-primary">
        <Input
          className="h-8 w-full pe-9 bg-white border-none text-black"
          placeholder="Search something..."
          ref={inputRef}
          {...props}
          onKeyDown={handleEnter}
          onChange={(e) => {
            debouncedOnChange(e.target.value);
          }}
        />

        <div
          className="absolute top-0 right-0 mt-2 mr-4 cursor-pointer"
          onClick={handleOnClick}
        >
          <Search size={16} stroke="#000000" />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
