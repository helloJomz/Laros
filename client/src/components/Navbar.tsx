import ToggleTheme from "./ToggleTheme";
import AvatarDisplay from "./AvatarDisplay";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import {
  Search,
  Gamepad,
  Users,
  Swords,
  Bell,
  MessageCircleMore,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import { useClickOutside } from "../hooks/useClickedOutside";
import { HeaderButtonID } from "../types/enums";
import MenuSearch from "./MenuSearch";
import { useNavbarContext } from "../context/NavbarContext";
import { useDebounce } from "../hooks/useDebounce";

const Navbar = () => {
  // Context
  const {
    searchAPI,
    windowWidth,
    setWindowWidth,
    searchBoxType,
    searchQuery,
    setSearchQuery,
    isSearchTyping,
    setIsSearchTyping,
    recentSearchHistory,
    fetchSearchHistory,
    setAPISearchResult,
  } = useNavbarContext();

  // State
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeHeaderButton, setActiveHeaderButton] = useState<HeaderButtonID>(
    HeaderButtonID.Home
  );
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const debouncedSearch = useDebounce(searchQuery);

  // Ref
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchBoxRef, () => {
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
  });

  // Event handlers
  const handleMenuToggle = () => setIsMenuOpen((openMenu) => !openMenu);
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearchTyping(true);
    setSearchQuery(e.target.value);
  };

  // Effects
  useEffect(() => {
    if (!isSearchTyping) return;

    const searchTypingTimeout = setTimeout(() => {
      setIsSearchTyping(false);
    }, 1200);

    return () => {
      clearTimeout(searchTypingTimeout);
    };
  }, [isSearchTyping, searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const searchBoxLowerCased = searchBoxType.toLowerCase();
    const isEmptySearch = debouncedSearch.trim() === "";
    try {
      if (searchBoxLowerCased === "games") {
        if (isEmptySearch) {
          fetchSearchHistory("123");
        } else {
          // If debounced search is not empty, search for games based on search query
          searchAPI(searchBoxLowerCased, debouncedSearch);
          console.log("not empty");
        }
      } else {
        console.log("im in user");
      }
    } catch (error) {
      console.error(error);
    }
  }, [debouncedSearch || searchBoxType]);

  return (
    <nav className="sticky top-0 px-4 py-2 lg:px-8 border-b-2 ">
      <div>
        {/* -------- For Larger Screen -------- */}
        <div className="hidden justify-between items-center lg:flex">
          <Logo icon={<Swords size={30} className="text-primary" />} />

          {!isSearchOpen ? (
            <div className="hidden w-1/3 lg:flex">
              <div className="flex w-full justify-between">
                <ButtonIcon
                  icon={<Users />}
                  variant={"ghost"}
                  size={"default"}
                  className={
                    activeHeaderButton !== HeaderButtonID.Home
                      ? "text-primary bg-secondary"
                      : ""
                  }
                  onClick={() => setActiveHeaderButton(HeaderButtonID.Friends)}
                />
                <ButtonIcon
                  icon={<Gamepad />}
                  variant={"ghost"}
                  size={"default"}
                  className={
                    activeHeaderButton !== HeaderButtonID.Friends
                      ? "text-primary bg-secondary"
                      : ""
                  }
                  onClick={() => setActiveHeaderButton(HeaderButtonID.Home)}
                />
                <ButtonIcon
                  icon={<Search />}
                  variant={"ghost"}
                  size={"default"}
                  onClick={() => setIsSearchOpen(true)}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 relative" ref={searchBoxRef}>
              <div
                className={
                  isSearchOpen && windowWidth >= 768
                    ? "flex w-full items-center gap-x-2"
                    : "hidden"
                }
              >
                <SearchBox
                  className="w-full"
                  onChange={handleSearchInputChange}
                  onFocus={() => {
                    setIsSearchOpen(true);
                  }}
                />
              </div>
              {isSearchOpen && <MenuSearch />}
            </div>
          )}

          <div className="flex gap-x-2 items-center align-middle justify-end w-1/5 ">
            <div className="hidden gap-x-1 items-center lg:flex">
              <ButtonIcon
                icon={<MessageCircleMore size={20} />}
                size="icon"
                variant="ghost"
              />
              <ButtonIcon
                icon={<Bell size={20} />}
                size="icon"
                variant="ghost"
              />
            </div>

            <div className="border-l-2 ps-2">
              <ButtonIcon
                icon={
                  <AvatarDisplay
                    src="https://www.mordeo.org/files/uploads/2022/01/Ezreal-League-of-Legends-2022-4K-Ultra-HD-Mobile-Wallpaper.jpg"
                    fallback="AN"
                  />
                }
                variant={"ghost"}
                size={"icon"}
                className="hidden lg:flex"
              />
            </div>
          </div>
        </div>

        {/* -------- For Mobile Screen -------- */}
        {!isMobileSearchOpen ? (
          <div className="flex justify-between items-center lg:hidden">
            <Logo icon={<Swords size={30} className="text-primary" />} />
            <div className="flex justify-end flex-1 gap-4">
              <ButtonIcon
                icon={<Search size={20} />}
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsMobileSearchOpen(true)}
              />
              <div className="border-l-2 ps-4">
                <ButtonIcon
                  icon={
                    <AvatarDisplay
                      src="https://www.mordeo.org/files/uploads/2022/01/Ezreal-League-of-Legends-2022-4K-Ultra-HD-Mobile-Wallpaper.jpg"
                      fallback="AN"
                    />
                  }
                  variant={"ghost"}
                  size={"icon"}
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-1 w-full relative lg:hidden"
            ref={searchBoxRef}
          >
            <SearchBox className="w-full" onChange={handleSearchInputChange} />
            <MenuSearch />
          </div>
        )}
      </div>
      {isMenuOpen && <Sidebar />}
    </nav>
  );
};

export default Navbar;
