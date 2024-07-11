import { useUserContext } from "@/context/UserContext";
import CloseButton from "../../CloseButton";
import { capitalizeFirstLetter } from "@/utils/utils";
import GameShowcase from "./GameShowcase";
import { Button } from "@/components/ui/button";
import Content from "./Content";
import { MdOutlineGif } from "react-icons/md";
import { Images } from "lucide-react";
import { useState } from "react";

const CreatePost = () => {
  const { authenticatedUserObject } = useUserContext();
  const { imgURL, displayname } = authenticatedUserObject;

  const [contentType, setContentType] = useState<string | null>(null);

  return (
    <>
      <div className="bg-secondary w-[90%] h-fit md:w-1/2 xl:w-[23%] rounded shadow-lg p-4 flex flex-col gap-y-4">
        <div className="flex justify-between items-center border border-b-slate-600 pb-2">
          <h1 className="text-base lg:text-lg font-semibold">Create Post</h1>
          <CloseButton />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <img
              src={imgURL}
              alt={`photo_${displayname}`}
              className="w-8 h-8 rounded-full"
            />
            <h4 className="font-semibold">
              {capitalizeFirstLetter(displayname)}
            </h4>
          </div>

          <GameShowcase />
        </div>

        <Content contentType={!contentType ? "" : contentType} />

        {/* TODO: Centralized this by redux, so that the content will be dynamically changed. */}
        <div className="flex justify-end gap-x-2 items-center">
          <div
            className="bg-slate-700 p-1.5 rounded-full hover:bg-slate-600 cursor-pointer"
            onClick={() => setContentType("image")}
          >
            <Images size={18} />
          </div>

          <div
            className="bg-slate-700 p-1 rounded-full hover:bg-slate-600 cursor-pointer"
            onClick={() => setContentType("gif")}
          >
            <MdOutlineGif size={24} />
          </div>
        </div>

        <Button>Post</Button>
      </div>
    </>
  );
};

export default CreatePost;
