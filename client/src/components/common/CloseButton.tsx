import { useModal } from "@/hooks/useModal";
import { IoClose } from "react-icons/io5";

const CloseButton = () => {
  const { setModalOpen } = useModal();

  return (
    <>
      <div
        className="rounded-full hover:bg-slate-600 p-1 text-end cursor-pointer"
        onClick={() => setModalOpen(null)}
      >
        <IoClose size={20} />
      </div>
    </>
  );
};

export default CloseButton;
