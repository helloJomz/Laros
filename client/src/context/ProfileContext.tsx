import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "./UserContext";
import { type UserObject } from "@/types/Profile";
import { useGetUserByDisplayNameMutation } from "@/app/features/users/userApiSlice";
import { useCheckProfileRelationshipStatusQuery } from "@/app/features/profile/profileApiSlice";
import { capitalizeFirstLetter, delay } from "@/utils/utils";

interface ProfileContextType {
  isAuthProfile: boolean;
  isProfileError: boolean;
  isProfileLoading: boolean;
  isHeartUser: boolean;
  isFollowingUser: boolean;
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

  // API
  const [getUserByDisplayName, { isLoading, isError }] =
    useGetUserByDisplayNameMutation();

  const { data: relationshipStatus, isLoading: isRelationshipStatusLoading } =
    useCheckProfileRelationshipStatusQuery(
      {
        yourUID: authenticatedUserObject.userid,
        otherUserUID: userProfileObject ? userProfileObject.userid : "",
      },
      {
        skip:
          userProfileObject === undefined ||
          profileEndpoint === authDisplayName,
      }
    );

  const [isProfileFetching, setIsProfileFetching] = useState<boolean>(false);

  // RE-RENDER THE PAGE WITH USER'S OBJECT BASED ON THE URL ENDPOINT OF THE PROFILE
  useEffect(() => {
    const executeGetUserByDisplayNameProfile = async () => {
      setIsProfileFetching(true);
      await delay(1000);
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
  }, [profileEndpoint]);

  // ERROR HANDLERS
  const isAuthProfile: boolean = displayNameFromURL === authDisplayName;
  const isProfileError: boolean = isError;
  const isProfileLoading: boolean =
    isLoading ||
    isProfileFetching ||
    isRelationshipStatusLoading ||
    !userProfileObject;
  const isHeartUser: boolean = relationshipStatus && relationshipStatus.heart;
  const isFollowingUser: boolean =
    relationshipStatus && relationshipStatus.following;

  return (
    <ProfileContext.Provider
      value={{
        isAuthProfile,
        isProfileError,
        isProfileLoading,
        setUserProfileObject,
        userProfileObject,
        profileEndpoint,
        isHeartUser,
        isFollowingUser,
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
