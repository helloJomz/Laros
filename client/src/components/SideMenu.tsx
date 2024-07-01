import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../components/ui/menubar";
import { Button } from "./ui/button";
import AvatarDisplay from "./AvatarDisplay";
import { LoaderCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  destroyUserSession,
} from "@/app/features/auth/authSlice";
import { persistor } from "@/app/store";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useNavbarContext } from "@/context/NavbarContext";
import { useLogoutMutation } from "@/app/features/auth/authApiSlice";
import { v4 } from "uuid";
import { generateRandomAvatarGifsForAnon } from "@/utils/utils";

const SideMenu = () => {
  const { displayname, userid, imgURL } = useSelector(selectCurrentUser);
  const { setTriggerAlertFooter, setShowPromptToLogin } = useNavbarContext();
  const [isProcessingLogout, setIsProcessingLogout] = useState<boolean>(false);

  const [anonObject, _setAnonObject] = useState<{
    anon_uuid: string;
    anon_avatar: string;
  }>(() => {
    const tempId = localStorage.getItem("anon_uuid");
    const tempAvatar = localStorage.getItem("anon_avatar");

    let finalAnonId: string = "";
    let finalAvatar: string = "";

    if (tempId && tempAvatar) {
      finalAnonId = tempId;
      finalAvatar = tempAvatar;
    } else {
      const randomString: string = v4();
      const explodedRandomString: string = randomString.replace(/-/g, "");
      const slicedRandomString: string = explodedRandomString.slice(0, 12);
      finalAnonId = slicedRandomString;
      localStorage.setItem("anon_uuid", slicedRandomString);

      const randomGif: string = generateRandomAvatarGifsForAnon();
      finalAvatar = randomGif;
      localStorage.setItem("anon_avatar", randomGif);
    }
    return {
      anon_uuid: finalAnonId,
      anon_avatar: finalAvatar,
    };
  });

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsProcessingLogout(true);
    setTimeout(async () => {
      setTriggerAlertFooter({
        trigger: "logout",
        title: "You have logged out successfully!",
        desc: "Your session has ended. See you next time!",
      });
      dispatch(destroyUserSession());
      persistor.flush();
      persistor.purge();
      await logout(undefined); // clears cookies
      setIsProcessingLogout(false);
    }, 2000);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handlePromptToLogin = () => {
    setShowPromptToLogin(true);
  };

  const handleRedirectToProfile = () => {
    setShowPromptToLogin(false);
    navigate(`/${displayname}`, { state: { from: location.pathname } });
  };

  return (
    <div>
      <Menubar className="border-none ps-2 relative bg-transparent">
        <MenubarMenu>
          <MenubarTrigger className="flex justify-center items-center h-fit w-fit p-0 cursor-pointer">
            <AvatarDisplay
              src={imgURL || anonObject.anon_avatar}
              fallback="AN"
              variant="menu"
            />
          </MenubarTrigger>
          <MenubarContent className="absolute top-[-0.1rem] right-[-3.5rem] z-[9999999]">
            <div className="w-[15rem] h-[18rem] p-2 flex flex-col justify-between">
              <div
                className="flex flex-col gap-y-2"
                onClick={userid ? handleRedirectToProfile : handlePromptToLogin}
              >
                <div className="flex gap-x-3 p-2 bg-secondary rounded items-center cursor-pointer hover:bg-slate-700">
                  <img
                    src={imgURL || anonObject.anon_avatar}
                    alt={`${displayname}_picture` || anonObject.anon_uuid}
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div className="flex flex-col mb-1 ">
                    <h6
                      className={` ${
                        userid ? "text-xs" : "text-sm"
                      } lg:text-sm font-semibold`}
                    >
                      {displayname || `user${anonObject.anon_uuid}`}
                    </h6>

                    <span className="text-xs lg:text-xs text-muted-foreground">
                      {userid ? "Dedicated Poster" : "Guest user"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full flex gap-x-2 items-center"
                onClick={userid ? handleLogout : handleLogin}
                disabled={isProcessingLogout}
              >
                {userid ? (
                  <div className="flex gap-x-1 items-center">
                    {isProcessingLogout && (
                      <LoaderCircle size={20} className="animate-spin" />
                    )}
                    <span>
                      {isProcessingLogout ? "Logging Out..." : "Log Out"}
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-x-1 items-center">
                    <span>Log In</span>
                  </div>
                )}
              </Button>
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default SideMenu;
