import { useState } from "react";
import { Button } from "../ui/button";
import { useAddBioMutation } from "@/app/features/profile/profileApiSlice";
import { useUserContext } from "@/context/UserContext";
import { useProfile } from "@/hooks/useProfile";

const Bio = () => {
  const [openAddBio, setOpenAddBio] = useState<boolean>(false);

  const { authenticatedUserObject } = useUserContext();
  const { userid } = authenticatedUserObject;

  const { userObject, isAuthProfile, setBio, useBio } = useProfile();
  const bio = userObject?.bio;

  const [isEmpty, setIsEmpty] = useState<boolean>(bio || useBio ? false : true);
  const [content, setContent] = useState<string>(bio);
  const [addBio] = useAddBioMutation();

  const handleSaveBio = async () => {
    if (content === bio) {
      setOpenAddBio(false);
    } else {
      const { data, error } = await addBio({ yourUID: userid, bio: content });
      if (!error) {
        setIsEmpty(data.bio ? false : true);
        setBio(data?.bio);
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
              className="w-full bg-slate-600 rounded resize-none focus:border-none p-2 text-sm"
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
              className="bg-slate-200 text-black px-3 py-1 text-xs  hover:text-white"
            >
              Cancel
            </Button>
            <Button className="px-3 py-1 text-xs " onClick={handleSaveBio}>
              Save
            </Button>
          </div>
        </div>
      </>
    );

  if (isAuthProfile && (!bio || !useBio) && isEmpty)
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
      {!isEmpty && (bio || useBio) && (
        <div className="text-sm text-center border-b border-slate-600 pb-2 w-full">
          <span className="break-all">{useBio || bio}</span>
        </div>
      )}

      {isAuthProfile && !isEmpty && (bio || useBio) && (
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
