import SearchBox from "./SearchBox";
import SideMenu from "./SideMenu";
import { Bell, LoaderCircle, Search, Swords, Users } from "lucide-react";
import { useState } from "react";
import { useNavbarContext } from "../context/NavbarContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { usePost } from "@/hooks/usePost";
import {
  setIsSearchOpen,
  selectIsSearchOpen,
  setSearchVal,
} from "@/app/features/nav/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import SearchResult from "./SearchResult";

const TopNavbar = () => {
  const { homePostRefetch } = usePost().navStates;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentLocation = useLocation().pathname;
  const isAtHomePage = currentLocation === "/";
  const isSearchOpen = useSelector(selectIsSearchOpen);

  // Context
  const { windowWidth } = useNavbarContext();

  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const handleHomeClick = async () => {
    if (isAtHomePage) {
      setIsRefetching(true);
      //REFETCH THE POSTS
      await homePostRefetch();
      setIsRefetching(false);
      return null;
    }
    navigate("/");
  };

  const Buttons = [
    {
      icon: <Users />,
      onClick: () => {},
    },

    {
      icon: !isRefetching ? (
        <Swords
          fill={isAtHomePage ? "#a855f7" : "none"}
          stroke={isAtHomePage ? "#a855f7" : "#ffff"}
        />
      ) : (
        <LoaderCircle className="animate-spin" />
      ),
      onClick: handleHomeClick,
    },

    {
      icon: <Search />,
      onClick: () => dispatch(setIsSearchOpen({ isOpen: true })),
    },
  ];

  const SearchComponent = () => {
    if (windowWidth > 768)
      return (
        <>
          <div className="absolute w-full h-full">
            <div className="grid md:grid-cols-[25%,50%,25%] xl:grid-cols-[33%,34%,33%]">
              <div className="w-full z-[-99999999999999]" />

              <div
                className="inset-x-0 w-full bg-primary shadow-2xl
         z-[99999999] rounded-bl-sm rounded-br-sm h-fit px-4 pb-4"
              >
                <SearchResult />
              </div>

              <div
                className="w-full z-[-99999999999999]"
                onClick={() => console.log("hi")}
              />
            </div>
          </div>
        </>
      );

    return (
      <>
        <div
          className="absolute inset-x-0 w-full bg-primary shadow-lg
         z-[99999999] rounded-bl-sm rounded-br-sm h-fit pb-4 px-2"
        >
          <SearchResult />
        </div>
      </>
    );
  };

  const TopNavbarWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <div className="h-16 px-2  bg-gray-900">
          <div className="relative w-full h-full py-1">
            <nav
              className={cn(
                "w-full h-full flex flex-col justify-center z-[999999] overflow-hidden",
                {
                  "rounded-tl-sm rounded-tr-sm px-2": isSearchOpen,
                  "bg-primary": isSearchOpen && windowWidth <= 768,
                  "px-0": isSearchOpen && windowWidth > 768,
                }
              )}
            >
              {children}
            </nav>
            {isSearchOpen && <SearchComponent />}
          </div>
        </div>
      </>
    );
  };

  const MobileScreenElements = () => {
    return !isSearchOpen ? (
      <div className="flex justify-between items-center h-full px-1">
        <h1 className="font-bold">Laros</h1>
        <div className="flex items-center gap-x-3">
          <div
            className="p-0.5"
            onClick={() => dispatch(setIsSearchOpen({ isOpen: true }))}
          >
            <Search size={24} />
          </div>
          <SideMenu />
        </div>
      </div>
    ) : (
      <div className="flex gap-x-2 items-center h-full">
        <div
          className="p-0.5"
          onClick={() => {
            dispatch(setIsSearchOpen({ isOpen: false }));
            dispatch(setSearchVal({ search: null }));
          }}
        >
          <IoMdArrowRoundBack size={24} />
        </div>
        <SearchBox className="flex-1" />
      </div>
    );
  };

  const LargerScreenElements = () => {
    return (
      <div className="grid md:grid-cols-[25%,50%,25%] xl:grid-cols-[33%,34%,33%] pt-1 items-center h-full w-full">
        <div className="w-full md:px-6 lg:px-12">
          <h1 className="font-bold">Laros</h1>
        </div>

        <div
          className={cn("w-full h-full py-1 flex justify-center gap-x-1", {
            "bg-primary rounded-tl-sm rounded-tr-sm":
              isSearchOpen && windowWidth > 768,
          })}
        >
          {!isSearchOpen ? (
            Buttons.map((button, index) => (
              <div
                key={index}
                className=" w-full flex flex-col items-center justify-center rounded cursor-pointer hover:bg-slate-600 hover:bg-opacity-20"
                onClick={button.onClick}
              >
                {button.icon}
              </div>
            ))
          ) : (
            <div
              className={cn("flex-1 flex gap-x-2 items-center h-full", {
                "px-2": isSearchOpen,
              })}
            >
              <div
                className="hover:bg-violet-900 hover:bg-opacity-40 p-1.5 rounded-full cursor-pointer"
                onClick={() => {
                  dispatch(setIsSearchOpen({ isOpen: false }));
                  dispatch(setSearchVal({ search: null }));
                }}
              >
                <IoMdArrowRoundBack size={24} />
              </div>
              <SearchBox className="w-full" />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-x-3 items-center h-full w-full md:px-6 lg:px-12">
          <div className="hover:bg-slate-600 hover:bg-opacity-20 p-1.5 rounded-full cursor-pointer">
            <div className="relative">
              <Bell />
              <div className="absolute -top-1.5 -right-1 ring-2 ring-gray-900 bg-red-600 w-4 h-4 rounded-full text-[0.6rem] text-center font-bold">
                <span className="-ms-0.5">6</span>
              </div>
            </div>
          </div>
          <SideMenu />
        </div>
      </div>
    );
  };

  return (
    <TopNavbarWrapper>
      {windowWidth <= 768 ? <MobileScreenElements /> : <LargerScreenElements />}
    </TopNavbarWrapper>
  );
};

export default TopNavbar;
