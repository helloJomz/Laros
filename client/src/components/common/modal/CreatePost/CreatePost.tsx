import { useUserContext } from "@/context/UserContext";
import CloseButton from "../../CloseButton";
import { capitalizeFirstLetter, generatePostRandomString } from "@/utils/utils";
import GameShowcase from "./GameShowcase";
import { Button } from "@/components/ui/button";
import { MdOutlineGif } from "react-icons/md";
import { Images, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePost } from "@/hooks/usePost";
import Content from "./Content";
import { useModal } from "@/hooks/useModal";

//FIXME: When create post with image the modal does not close.

const CreatePost = () => {
  const { authenticatedUserObject } = useUserContext();
  const { imgURL, displayname, userid } = authenticatedUserObject;

  const {
    setPreviewImg,
    usePreviewImg,
    usePreviewContent,
    setPreviewContent,
    postStates,
  } = usePost();

  const { savePost, setPost, isPostSaving, isPostSaveError } = postStates;

  const { setModalOpen } = useModal();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | string | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const objectURL = URL.createObjectURL(file);
      setPreviewImg(objectURL);
    }
  };

  const handleSubmitPost = async () => {
    if (!usePreviewContent && !selectedFile) {
      //TODO: put error here
      console.log("error");
    }

    // FOR SELECTED FILE FROM LOCAL SYSTEM
    if (selectedFile && typeof selectedFile === "object") {
      const blob = selectedFile.slice(0, selectedFile.size, selectedFile.type);
      const newFile = new File(
        [blob],
        generatePostRandomString(selectedFile.name),
        { type: selectedFile.type }
      );
      const formData = new FormData();

      const postObject = {
        uid: userid,
        file: newFile,
        content: usePreviewContent || "",
        //TODO: Implement this object
        game: "hi",
      };

      formData.append("uid", postObject.uid);
      formData.append("file", postObject.file);
      formData.append("content", postObject.content);
      formData.append("game", postObject.game);

      const { data, error } = await savePost(formData);

      if (!error) {
        setPreviewContent("");
        setPreviewImg("");
        setPost(data);
        setModalOpen(null);
      }
    }

    //For GIF
    if (typeof selectedFile === "string") {
      return null;
    }

    // If no image is selected
    if (!selectedFile) {
      if (!usePreviewContent) {
        //TODO: Error here no content
        return null;
      }

      const postObject = {
        uid: userid,
        content: usePreviewContent,
        //TODO: Implement this object
        game: "hi",
      };

      const { data, error } = await savePost(postObject);

      if (!error) {
        setPreviewContent("");
        setPreviewImg("");
        setPost(data);
        setModalOpen(null);
      }
    }
  };

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (!usePreviewImg) {
      setSelectedFile(null);
    }
  }, [setPreviewImg, fileInputRef.current]);

  return (
    <>
      <div className="bg-secondary w-[90%] h-fit md:w-1/2 xl:w-[23%] rounded shadow-lg p-4 flex flex-col gap-y-4 justify-center">
        <div className="flex justify-between items-center border border-b-slate-600 pb-2">
          <h1 className="text-base lg:text-lg font-semibold">Create Post</h1>
          <CloseButton />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-x-2 items-center">
            <img
              src={imgURL}
              alt={`photo_${displayname}`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <h4 className="font-semibold">
              {capitalizeFirstLetter(displayname)}
            </h4>
          </div>

          <GameShowcase />
        </div>

        <Content />

        <div className="flex justify-end gap-x-2 items-center">
          {!usePreviewImg && (
            <div
              className="bg-slate-700 p-1.5 rounded-full hover:bg-slate-600 cursor-pointer"
              onClick={handleImageClick}
            >
              <Images size={18} />
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg, image/gif"
            hidden
          />

          <div
            className="bg-slate-700 p-1 rounded-full hover:bg-slate-600 cursor-pointer"
            // onClick={() => setContentType("gif")}
          >
            <MdOutlineGif size={24} />
          </div>
        </div>

        <Button onClick={handleSubmitPost} disabled={isPostSaving}>
          {isPostSaving ? <LoaderCircle className="animate-spin" /> : "Post"}
        </Button>
      </div>
    </>
  );
};

export default CreatePost;
