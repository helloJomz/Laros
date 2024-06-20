import Navbar from "../Navbar";
import RightSideBar from "../RightSideBar";
import LeftSideBar from "../LeftSideBar";
import { Outlet } from "react-router-dom";
import Alerts from "../common/Alerts";

interface MainLayoutProps {
  currentLocation: string;
}

const MainLayout = ({ currentLocation }: MainLayoutProps) => {
  const noSideBarEndpoints = ["/upload/avatar"];

  if (noSideBarEndpoints.includes(currentLocation))
    return (
      <>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex-grow h-full overflow-y-auto">
            <Outlet />
          </div>
          <Alerts />
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow grid grid-cols-[20%,60%,20%] overflow-y-hidden h-full">
          <LeftSideBar />
          <div className="overflow-y-auto h-full">
            <Outlet />
          </div>
          <RightSideBar />
        </div>
        <Alerts />
      </div>
    </>
  );
};

export default MainLayout;
