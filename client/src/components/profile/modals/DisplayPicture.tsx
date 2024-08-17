import { Button } from "@/components/ui/button";
import useClickedOutsideModal from "@/hooks/useClickedOutsideModal";
import { useModal } from "@/hooks/useModal";
import { useProfile } from "@/hooks/useProfile";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const DisplayPicture = () => {
  const { componentRef } = useClickedOutsideModal();

  const navigate = useNavigate();
  const { setModalOpen } = useModal();

  const { userObject, isAuthProfile } = useProfile();

  const imgURL = userObject?.imgURL;
  const displayname = userObject?.displayname;

  return (
    <>
      <div className="flex flex-col gap-y-8" ref={componentRef}>
        <img
          src={imgURL || ""}
          alt={`photo_${displayname}`}
          className="rounded-full object-cover w-[18rem] h-[18rem] md:w-[20rem] md:h-[20rem] lg:w-[25rem] lg:h-[25rem] pointer-events-none"
        />
        {isAuthProfile && (
          <div className="flex flex-col gap-y-4 ">
            <Button
              onClick={() => {
                setModalOpen(null);
                navigate("/upload/avatar");
              }}
            >
              Change Avatar
            </Button>
            <Button
              onClick={() => setModalOpen(null)}
              className="bg-slate-100 text-black hover:text-white hover:bg-secondary"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayPicture;
