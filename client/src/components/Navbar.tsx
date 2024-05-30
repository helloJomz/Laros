import SearchBox from "./SearchBox";
import SideMenu from "./SideMenu";
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

const Navbar = () => {
  // TODO: CLEAN UP THESE MESS! CREATE CUSTOM HOOKS...

  // Context
  const {
    // searchAPI,
    windowWidth,
    setWindowWidth,
    searchQuery,
    setSearchQuery,
    isSearchTyping,
    setIsSearchTyping,
  } = useNavbarContext();

  // State
  const [activeHeaderButton, setActiveHeaderButton] = useState<HeaderButtonID>(
    HeaderButtonID.Home
  );
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);

  // Ref
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchBoxRef, () => {
    setIsSearchOpen(false);
    setIsMobileSearchOpen(false);
  });

  // Event handlers
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

  return (
    <nav className="sticky top-0 px-4 py-2 lg:px-8 border-b-2 ">
      <>
        {/* -------- For Larger Screen -------- */}
        <div className="hidden justify-between items-center lg:flex">
          <Logo icon={<Swords size={30} className="text-primary" />} />

          {!isSearchOpen ? (
            <div className="hidden w-1/3 lg:flex">
              <div className="flex w-full justify-between">
                <ButtonIcon
                  variant={"ghost"}
                  size={"default"}
                  className={
                    activeHeaderButton !== HeaderButtonID.Home
                      ? "text-primary bg-secondary"
                      : ""
                  }
                  onClick={() => setActiveHeaderButton(HeaderButtonID.Friends)}
                >
                  <Users />
                </ButtonIcon>
                <ButtonIcon
                  variant={"ghost"}
                  size={"default"}
                  className={
                    activeHeaderButton !== HeaderButtonID.Friends
                      ? "text-primary bg-secondary"
                      : ""
                  }
                  onClick={() => setActiveHeaderButton(HeaderButtonID.Home)}
                >
                  <Gamepad />
                </ButtonIcon>
                <ButtonIcon
                  variant={"ghost"}
                  size={"default"}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search />
                </ButtonIcon>
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

          <div className="flex items-center align-middle justify-end w-1/5 ">
            <div className="hidden gap-x-2 items-center lg:flex">
              <ButtonIcon size="icon" variant="ghost">
                <MessageCircleMore size={22} />
              </ButtonIcon>
              <ButtonIcon size="icon" variant="ghost">
                <Bell size={22} />
              </ButtonIcon>
            </div>

            <SideMenu />
          </div>
        </div>

        {/* -------- For Mobile Screen -------- */}
        {!isMobileSearchOpen ? (
          <div className="flex justify-between items-center lg:hidden">
            <Logo icon={<Swords size={30} className="text-primary" />} />
            <div className="flex justify-end flex-1 ">
              <ButtonIcon
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsMobileSearchOpen(true)}
              >
                <Search />
              </ButtonIcon>

              <SideMenu />
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
      </>
    </nav>
  );
};

export default Navbar;
