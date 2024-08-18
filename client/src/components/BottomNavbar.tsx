import { usePost } from "@/hooks/usePost";
import { Users, Swords, Bell, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavbar = () => {
  const { homePostRefetch } = usePost().navStates;
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const navigate = useNavigate();
  const currentLocation = useLocation().pathname;

  const isAtHomePage = currentLocation === "/";

  const handleHomeClick = async () => {
    if (isAtHomePage) {
      setIsRefetching(true);
      //REFETCH THE API
      await homePostRefetch();
      setIsRefetching(false);
      return null;
    }
    navigate("/");
  };

  const Buttons = [
    {
      icon: <Users />,
      label: "friends",
      onClick: () => {},
    },

    {
      icon: !isRefetching ? (
        <Swords
          fill={isAtHomePage ? "#a855f7" : "none"}
          stroke={isAtHomePage ? "#a855f7" : "#ffff"}
        />
      ) : (
        <LoaderCircle className="animate-spin" />
      ),
      label: "home",
      onClick: handleHomeClick,
    },

    {
      icon: <Bell />,
      label: "notification",
      onClick: () => {},
    },
  ];

  return (
    <>
      <div className="w-full h-16 bg-gray-900 border-t border-slate-700">
        <div className="flex gap-x-2 justify-between items-center h-full ">
          {Buttons.map(({ icon, onClick, label }, index) => {
            return (
              <div
                key={index}
                className="p-1.5 rounded h-full w-full flex justify-center items-center"
                onClick={onClick}
              >
                {label !== "notification" ? (
                  <>{icon}</>
                ) : (
                  // FOR NOTIFICATION WITH COUNT
                  <div className="relative">
                    {icon}
                    <div className="absolute -top-1.5 -right-1 ring-2 ring-gray-900  bg-red-600 w-4 h-4 rounded-full text-[0.6rem] text-center font-bold">
                      <span className="-ms-0.5">6</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BottomNavbar;
