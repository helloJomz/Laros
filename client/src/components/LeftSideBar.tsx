import { FC } from "react";

type LeftSideBarProps = React.HTMLAttributes<HTMLDivElement>;

const LeftSideBar: FC<LeftSideBarProps> = (className) => {
  return (
    <>
      <div className="bg-background p-4 h-full overflow-y-auto" {...className}>
        <div className="flex flex-col gap-y-3">{/* Content here... */}</div>
      </div>
    </>
  );
};

export default LeftSideBar;
