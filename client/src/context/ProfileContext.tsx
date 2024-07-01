import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { type UserObject } from "@/types/Profile";
import { useGetUserByDisplayNameMutation } from "@/app/features/users/userApiSlice";
import { capitalizeFirstLetter, delay } from "@/utils/utils";

interface ProfileContextType {
  isAuthProfile: boolean;
  isProfileError: boolean;
  isProfileLoading: boolean;
  profileEndpoint: string;
  userProfileObject: UserObject | undefined;
  setUserProfileObject: (user: UserObject | undefined) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authenticatedUserObject } = useUserContext();
  const { displayname: authDisplayName } = authenticatedUserObject;
  const { displayname: displayNameFromURL } = useParams();

  const profileEndpoint: string = displayNameFromURL!.replace(/\//g, "");

  // STATES
  const [userProfileObject, setUserProfileObject] = useState<
    UserObject | undefined
  >(undefined);

  console.log(userProfileObject);

  // API
  const [getUserByDisplayName, { isLoading, isError }] =
    useGetUserByDisplayNameMutation();

  // STATES
  const [isProfileFetching, setIsProfileFetching] = useState<boolean>(false);

  // RE-RENDER THE PAGE WITH USER'S OBJECT BASED ON THE URL ENDPOINT OF THE PROFILE
  useEffect(() => {
    const executeGetUserByDisplayNameProfile = async () => {
      setIsProfileFetching(true);
      await delay(1500);
      const { data, error } = await getUserByDisplayName(profileEndpoint || "");
      setUserProfileObject(!error ? { ...data } : undefined);
      setIsProfileFetching(false);
    };
    executeGetUserByDisplayNameProfile();

    return () => {
      setUserProfileObject(undefined);
    };
  }, [profileEndpoint]);

  // CHANGING OF TAB NAME OF BROWSER
  useEffect(() => {
    document.title = `Laros | ${capitalizeFirstLetter(displayNameFromURL!)}`;
  }, [displayNameFromURL]);

  // ERROR HANDLERS
  const isAuthProfile: boolean = displayNameFromURL === authDisplayName;
  const isProfileError: boolean = isError && !userProfileObject;
  const isProfileLoading: boolean = isLoading || isProfileFetching;

  return (
    <ProfileContext.Provider
      value={{
        isAuthProfile,
        isProfileError,
        isProfileLoading,
        setUserProfileObject,
        userProfileObject,
        profileEndpoint,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error(
      "useProfileContext must be used within a APISearchContextProvider"
    );
  }
  return context;
};

export { ProfileContextProvider, useProfileContext };
