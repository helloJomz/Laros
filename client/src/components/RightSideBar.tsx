import { FC } from "react";

type RightSideBarProps = React.HTMLAttributes<HTMLDivElement>;

const RightSideBar: FC<RightSideBarProps> = (className) => {
  return (
    <>
      <div
        className="bg-background ps-4 py-4 h-full overflow-auto"
        {...className}
      ></div>
    </>
  );
};

export default RightSideBar;
