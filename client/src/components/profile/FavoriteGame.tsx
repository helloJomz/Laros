import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { FiMoreVertical } from "react-icons/fi";

type FavoriteGameProps = React.HTMLAttributes<HTMLDivElement> & {
  userid: string;
};

const FavoriteGame = ({ userid, className }: FavoriteGameProps) => {
  // TODO: Backend
  return (
    <>
      <div
        className={cn(
          "flex flex-col gap-y-2 mt-4 text-center lg:mt-0 lg:text-start lg:ml-[20rem]",
          className
        )}
      >
        <span className="text-xs text-muted-foreground">Favorite games</span>
        <div className="flex justify-center lg:justify-normal gap-x-1">
          <img
            src="https://yt3.googleusercontent.com/wzEypbVsmY9BI-IbLwVius4UvC2rejtJB_PTXAdPpYXQ07EIjl5Ms55NCFq_dILwONpxrzE2xA=s900-c-k-c0x00ffffff-no-rj"
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <img
            src="https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-d9ca2c0fbaff9d80e8dedfbd726aa438"
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <img
            src="https://cdn.oneesports.gg/cdn-data/2023/04/csgo_ak_skin_dust2.jpg"
            alt=""
            className="w-8 h-8 rounded-full object-cover"
          />
          <Badge className="ms-1 text-xs cursor-pointer">
            <span>3 more</span>
          </Badge>
        </div>
      </div>
    </>
  );
};

export default FavoriteGame;
