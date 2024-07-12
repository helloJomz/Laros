import { setModal, selectModal } from "@/app/features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export const useModal = () => {
  const dispatch = useDispatch();

  const setModalOpen = (modalType: string | null) =>
    dispatch(setModal({ modal: modalType }));

  const modalType = useSelector(selectModal);

  return {
    setModalOpen,
    modalType,
  };
};
