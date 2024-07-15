import { Gamepad, X } from "lucide-react";
import { useState } from "react";

const GameShowcase = () => {
  const [isAddGameClicked, setIsAddGameClicked] = useState<boolean>(false);

  const testImg =
    "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b";

  if (!isAddGameClicked)
    return (
      <>
        <div
          className="bg-slate-700 p-1.5 rounded-full hover:bg-slate-600 cursor-pointer"
          onClick={() => setIsAddGameClicked(!isAddGameClicked)}
        >
          <Gamepad size={18} />
        </div>
      </>
    );

  if (isAddGameClicked)
    return (
      <>
        <div className="flex items-center gap-x-2">
          <div className="relative" onClick={() => setIsAddGameClicked(false)}>
            <div className="flex items-center gap-x-1 rounded-xl bg-slate-700 hover:bg-red-500 py-0.5 ps-1 pe-3 text-xs cursor-pointer">
              <img
                src={testImg}
                alt=""
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-semibold">League of Legends</span>
            </div>
            <div className="absolute top-[-0.3rem] right-0 p-0.5 rounded-full bg-red-500 ring-1 ring-secondary cursor-pointer hover:bg-red-400">
              <X size={10} />
            </div>
          </div>

          <div
            className="bg-slate-700 p-1.5 rounded-full hover:bg-slate-600 cursor-pointer"
            onClick={() => setIsAddGameClicked(!isAddGameClicked)}
          >
            <Gamepad size={18} />
          </div>
        </div>
      </>
    );
};

export default GameShowcase;
