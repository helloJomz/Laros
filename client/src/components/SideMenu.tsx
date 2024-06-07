import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../components/ui/menubar";
import { Button } from "./ui/button";
import AvatarDisplay from "./AvatarDisplay";
import { LoaderCircle, LogIn, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  destroyUserSession,
} from "@/app/features/auth/authSlice";
import { persistor } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNavbarContext } from "@/context/NavbarContext";

const SideMenu = () => {
  const { setTriggerAlertFooter } = useNavbarContext();
  const [isProcessingLogout, setIsProcessingLogout] = useState<boolean>(false);

  const user = useSelector(selectCurrentUser);
  const fullname = user && user.firstname + " " + user.lastname;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsProcessingLogout(true);
    setTimeout(() => {
      setTriggerAlertFooter({
        trigger: "logout",
        title: "You have logged out successfully!",
        desc: "Your session has ended. See you next time!",
      });
      dispatch(destroyUserSession());
      persistor.flush();
      persistor.purge();
      setIsProcessingLogout(false);
    }, 2000);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Menubar className="border-none ps-2 relative">
        <MenubarMenu>
          <MenubarTrigger className="flex justify-center items-center h-fit w-fit p-0 cursor-pointer">
            <AvatarDisplay
              src="https://play-lh.googleusercontent.com/oyEb6MRmRS6ReoX50Vyengpkkn_LgRYOX2oid9kCq_mzaVvxvmQbPIHmfTmEgWlfXg"
              fallback="AN"
              variant="menu"
            />
          </MenubarTrigger>
          <MenubarContent className="absolute top-[-0.1rem] right-[-3.5rem] ">
            <div className="w-[15rem] h-[18rem] p-2 flex flex-col justify-between ">
              <div className="flex flex-col gap-y-2">
                <div
                  className={`flex gap-x-3 p-2 bg-secondary rounded items-center ${
                    user
                      ? "cursor-pointer hover:bg-slate-700"
                      : "cursor-default"
                  }`}
                >
                  <img
                    src="https://play-lh.googleusercontent.com/oyEb6MRmRS6ReoX50Vyengpkkn_LgRYOX2oid9kCq_mzaVvxvmQbPIHmfTmEgWlfXg"
                    alt=""
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div className="flex flex-col mb-1 ">
                    <h6
                      className={` ${
                        user ? "text-xs" : "text-sm"
                      } lg:text-sm font-semibold`}
                    >
                      {user ? fullname : "Anonymous"}
                    </h6>

                    {user && (
                      <span className="text-xs lg:text-xs text-muted-foreground">
                        Dedicated Poster
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* TODO: Implement a logout function */}
              <Button
                className="w-full flex gap-x-2 items-center"
                onClick={user ? handleLogout : handleLogin}
                disabled={isProcessingLogout}
              >
                {user ? (
                  <div className="flex gap-x-1 items-center">
                    {isProcessingLogout ? (
                      <LoaderCircle size={20} className="animate-spin" />
                    ) : (
                      <LogOut size={20} />
                    )}
                    <span>
                      {isProcessingLogout ? "Logging out..." : "Log Out"}
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-x-1 items-center">
                    <LogIn size={20} />
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
