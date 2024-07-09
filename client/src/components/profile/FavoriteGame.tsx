import { cn } from "@/lib/utils";
import { IoIosMore } from "react-icons/io";

type FavoriteGameProps = React.HTMLAttributes<HTMLDivElement>;

const FavoriteGame = ({ className }: FavoriteGameProps) => {
  // TODO: Backend //userid
  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-y-2 mt-4 text-center lg:mt-0 lg:text-start lg:ml-[20rem]",
          className
        )}
      >
        <span className="text-xs text-muted-foreground">Favorite games</span>
        <div className="flex justify-center lg:justify-normal gap-x-1 -space-x-2">
          <img
            src="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
            alt=""
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
          <img
            src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-d9ca2c0fbaff9d80e8dedfbd726aa438"
            alt=""
            className="w-8 h-8 rounded-full object-cover ring ring-secondary lg:ring-background cursor-pointer"
          />
          <img
            src="https://cdn.oneesports.gg/cdn-data/2023/04/csgo_ak_skin_dust2.jpg"
            alt=""
            className="w-8 h-8 rounded-full object-cover ring ring-secondary lg:ring-background cursor-pointer"
          />
          <div className="text-xs cursor-pointer ring ring-secondary lg:ring-background rounded-full w-8 h-8 text-center flex justify-center items-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-150">
            <IoIosMore size={12} className="font-bold" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FavoriteGame;
