import { cn } from "../utils/utils";
import { HTMLAttributes, ReactNode } from "react";
import { useNavbarContext } from "../context/NavbarContext";

type MenuSearchUtilProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

const MenuSearchUtil = ({
  children,
  className,
  ...props
}: MenuSearchUtilProps) => {
  const { windowWidth } = useNavbarContext();
  return (
    <div
      className={cn(
        "w-full bg-secondary absolute z-10 px-4 pt-2 top-[2.5rem] rounded shadow-md h-[28rem] lg:h-[38rem]",
        className,
        {
          "top-[2.35rem]": windowWidth <= 1023,
        }
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MenuSearchUtil;
