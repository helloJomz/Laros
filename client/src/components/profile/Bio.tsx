import { useState } from "react";
import { Button } from "../ui/button";
import { useProfileContext } from "@/context/ProfileContext";
import { useAddBioMutation } from "@/app/features/profile/profileApiSlice";
import { useUserContext } from "@/context/UserContext";

const Bio = () => {
  const [openAddBio, setOpenAddBio] = useState<boolean>(false);
  const [content, setContent] = useState("");

  const { authenticatedUserObject } = useUserContext();
  const { userid } = authenticatedUserObject;

  const { isAuthProfile, userProfileObject } = useProfileContext();

  const bio = (userProfileObject && userProfileObject.bio) || "";

  const [addBio] = useAddBioMutation();

  // TODO: Continue the backend of this
  const handleSaveBio = async () => {
    await addBio({ yourUID: userid, bio: content });
    setOpenAddBio(false);
    // Should cliently show the content so that it does need to refresh the page.
  };

  if (isAuthProfile && openAddBio)
    return (
      <>
        <div>
          <div>
            <textarea
              className="w-full bg-muted-foreground rounded resize-none focus:border-none p-2 text-sm"
              onChange={(e) => setContent(e.target.value)}
              maxLength={50}
            />
            <div className="text-end text-xs">
              <span>{`${content.length} / 50`}</span>
            </div>
          </div>
          <div className="flex gap-x-2 justify-end mt-2">
            <Button
              onClick={() => setOpenAddBio(false)}
              className="bg-slate-200 text-black px-3 text-sm hover:text-white"
            >
              Cancel
            </Button>
            <Button
              disabled={content.length <= 2}
              className="px-3 text-sm"
              onClick={handleSaveBio}
            >
              Save
            </Button>
          </div>
        </div>
      </>
    );

  if (isAuthProfile && bio.length === 0)
    return (
      <>
        <Button
          className="w-full text-xs h-8 md:text-sm"
          onClick={() => setOpenAddBio(true)}
        >
          Add Bio
        </Button>
      </>
    );

  if (userProfileObject && bio.length > 0)
    return (
      <>
        <div className="text-sm text-center border-b border-slate-600 pb-2 w-full">
          <span className="break-all">{bio}</span>
        </div>
        {isAuthProfile && (
          <Button
            className="w-full text-xs h-8 md:text-sm"
            onClick={() => setOpenAddBio(true)}
          >
            Edit Bio
          </Button>
        )}
      </>
    );
};

export default Bio;
