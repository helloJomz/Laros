import { useParams } from "react-router-dom";
import { useGetGameByGuidQuery } from "@/app/features/game/gameApiSlice";
import { useSelector } from "react-redux";
import {
  selectGameObject,
  selectIsGameError,
  selectIsGameLoading,
} from "@/app/features/game/gameSlice";
import {
  Bookmark,
  Gamepad2,
  Heart,
  Minus,
  Plus,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";

const GamePage = () => {
  useGetGameByGuidQuery(useParams().guid!, { refetchOnMountOrArgChange: true });
  const { windowWidth } = useNavbarContext();

  const listOfNavBtns = [{ name: "Overview" }];

  const isGameLoading = useSelector(selectIsGameLoading);
  const isGameError = useSelector(selectIsGameError);
  const gameObject = useSelector(selectGameObject);

  const [selectedBtn, setSelectedBtn] = useState<string>("Overview");
  const [showAllImage, setShowAllImage] = useState<boolean>(false);

  if (isGameLoading)
    return (
      <>
        <span>Loading...</span>
      </>
    );

  if (isGameError)
    return (
      <>
        <span>Error...</span>
      </>
    );

  const ReactButtons = () => {
    return (
      <div className="flex gap-x-2">
        <div className="flex gap-x-2 items-center">
          <span className="text-xs font-semibold">1k</span>
          <div className="w-8 h-8 rounded-full bg-slate-600 flex justify-center items-center">
            <Heart size={20} />
          </div>
        </div>
        <div className="flex gap-x-2 items-center">
          <span className="text-xs font-semibold">50</span>
          <div className="w-8 h-8 rounded-full bg-slate-600 flex justify-center items-center">
            <Bookmark size={20} />
          </div>
        </div>
      </div>
    );
  };

  const Comments = () => {
    return (
      <div className="w-full bg-secondary h-fit">
        <div className="flex gap-x-1 justify-center items-center border-b border-slate-600 p-2">
          <MessageCircle fill="#ffff" size={16} />
          <span className="font-semibold text-sm">Comments</span>
        </div>

        <div className="p-4 w-full flex flex-col gap-y-2">
          <div className="flex flex-col">
            <div className="flex gap-x-2 w-full">
              <img
                src={gameObject.image.original_url}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex flex-col gap-y-0.5">
                <span className="font-semibold text-sm">Test Name</span>
                <div className="bg-slate-600 py-0.5 px-2 rounded-md w-[80%]">
                  <span className="text-xs break-all w-full">asd</span>
                </div>
              </div>
            </div>
            <span className="text-[0.65rem] ps-10 text-muted-foreground">
              1m
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-x-2 w-full">
              <img
                src={gameObject.image.original_url}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex flex-col gap-y-0.5">
                <span className="font-semibold text-sm">Test Name</span>
                <div className="bg-slate-600 p-2 rounded-md w-[80%] flex flex-col">
                  <span className="text-xs break-all w-full">
                    asdasdasdasdasdasdasdasdasdasdasdasdasdasdasd
                  </span>
                </div>
              </div>
            </div>
            <span className="text-[0.65rem] ps-10 text-muted-foreground">
              1m
            </span>
          </div>
        </div>
      </div>
    );
  };

  const Overview = () => {
    return (
      <>
        <div className="flex flex-col gap-y-6 mt-4 pb-6 px-2">
          <div className="flex flex-col gap-y-2">
            <div className="bg-secondary rounded px-2 py-1">
              <span className="font-semibold text-sm">Description</span>
            </div>

            <p className="text-white text-sm break-before-all">
              {gameObject.deck}
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="bg-secondary rounded px-2 py-1">
              <span className="font-semibold text-sm">Genres</span>
            </div>
            <div className="rounded w-full flex gap-x-2 flex-wrap text-center gap-y-2 ">
              {gameObject.genres.map((p: any, index: number) => (
                <Badge
                  key={`${index}-${p.id}`}
                  className="bg-gradient-to-tr from-sky-500 to-indigo-600 w-fit"
                >
                  {p.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <div className="bg-secondary rounded px-2 py-1">
              <span className="font-semibold text-sm">Platforms</span>
            </div>
            <div className="rounded w-full flex gap-x-2 flex-wrap text-center gap-y-2">
              {gameObject.platforms.map((p: any) => (
                <Badge
                  key={p.id}
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-600 w-fit"
                >
                  {p.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-secondary pb-1 rounded">
            <div className="py-2 border-b border-slate-600 text-sm">
              <span className="font-semibold ms-2">{`Images (${gameObject.images.length})`}</span>
            </div>

            <div className="grid grid-cols-2 gap-1 px-0.5 mt-1 relative">
              {gameObject.images
                .slice(
                  0,
                  !showAllImage
                    ? gameObject.images.length >= 4
                      ? 4
                      : gameObject.images.length
                    : gameObject.images.length
                )
                .map((image: any, index: number) => {
                  if (
                    gameObject.images.length % 2 !== 0 &&
                    gameObject.images.length - 1 === index
                  )
                    return (
                      <div
                        key={image.medium_url}
                        className="w-full h-full rounded col-span-2 px-20"
                      >
                        <img
                          src={image.medium_url}
                          alt=""
                          className="w-full h-fit rounded object-cover"
                        />
                      </div>
                    );

                  return (
                    <div key={image.medium_url} className="w-full h-full ">
                      <img
                        src={image.medium_url}
                        alt=""
                        className="w-full h-fit rounded object-cover "
                      />
                    </div>
                  );
                })}

              {gameObject.images.length - 4 > 0 && (
                <div
                  className={`absolute bottom-2 right-2 bg-secondary z-[999] rounded-full w-10 h-10 flex justify-center items-center`}
                  onClick={() => setShowAllImage((show) => !show)}
                >
                  {!showAllImage ? <Plus size={14} /> : <Minus size={14} />}

                  <span
                    className={`text-xs font-semibold ${
                      !showAllImage ? "mt-0" : "-mt-1"
                    }`}
                  >
                    {gameObject.images.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="h-full w-full overflow-y-auto flex flex-col gap-y-1">
        <div className="bg-secondary lg:px-60 xl:px-[30rem] flex flex-col">
          <div className="w-full h-36 lg:h-64 bg-background md:rounded-bl-lg md:rounded-br-lg shadow-inner">
            <img
              src={gameObject.image.original_url}
              alt=""
              className="w-full h-full object-cover opacity-35 pointer-events-none bg-background md:rounded-bl-lg md:rounded-br-lg"
            />
          </div>

          <div className="bg-secondary w-full lg:py-4 px-2 relative">
            {/* PICTURE OF THE GAME */}
            <div
              className={cn(
                `absolute -bottom-4 w-36 h-36 rounded-full border-4 border-black flex justify-center items-center`,
                {
                  "w-48 h-48 bottom-3": windowWidth > 768,
                }
              )}
            >
              <img
                src={gameObject.image.original_url}
                alt=""
                className="w-full h-full rounded-full object-cover pointer-events-none"
              />
              <div
                className={cn(
                  `absolute  w-6 h-6 rounded-full bg-green-500 flex justify-center items-center bottom-2 right-2 ring-4 ring-background`,
                  {
                    "w-8 h-8": windowWidth > 768,
                  }
                )}
              >
                <Gamepad2 size={windowWidth > 768 ? 20 : 16} />
              </div>
            </div>

            <div
              className={cn(`ps-40 py-4 flex flex-col gap-y-0.5 w-full`, {
                "ps-52 py-8": windowWidth > 768,
              })}
            >
              <span
                className={cn(
                  `text-sm md:text-2xl font-bold w-[95%] break-before-all leading-4`,
                  {
                    "w-1/2": windowWidth > 768,
                  }
                )}
              >
                {gameObject.name}
              </span>
              {gameObject.developers.length > 0 && (
                <div className="flex gap-x-1 text-xs text-muted-foreground w-[95%]">
                  <span className="hover:underline cursor-pointer  break-before-all leading-5">
                    {gameObject.developers[0].name}
                  </span>

                  {gameObject.developers.length > 1 && (
                    <span className="hover:underline cursor-pointer break-before-all leading-5">{`+${
                      gameObject.developers.length - 1
                    }`}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className={cn(
              `bg-secondary px-4 gap-x-3 pb-2 flex justify-end items-center`,
              {
                "pb-4": windowWidth > 768,
              }
            )}
          >
            <ReactButtons />
          </div>

          <div className="w-full bg-secondary px-2">
            <div className=" border-t border-slate-600 grid grid-cols-3 text-center">
              {listOfNavBtns.map((btn: any, index: number) => (
                <div
                  key={index}
                  className="w-full py-3 relative"
                  onClick={() => setSelectedBtn(btn.name)}
                >
                  <span
                    className={`text-sm ${
                      selectedBtn === btn.name ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {btn.name}
                  </span>
                  {selectedBtn === btn.name && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-purple-500 h-1 w-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:px-60 xl:px-[30rem] ">
          {selectedBtn === "Overview" && <Overview />}
          <Comments />
        </div>
      </div>
    </>
  );
};

export default GamePage;
