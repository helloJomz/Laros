import { useRandomGifQuery } from "@/app/features/giphy/giphySlice";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const RandomGiphyGif = () => {
  const { data: giphyData, isLoading, refetch } = useRandomGifQuery();
  //   const [isPlaying, setIsPlaying] = useState<boolean>(true);

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="h-full w-full flex justify-center items-center">
          <LoaderCircle size={128} className="animate-spin opacity-7" />
        </div>
      ) : (
        <>
          <div className="relative z-50">
            <div className="absolute left-4 mt-4 ">
              {/* Credits Profile Icon */}
              <div
                className="flex items-center gap-x-2 bg-white shadow-lg text-black w-fit ps-1 pe-4 py-1 rounded-lg cursor-pointer hover:bg-slate-100 "
                onClick={() =>
                  window.open(giphyData?.user.profile_url, "_blank")
                }
              >
                <img
                  src={giphyData?.user.avatar_url ?? ""}
                  alt={giphyData?.user.username}
                  className="rounded-full h-8 w-8 object-cover object-center bg-black shadow-sm"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-x-1">
                    <span className="text-sm font-semibold">
                      {giphyData?.user.display_name}
                    </span>
                    <img
                      src="https://img.icons8.com/?size=100&id=p9jKUHLk5ejE&format=png&color=000000"
                      alt=""
                      className="w-[13px] "
                    />
                  </div>
                  <span className="text-[0.65rem] mt-[-0.2rem] text-muted-foreground">{`@${giphyData?.user.username}`}</span>
                </div>
              </div>
            </div>
          </div>
          <video
            className="w-full h-full object-cover z-[-99999]"
            src={giphyData?.mp4_link}
            muted
            autoPlay
            loop
            disablePictureInPicture
            onEnded={() => refetch()}
          />
        </>
      )}
    </div>
  );
};

export default RandomGiphyGif;
