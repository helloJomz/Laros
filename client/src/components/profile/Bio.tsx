import { useState } from "react";
import { Button } from "../ui/button";

const Bio = () => {
  const testBio = "";

  const [editBio, setEditBio] = useState<boolean>(false);
  const [content, setContent] = useState("");

  // FIXME: Should handle the button should not be seen if you are not the user profile.

  if (testBio.length > 0)
    return (
      <>
        <div className="text-sm text-center border-b border-muted-foreground pb-2">
          <span>{testBio}</span>
        </div>
      </>
    );

  if (editBio)
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
              onClick={() => setEditBio(false)}
              className="bg-slate-200 text-black px-3 text-sm hover:text-white"
            >
              Cancel
            </Button>
            <Button disabled={content.length <= 2} className="px-3 text-sm">
              Save
            </Button>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Button className="w-full" onClick={() => setEditBio(true)}>
        Add Bio
      </Button>
    </>
  );
};

export default Bio;
