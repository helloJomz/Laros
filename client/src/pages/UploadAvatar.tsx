import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleDashed } from "lucide-react";
import { IoMdPhotos } from "react-icons/io";
import { useNavbarContext } from "@/context/NavbarContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useUploadAvatarMutation } from "@/app/features/upload/uploadAPI";
import { generateAvatarRandomString } from "@/utils/utils";

const UploadAvatar: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  const [isIconHovered, setIsIconHovered] = useState<boolean>(false);
  const [storedFile, setStoredFile] = useState<File | null>();
  const [uploadAvatar] = useUploadAvatarMutation();

  const location = useLocation();
  const isNewUser = location.state && location.state.isNew;

  const navigate = useNavigate();

  const { windowWidth, setTriggerAlertFooter } = useNavbarContext();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // HANDLES THE PREVIEW OF THE IMAGE
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5_242_880) {
        setTriggerAlertFooter({
          trigger: "error",
          title: "Image Size Exceeds Limit",
          desc: "Please select an image smaller than 5 MB.",
          alertType: "error",
        });
        // Clear the value of the file input element
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return null;
      }
      setStoredFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsImageHovered(false);
    } else {
      setPreview(null);
      setStoredFile(null);
    }
  };

  const handleUploadAvatar = async () => {
    if (!storedFile) {
      setTriggerAlertFooter({
        trigger: "error",
        title: "No Image Selected",
        desc: "Please choose an image before submitting.",
        alertType: "error",
      });
      return null;
    }

    const blob = storedFile.slice(0, storedFile.size, storedFile.type);
    const newFile = new File(
      [blob],
      generateAvatarRandomString(storedFile.name),
      { type: storedFile.type }
    );
    const formData = new FormData();
    formData.append("imgfile", newFile);

    await uploadAvatar(formData);
  };

  const handleSkipOrCancelButton = () => {
    if (location.state && location.state.from === "/signup") {
      navigate("/");
    }
    navigate(location.state.from);
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-8 justify-center h-full ">
        <div className="text-white text-center font-semibold">
          <h1 className="text-lg md:text-2xl">Upload your Avatar</h1>
          <span className="text-muted-foreground text-xs text-slate-200">
            Click the image to start uploading your avatar
          </span>
        </div>

        <div className="flex flex-col gap-y-8">
          <div className="border-dotted border-white border-2 border-primary w-[20rem] h-[20rem] md:w-[26rem] md:h-[26rem] rounded-full flex justify-center items-center">
            <div className="relative">
              <img
                src={
                  preview ||
                  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExczhveXdoaDlnbTJjOG0xaGxrdXhiNHZzbDZmenU0YmZxczd0bXgwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pCGyLbTeliIwqVU9Md/giphy.gif"
                }
                alt="Preview"
                onClick={handleButtonClick}
                onMouseOver={() => setIsImageHovered(true)}
                onMouseOut={() => {
                  setIsImageHovered(false);
                  setIsIconHovered(false);
                }}
                // For mobile devices
                onTouchStart={() => {
                  setIsImageHovered(true);
                  setIsIconHovered(false);
                }}
                onTouchCancel={() => {
                  setIsImageHovered(false);
                  setIsIconHovered(true);
                }}
                className={`rounded-full w-[18rem] h-[18rem] md:w-[24rem] md:h-[24rem] object-cover object-center shadow-md cursor-pointer hover:opacity-60 ${
                  isIconHovered ? "opacity-60" : ""
                }`}
              />

              {isImageHovered && (
                <div
                  className="absolute bottom-3 left-[46%] text-4xl cursor-pointer hover:opacity-7"
                  onMouseOver={() => {
                    setIsImageHovered(true);
                    setIsIconHovered(true);
                  }}
                  onClick={handleButtonClick}
                >
                  <IoMdPhotos />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-x-2 justify-center">
            <div>
              <Button
                className="bg-white text-black hover:bg-secondary hover:text-white"
                onClick={handleSkipOrCancelButton}
              >
                {!isNewUser
                  ? "Cancel"
                  : windowWidth >= 1024
                  ? "Skip for now"
                  : "Skip"}
              </Button>
            </div>

            <div>
              <Button onClick={handleUploadAvatar}>Upload Avatar</Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/gif"
                hidden
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-3 items-center">
            <span className="text-xs md:text-sm">Allowed image extensions</span>
            <div className="flex gap-x-2 items-center text-xs font-semibold">
              <span>JPEG</span>
              <CircleDashed size={8} />
              <span>GIF</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadAvatar;
