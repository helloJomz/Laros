import Navbar from "../Navbar";
import RightSideBar from "../RightSideBar";
import LeftSideBar from "../LeftSideBar";
import { Outlet, useParams } from "react-router-dom";
import Alerts from "../common/Alerts";
import PromptToLogin from "../common/PromptToLogin";

interface MainLayoutProps {
  currentLocation: string;
}

const MainLayout = ({ currentLocation }: MainLayoutProps) => {
  const { displayname } = useParams();
  const noSideBarEndpoints = ["/upload/avatar", `/${displayname}`];

  if (noSideBarEndpoints.includes(currentLocation))
    return (
      <>
        <div className="flex flex-col h-screen">
          <Navbar />
          <PromptToLogin />
          <PromptToLogin />
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
        <PromptToLogin />
        <div className="flex-grow lg:grid lg:grid-cols-[25%,50%,25%] overflow-y-hidden h-full">
          <LeftSideBar className="hidden md:block" />
          <div className="overflow-y-auto h-full bg-gray-900">
            <Outlet />
          </div>
          <RightSideBar className="hidden lg:block" />
        </div>
        <Alerts />
      </div>
    </>
  );
};

export default MainLayout;
