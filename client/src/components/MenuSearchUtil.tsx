import { cn } from "../utils/utils";
import { HTMLAttributes, ReactNode } from "react";
import { useNavbarContext } from "../context/NavbarContext";
import { useRecentHistory } from "../hooks/useRecentHistory";

type MenuSearchUtilProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

const MenuSearchUtil = ({
  children,
  className,
  ...props
}: MenuSearchUtilProps) => {
  const { data: recentHistoryList, isLoading: isRecentHistoryLoading } =
    useRecentHistory("123");

  const { searchQuery } = useNavbarContext();

  //TODO: Handle the search loading from the GameList

  return (
    <div
      className={cn(
        "w-full bg-secondary absolute z-10 px-4 pt-2 top-[2.35rem] lg:top-[2.5rem] rounded shadow-md h-[28rem] lg:h-[38rem]",
        className,
        {
          "h-fit lg:h-fit":
            isRecentHistoryLoading ||
            recentHistoryList.length === 0 ||
            (recentHistoryList &&
              recentHistoryList.length > 0 &&
              recentHistoryList[0]?.history &&
              recentHistoryList[0]?.history.length <= 9),
          "h-[28rem] lg:h-[38rem]": searchQuery.length > 0,
        }
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MenuSearchUtil;
