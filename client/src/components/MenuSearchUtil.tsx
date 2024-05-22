import { cn } from "../utils/utils";
import { ReactNode } from "react";
import { useNavbarContext } from "../context/NavbarContext";

const MenuSearchUtil = ({ children }: { children: ReactNode }) => {
  const { windowWidth } = useNavbarContext();
  return (
    <div
      className={cn(
        "w-full bg-secondary absolute z-10 px-4 pt-2 pb-2 top-[2.5rem] rounded shadow-md h-fit ",
        {
          "top-[2.35rem]": windowWidth <= 1023,
        }
      )}
    >
      {children}
    </div>
  );
};

export default MenuSearchUtil;
