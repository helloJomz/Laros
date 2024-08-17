import { useSelector, useDispatch } from "react-redux";
import {
  setPreviewImg as setPreviewImgSlice,
  selectPreviewImg,
  setPreviewContent as setPreviewContentSlice,
  selectPreviewContent,
  selectPost,
  setPost as setPostSlice,
  selectComment,
  selectIsCommentLoading,
  selectIsCommentError,
  selectIsPostLoading,
  selectIsPostError,
} from "@/app/features/post/postSlice";
import {
  useGetHomePostsQuery,
  useGetPostsQuery,
  useSavePostMutation,
} from "@/app/features/post/postApiSlice";
import {
  selectReplyId,
  setReplyId as setReplyIdSlice,
} from "@/app/features/post/uiSlice";
import { AppDispatch } from "@/app/store";
import { useProfile } from "./useProfile";
import { useUserContext } from "@/context/UserContext";
import { useLocation } from "react-router-dom";
import { useModal } from "./useModal";

export const usePost = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { authenticatedUserObject } = useUserContext();
  const { userid: viewerUID } = authenticatedUserObject;

  const { modalType } = useModal();

  const { isProfileLoading } = useProfile();
  const { userid, displayname } = useProfile().userObject || {};

  const isAtProfilePage = location.pathname === `/${displayname}`;
  const isAtHomePage = location.pathname === "/";

  const [savePost, { isLoading: isPostSaving, isError: isPostSaveError }] =
    useSavePostMutation();

  const { isLoading: isPostFetching, isError: isPostFetchError } =
    useGetPostsQuery(
      {
        uid: userid,
        viewerUID: viewerUID, // ID of the one using the app.
      },
      {
        skip: isAtHomePage || isProfileLoading,
        refetchOnMountOrArgChange: true,
      }
    );

  const { refetch: homePostRefetch } = useGetHomePostsQuery(
    { viewerUID: viewerUID }, // ID of the one using the app.
    {
      skip: isAtProfilePage,
      refetchOnMountOrArgChange: isAtHomePage && modalType === null,
    }
  );

  const useFetchedPost = useSelector(selectPost);
  const setPost = (post: any) => dispatch(setPostSlice(post));

  const setPreviewImg = (url: string | null) =>
    dispatch(setPreviewImgSlice({ url: url }));
  const usePreviewImg = useSelector(selectPreviewImg);

  const setPreviewContent = (content: string | null) =>
    dispatch(setPreviewContentSlice({ content: content }));
  const usePreviewContent = useSelector(selectPreviewContent);

  // LOADING AND ERROR STATES
  const useIsCommentLoading = useSelector(selectIsCommentLoading);
  const useIsCommentError = useSelector(selectIsCommentError);
  const useIsPostLoading = useSelector(selectIsPostLoading);
  const useIsPostError = useSelector(selectIsPostError);

  //UI
  const setReplyId = (id: string | null) =>
    dispatch(setReplyIdSlice({ replyId: id }));
  const useReplyId = useSelector(selectReplyId);

  //COMMENT
  const useComment = useSelector(selectComment);

  return {
    navStates: {
      homePostRefetch,
      useIsPostLoading,
      useIsPostError,
    },
    loadingStates: {
      useIsCommentLoading,
      useIsCommentError,
    },
    postStates: {
      fetchedPosts: useFetchedPost,
      setPost,
      savePost,
      isPostFetching,
      isPostFetchError,
      isPostSaving,
      isPostSaveError,
    },
    commentStates: {
      useComment,
    },
    ui: {
      setReplyId,
      replyid: useReplyId,
    },
    endpoints: {
      isAtHomePage,
      isAtProfilePage,
    },
    setPreviewImg,
    usePreviewImg,
    setPreviewContent,
    usePreviewContent,
  };
};
