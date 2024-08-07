import {
  setModal,
  selectModal,
  selectHelper,
  setHelper as setHelperSlice,
} from "@/app/features/modal/modalSlice";
import {
  setViewPostState as setViewPostStateSlice,
  selectViewPostState,
} from "@/app/features/modal/viewpostSlice";
import { useDispatch, useSelector } from "react-redux";

export const useModal = () => {
  const dispatch = useDispatch();

  const setModalOpen = (modalType: string | null) =>
    dispatch(setModal({ modal: modalType }));

  const setHelper = (helper: any) =>
    dispatch(setHelperSlice({ helper: helper }));

  const modalType = useSelector(selectModal);
  const usehelper = useSelector(selectHelper);

  // VIEW POST
  const useViewPostState = useSelector(selectViewPostState);
  const setViewPostState = (state: "withComment" | "noComment") =>
    dispatch(setViewPostStateSlice({ viewPostState: state }));

  return {
    setModalOpen,
    modalType,
    setHelper,
    usehelper,
    viewPost: {
      setViewPostState,
      useViewPostState,
    },
  };
};
