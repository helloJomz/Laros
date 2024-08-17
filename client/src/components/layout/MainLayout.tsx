import RightSideBar from "../RightSideBar";
import LeftSideBar from "../LeftSideBar";
import { Outlet, useParams } from "react-router-dom";
import Alerts from "../common/Alerts";
import PromptToLogin from "../common/PromptToLogin";
import CollectionOfModals from "../common/CollectionOfModals";
import TopNavbar from "../TopNavbar";
import { useNavbarContext } from "@/context/NavbarContext";
import BottomNavbar from "../BottomNavbar";

interface MainLayoutProps {
  currentLocation: string;
}

const MainLayout = ({ currentLocation }: MainLayoutProps) => {
  const { windowWidth } = useNavbarContext();
  const { displayname, guid } = useParams();

  const noSideBarEndpoints = [
    "/upload/avatar",
    `/${displayname}`,
    `/game/${guid}`,
  ];

  if (noSideBarEndpoints.includes(currentLocation))
    return (
      <>
        <div className="flex flex-col h-screen">
          <TopNavbar />
          <PromptToLogin />
          <CollectionOfModals />
          <div className="flex-grow overflow-y-auto h-full ">
            <Outlet />
          </div>
          <Alerts />
          {windowWidth <= 768 && <BottomNavbar />}
        </div>
      </>
    );

  return (
    <>
      <div className="flex flex-col h-screen">
        <TopNavbar />
        <PromptToLogin />
        <CollectionOfModals />
        <div className="flex-grow md:grid md:grid-cols-[25%,50%,25%] xl:grid-cols-[32.7%,34.6%,32.7%] h-full overflow-y-auto">
          <LeftSideBar className="hidden md:block" />
          <div className="h-full">
            <Outlet />
          </div>
          <RightSideBar className="hidden lg:block" />
        </div>
        <Alerts />
        {windowWidth <= 768 && <BottomNavbar />}
      </div>
    </>
  );
};

export default MainLayout;
