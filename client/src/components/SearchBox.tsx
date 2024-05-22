import { Input } from "./ui/input";
import { Check, LoaderCircle, Search } from "lucide-react";
import { cn } from "../utils/utils";
import { Badge } from "./ui/badge";
import { useNavbarContext } from "../context/NavbarContext";
import { useEffect, useState } from "react";
import axios from "axios";

type SearchBoxProps = React.InputHTMLAttributes<HTMLInputElement>;

const SearchBox = ({ className, ...props }: SearchBoxProps) => {
  // Context
  const { searchBoxType, setSearchBoxType, isSearchTyping, searchQuery } =
    useNavbarContext();

  // State
  const [placeholder, setPlaceholder] = useState<string>("Search games...");
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState<boolean>(false);

  const searchBoxLowerCased = searchBoxType.toLowerCase();
  const handleGameType = searchBoxLowerCased === "games";
  const handleUserType = searchBoxLowerCased === "users";

  useEffect(() => {
    const updatedPlaceholder = handleGameType
      ? "Search games..."
      : "Search users...";
    setPlaceholder(updatedPlaceholder);
  }, [searchBoxLowerCased]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const queryParams = {
          query: searchQuery,
          origin: "undefined",
          userid: "123",
        };
        axios.post("http://localhost:5000/api/recent_history", queryParams, {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={cn("justify-center items-center", className)}>
      <div className="relative w-full">
        <Input
          className={cn("h-8 w-full pe-4", {
            "ps-20": handleGameType,
            "ps-[4.5rem]": handleUserType,
          })}
          placeholder={placeholder}
          {...props}
          onKeyDown={handleEnter}
        />

        {/* TRIGGER  */}
        <Badge
          className="flex items-center absolute mt-[0.30rem] ms-2 top-0 text-xs cursor-pointer"
          onClick={() => setIsTypeMenuOpen((isTypeMenuOpen) => !isTypeMenuOpen)}
        >
          {handleGameType ? "Games" : handleUserType && "Users"}:
        </Badge>

        {isTypeMenuOpen && (
          <div className="bg-background ms-[-0.5rem] lg:ms-[-1rem] mt-1 w-28 z-50 absolute rounded font-semibold shadow-lg border-[1px] border-muted">
            <div className="p-2 border-b-[1px] border-b-muted flex gap-x-2 items-center">
              <Search size={16} />
              <span className="text-sm">Search By</span>
            </div>
            <div className="text-sm p-2">
              <div className="flex items-center gap-x-2 p-[0.2rem] mb-1 hover:bg-secondary rounded">
                <div
                  className={cn("invisible", {
                    visible: handleGameType,
                  })}
                >
                  <Check size={14} />
                </div>
                <button
                  onClick={() => {
                    setSearchBoxType("Games");
                    setIsTypeMenuOpen(false);
                  }}
                >
                  Games
                </button>
              </div>
              <div className="flex items-center gap-x-2 p-[0.5rem] hover:bg-secondary rounded">
                <div
                  className={cn("invisible", {
                    visible: handleUserType,
                  })}
                >
                  <Check size={14} />
                </div>
                <button
                  onClick={() => {
                    setSearchBoxType("Users");
                    setIsTypeMenuOpen(false);
                  }}
                >
                  Users
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="absolute top-0 right-0 mt-2 mr-4 cursor-pointer">
          {!isSearchTyping ? (
            <Search size={16} />
          ) : (
            <LoaderCircle size={16} className="animate-spin" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
