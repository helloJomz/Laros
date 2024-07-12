import {
  setModal,
  useModal as useModalType,
} from "@/app/features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";

export const useModal = () => {
  const dispatch = useDispatch();

  const setModalOpen = (modalType: string | null) =>
    dispatch(setModal({ modal: modalType }));

  const modalType = useSelector(useModalType);

  return {
    setModalOpen,
    modalType,
  };
};
