import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import ButtonIcon from "./ButtonIcon";
import AvatarDisplay from "./AvatarDisplay";
import { LogIn, LogOut } from "lucide-react";
import ToggleTheme from "./ToggleTheme";

const SideMenu = () => {
  return (
    <div>
      <Menubar className="border-none ps-2 relative">
        <MenubarMenu>
          <MenubarTrigger className="flex justify-center items-center h-fit w-fit p-0 ">
            <ButtonIcon
              icon={
                <AvatarDisplay
                  src="https://www.mordeo.org/files/uploads/2022/01/Ezreal-League-of-Legends-2022-4K-Ultra-HD-Mobile-Wallpaper.jpg"
                  fallback="AN"
                  variant="menu"
                />
              }
              variant={"ghost"}
              size={"icon"}
            />
          </MenubarTrigger>
          <MenubarContent className="absolute top-[-0.4rem] right-[-4.5rem] ">
            <div className="w-[15rem] h-[18rem] p-2 flex flex-col justify-between ">
              <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-3 p-2 bg-secondary rounded items-center cursor-pointer hover:bg-slate-700">
                  <img
                    src="https://www.mordeo.org/files/uploads/2022/01/Ezreal-League-of-Legends-2022-4K-Ultra-HD-Mobile-Wallpaper.jpg"
                    alt=""
                    className="rounded-full h-10 w-10 object-cover"
                  />
                  <div className="flex flex-col mb-1 ">
                    <h6 className="text-xs lg:text-sm font-semibold">
                      Jomark Amante
                    </h6>
                    <span className="text-xs lg:text-xs text-muted-foreground">
                      Dedicated Poster
                    </span>
                  </div>
                </div>
              </div>

              <div className="">
                <Button className="w-full flex gap-x-2 items-center">
                  <LogOut size={18} />
                  <span>Log Out</span>
                </Button>
              </div>
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default SideMenu;
