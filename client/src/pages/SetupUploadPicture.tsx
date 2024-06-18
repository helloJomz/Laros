import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleDashed } from "lucide-react";
import { IoMdPhotos } from "react-icons/io";
import { useNavbarContext } from "@/context/NavbarContext";
import { useLocation } from "react-router-dom";

const SetupUploadPicture: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(true);
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  const [isIconHovered, setIsIconHovered] = useState<boolean>(false);

  const location = useLocation();
  const isNewUser = location.state && location.state.isNew;

  const { windowWidth } = useNavbarContext();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    console.log(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsImageHovered(false);
    } else {
      setPreview(null);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsError(false);
    }, 5000);
  }, [isError]);

  return (
    <>
      <div className="flex flex-col items-center gap-y-8 min-h-screen justify-center pt-12 lg:pt-6">
        <div className="text-white text-center font-semibold">
          <h1 className="text-lg lg:text-2xl">Upload your Avatar</h1>
          <span className="text-muted-foreground text-xs ">
            Click the image to start uploading your avatar
          </span>
        </div>

        <div className="flex flex-col gap-y-8">
          <div className="border-dotted border-2 border-primary w-[20rem] h-[20rem] lg:w-[26rem] lg:h-[26rem] rounded-full flex justify-center items-center">
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
                className={`rounded-full w-[18rem] h-[18rem] lg:w-[24rem] lg:h-[24rem] object-cover object-center shadow-md cursor-pointer hover:opacity-60 ${
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
              <Button className="bg-white text-black hover:bg-secondary hover:text-white">
                {!isNewUser
                  ? "Cancel"
                  : windowWidth >= 1024
                  ? "Skip for now"
                  : "Skip"}
              </Button>
            </div>

            <div>
              <Button>Upload Avatar</Button>
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
            <span className="text-xs lg:text-sm">
              Accepted image extensions
            </span>
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

export default SetupUploadPicture;
