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

const SideMenu = () => {
  const user = useSelector(selectCurrentUser);
  const { setTriggerAlertFooter } = useNavbarContext();
  const [isProcessingLogout, setIsProcessingLogout] = useState<boolean>(false);

  const [anonUuid, _setAnonUuid] = useState<string>((): string => {
    const tempId = localStorage.getItem("anon_uuid");
    let finalAnonId: string = "";
    if (tempId) {
      finalAnonId = tempId;
    } else {
      const randomString: string = v4();
      const explodedRandomString: string = randomString.replace(/-/g, "");
      const slicedRandomString: string = explodedRandomString.slice(0, 12);
      finalAnonId = slicedRandomString;
      localStorage.setItem("anon_uuid", slicedRandomString);
    }
    return finalAnonId;
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

  const handleRedirectToProfile = () => {
    navigate(`/${user.displayname}`, { state: { from: location.pathname } });
  };

  return (
    <div>
      <Menubar className="border-none ps-2 relative bg-transparent">
        <MenubarMenu>
          <MenubarTrigger className="flex justify-center items-center h-fit w-fit p-0 cursor-pointer">
            <AvatarDisplay
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExczhveXdoaDlnbTJjOG0xaGxrdXhiNHZzbDZmenU0YmZxczd0bXgwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pCGyLbTeliIwqVU9Md/giphy.gif"
              fallback="AN"
              variant="menu"
            />
          </MenubarTrigger>
          <MenubarContent className="absolute top-[-0.1rem] right-[-3.5rem] ">
            <div className="w-[15rem] h-[18rem] p-2 flex flex-col justify-between">
              <div
                className="flex flex-col gap-y-2"
                onClick={handleRedirectToProfile}
              >
                <div
                  className={`flex gap-x-3 p-2 bg-secondary rounded items-center ${
                    user
                      ? "cursor-pointer hover:bg-slate-700"
                      : "cursor-default"
                  }`}
                >
                  <img
                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExczhveXdoaDlnbTJjOG0xaGxrdXhiNHZzbDZmenU0YmZxczd0bXgwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pCGyLbTeliIwqVU9Md/giphy.gif"
                    alt=""
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div className="flex flex-col mb-1 ">
                    <h6
                      className={` ${
                        user ? "text-xs" : "text-sm"
                      } lg:text-sm font-semibold`}
                    >
                      {user ? user.displayname : `user${anonUuid}`}
                    </h6>

                    <span className="text-xs lg:text-xs text-muted-foreground">
                      {user ? "Dedicated Poster" : "Guest user"}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full flex gap-x-2 items-center"
                onClick={user ? handleLogout : handleLogin}
                disabled={isProcessingLogout}
              >
                {user ? (
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
