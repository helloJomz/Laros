import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useProfileContext } from "@/context/ProfileContext";
import { useAddBioMutation } from "@/app/features/profile/profileApiSlice";
import { useUserContext } from "@/context/UserContext";

const Bio = () => {
  const [openAddBio, setOpenAddBio] = useState<boolean>(false);
  const [bioPlaceholder, setBioPlaceholder] = useState<string>("");

  const { authenticatedUserObject } = useUserContext();
  const { userid } = authenticatedUserObject;

  const { isAuthProfile, userProfileObject } = useProfileContext();

  const bio = (userProfileObject && userProfileObject.bio) || "";

  const [content, setContent] = useState<string>(
    (bioPlaceholder ? bioPlaceholder : bio) || ""
  );

  const [isEmpty, setIsEmpty] = useState<boolean>(
    bio || bioPlaceholder ? false : true
  );

  const [addBio] = useAddBioMutation();

  const handleSaveBio = async () => {
    if (content === bio) {
      setOpenAddBio(false);
    } else {
      const { data, error } = await addBio({ yourUID: userid, bio: content });
      if (!error) {
        setBioPlaceholder(data.bio);
        setIsEmpty(data.bio ? false : true);
        setOpenAddBio(false);
      }
    }
  };

  if (isAuthProfile && openAddBio)
    return (
      <>
        <div>
          <div>
            <textarea
              className="w-full bg-muted-foreground rounded resize-none focus:border-none p-2 text-sm"
              onChange={(e) => setContent(e.target.value)}
              value={content}
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
            <Button className="px-3 text-sm" onClick={handleSaveBio}>
              Save
            </Button>
          </div>
        </div>
      </>
    );

  if (isAuthProfile && (!bio || !bioPlaceholder) && isEmpty)
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

  return (
    <>
      {!isEmpty && (bio || bioPlaceholder) && (
        <div className="text-sm text-center border-b border-slate-600 pb-2 w-full">
          <span className="break-all">{bioPlaceholder || bio}</span>
        </div>
      )}

      {isAuthProfile && !isEmpty && (bio || bioPlaceholder) && (
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
