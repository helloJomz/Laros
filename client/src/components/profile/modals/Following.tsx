import { Button } from "@/components/ui/button";
import { useNavbarContext } from "@/context/NavbarContext";
import { useProfileContext } from "@/context/ProfileContext";
import { Snail } from "lucide-react";
import { IoClose } from "react-icons/io5";

const Following = () => {
  const { windowWidth } = useNavbarContext();
  const { userProfileObject, setShowProfileModal } = useProfileContext();

  const followingCount: number = userProfileObject
    ? userProfileObject.following
    : 0;

  const testImg =
    "https://www.icegif.com/wp-content/uploads/2023/04/icegif-673.gif";

  const ten: any[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "10",
    "10",
    "10",
    "10",
  ];

  //TODO: Put Backend of this!

  return (
    <>
      <div className="bg-secondary w-[90%] h-[80%] md:w-1/2 md:h-[60%] xl:w-1/3 rounded shadow-lg ps-4 pe-2 md:pe-4 pt-3 pb-8  flex flex-col gap-y-4">
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-base lg:text-lg font-semibold">Following</h1>
            <Button
              variant={"ghost"}
              className="rounded-full hover:bg-slate-600 p-3"
              onClick={() => setShowProfileModal("")}
            >
              <IoClose size={20} />
            </Button>
          </div>
          <div className="mt-[-0.5rem] ">
            <span className="text-xs text-muted-foreground">
              {`You are following ${followingCount} gamer${
                followingCount > 1 ? "s" : ""
              }`}
            </span>
          </div>
        </div>

        {ten.length > 0 ? (
          <>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 justify-center gap-y-2 gap-x-2 overflow-y-auto pe-2">
              {ten.map(() => (
                <>
                  <div className="flex items-center justify-between py-2 ps-2 pe-4 bg-slate-700 w-full rounded">
                    <div className="flex gap-x-2">
                      <img
                        src={testImg}
                        alt=""
                        className="rounded-full w-12 h-12 object-cover"
                      />
                      <div className="flex flex-col justify-center">
                        <h1>Kittymin</h1>
                        <span className="text-xs text-muted-foreground mt-[-0.1rem]">
                          Honorary Poster
                        </span>
                      </div>
                    </div>
                    <span className="bg-gray-900 text-xs py-1 px-2 rounded cursor-pointer hover:bg-gray-800">
                      Unfollow
                    </span>
                  </div>
                </>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex-grow flex flex-col justify-center items-center gap-y-2 md:pb-12">
              <Snail
                size={windowWidth <= 640 ? 180 : 200}
                className="text-muted-foreground"
              />
              <span className="text-xs md:text-sm text-muted-foreground">
                Oops! You are currently not following anyone.
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Following;
