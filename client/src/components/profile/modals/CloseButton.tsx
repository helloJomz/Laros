import { useProfileContext } from "@/context/ProfileContext";
import { IoClose } from "react-icons/io5";

const CloseButton = () => {
  const { setShowProfileModal } = useProfileContext();
  return (
    <>
      <div
        className="rounded-full hover:bg-slate-600 p-1 text-end cursor-pointer"
        onClick={() => setShowProfileModal("")}
      >
        <IoClose size={20} />
      </div>
    </>
  );
};

export default CloseButton;
