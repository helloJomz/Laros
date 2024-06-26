import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserByDisplayNameMutation } from "@/app/features/users/userApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/features/auth/authSlice";
import PageNotFound from "./PageNotFound";
import { delay } from "@/utils/utils";
import { capitalizeFirstLetter } from "@/utils/utils";
import { useNavbarContext } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Intro from "@/components/profile/Intro";
import CreatePost from "@/components/profile/CreatePost";
import Post from "@/components/profile/Post";

const ProfilePage = () => {
  const { displayname: displayNameFromURL } = useParams();
  const { windowWidth } = useNavbarContext();

  const [getUserByDisplayName, { isLoading, isError }] =
    useGetUserByDisplayNameMutation();

  const authUser = useSelector(selectCurrentUser);

  const [displayProfileObject, setDisplayProfileObject] = useState<{
    userid: string;
    displayname: string;
    email: string;
    imgURL: string;
  }>();

  const { userid, displayname, email, imgURL } = displayProfileObject || {};

  useEffect(() => {
    if (authUser.displayname === displayNameFromURL) {
      setDisplayProfileObject({ ...authUser });
    } else {
      const executeGetUserByDisplayNameProfile = async () => {
        await delay(1500);
        const { data, error } = await getUserByDisplayName(
          displayNameFromURL || ""
        );
        setDisplayProfileObject(!error ? { ...data } : {});
      };
      executeGetUserByDisplayNameProfile();
    }
    return () => {
      setDisplayProfileObject(undefined);
    };
  }, [displayNameFromURL]);

  // DISPLAY LOADING ( TODO: SKELETON ON SHACDN UI ) WHEN THE PAGE FIRST LOADS.
  if (isLoading || displayProfileObject === undefined)
    return (
      <>
        <span>Loading...</span>
      </>
    );

  if (isError || Object.keys(displayProfileObject).length === 0)
    return <PageNotFound />;

  return (
    <div className="w-full lg:w-1/2 m-auto">
      <div
        className={cn("flex flex-col gap-y-36 lg:gap-y-60 ", {
          "gap-y-32": windowWidth <= 500,
        })}
      >
        <div>
          <div className="relative w-full">
            <div className="relative h-48 w-full bg-background lg:rounded-br-sm lg:rounded-bl-sm overflow-hidden">
              {/* Cover Photo */}
              <img
                src={imgURL}
                alt=""
                className="w-full h-full object-cover opacity-50"
              />

              {/* LIKE AND FOLLOW BUTTONS FOR MOBILE VIEWPORT */}
              <div
                className={cn(
                  "absolute block bottom-0 right-0 text-3xl text-white z-50 w-1/2",
                  {
                    hidden: windowWidth > 500,
                  }
                )}
              >
                <div className="flex gap-x-2 justify-end pe-2">
                  <div className="flex items-center gap-x-1">
                    <span className="text-xs font-semibold">1232</span>
                    <div className="cursor-pointer hover:text-red-500 rounded-full hover:bg-muted p-2 text-center">
                      <FaHeart />
                    </div>
                  </div>

                  <div className="hidden md:block border border-muted w-1/2 ms-auto" />

                  <div className="flex items-center gap-x-1">
                    <span className="text-xs font-semibold">1.2k</span>
                    <div className="cursor-pointer hover:text-emerald-500 rounded-full hover:bg-muted p-2 text-center">
                      <IoPersonAdd />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={cn("relative top-[-4rem]", {
                "top-[-2.5rem]": windowWidth <= 500,
              })}
            >
              {/* Display Photo */}
              <div
                className={cn(
                  "absolute left-2 lg:left-0 border-4 border-background rounded-full shadow-lg w-48 h-48 lg:w-72 lg:h-72 z-[9999] ",
                  {
                    "w-40 h-40": windowWidth <= 500,
                  }
                )}
              >
                <img
                  src={imgURL}
                  alt={`${displayname}_picture`}
                  className="w-full h-full rounded-full object-cover hover:brightness-150 cursor-pointer"
                />
              </div>

              {/* user Header */}
              <div
                className={cn(
                  "absolute top-20 flex flex-col gap-y-6 lg:top-24 w-full",
                  {
                    "top-14": windowWidth <= 500,
                  }
                )}
              >
                <div className="flex justify-between pe-4">
                  <div
                    className={cn(
                      "flex flex-col justify-center gap-y-2 ml-56 lg:ml-[20rem]",
                      {
                        "ml-48": windowWidth <= 500,
                      }
                    )}
                  >
                    <div>
                      <span className="text-xs text-blue-500">
                        Honorary Poster
                      </span>
                      <h1 className=" text-2xl lg:text-4xl font-bold">
                        {capitalizeFirstLetter(displayname!)}
                      </h1>
                    </div>

                    <span className="text-muted-foreground text-sm">
                      467 Posts
                    </span>
                  </div>

                  {/* Like and Follow Button on larger viewport*/}
                  <div
                    className={cn(
                      "hidden flex-col px-2 py-1 shadow-sm w-fit gap-y-2 items-center justify-center text-2xl",
                      {
                        flex: windowWidth > 500,
                      }
                    )}
                  >
                    <div className="flex items-center gap-x-1">
                      <span className="text-xs font-semibold">1232</span>
                      <div
                        className="cursor-pointer hover:text-red-500 rounded-full hover:bg-muted p-2 flex justify-center items-center"
                        onClick={() => console.log("hi")}
                      >
                        <FaHeart />
                      </div>
                    </div>

                    <div className="w-full border border-muted" />

                    <div className="flex items-center gap-x-1">
                      <span className="text-xs font-semibold">1.2k</span>
                      <div
                        className="cursor-pointer hover:text-emerald-500 rounded-full hover:bg-muted p-2 text-center"
                        onClick={() => console.log("hi")}
                      >
                        <IoPersonAdd />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col gap-y-2 ml-56 lg:ml-[20rem]">
                  <span className="text-xs text-muted-foreground">
                    Favorite games
                  </span>
                  <div className="flex gap-x-1">
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
                    <Badge className="ms-1 text-xs ">3 more</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-x-6 gap-y-4 px-4">
          <Intro />

          <div className="flex-1 rounded h-auto md:h-full overflow-y-auto flex flex-col gap-y-4 pb-4">
            <CreatePost imgURL={imgURL!} />

            <h4 className="font-bold">Posts</h4>

            <Post imgURL={imgURL!} displayname={displayname!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
