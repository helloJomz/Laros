import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/ProfileContext";
import { useModal } from "@/hooks/useModal";
import { useNavigate } from "react-router-dom";

const DisplayPicture = () => {
  const { setModalOpen } = useModal();

  const { userProfileObject, isAuthProfile } = useProfileContext();

  const navigate = useNavigate();

  const imgURL = userProfileObject?.imgURL;
  const displayname = userProfileObject?.displayname;

  return (
    <>
      <div className="flex flex-col gap-y-8">
        <img
          src={imgURL || ""}
          alt={`photo_${displayname}`}
          className="rounded-full object-cover w-[18rem] h-[18rem] md:w-[20rem] md:h-[20rem] lg:w-[25rem] lg:h-[25rem] pointer-events-none"
        />
        {isAuthProfile && (
          <div className="flex flex-col gap-y-4 ">
            <Button onClick={() => navigate("/upload/avatar")}>
              Change Avatar
            </Button>
            <Button
              onClick={() => setModalOpen(null)}
              className="bg-slate-100 text-black hover:text-white"
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
