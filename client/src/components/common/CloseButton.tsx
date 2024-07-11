import { useProfileContext } from "@/context/ProfileContext";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setModal } from "@/app/features/profile/profileSlice";

const CloseButton = () => {
  const { setShowProfileModal } = useProfileContext();
  const dispatch = useDispatch();

  return (
    <>
      <div
        className="rounded-full hover:bg-slate-600 p-1 text-end cursor-pointer"
        onClick={() => dispatch(setModal({ modal: null }))}
      >
        <IoClose size={20} />
      </div>
    </>
  );
};

export default CloseButton;
