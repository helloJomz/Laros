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
  selectIsParentReplyLoading,
  selectIsParentReplyError,
} from "@/app/features/post/postSlice";
import {
  useGetPostsQuery,
  useSavePostMutation,
} from "@/app/features/post/postApiSlice";
import {
  selectReplyId,
  setReplyId as setReplyIdSlice,
} from "@/app/features/post/uiSlice";
import { AppDispatch } from "@/app/store";
import { useProfile } from "./useProfile";
import { useState } from "react";
import { useUserContext } from "@/context/UserContext";

export const usePost = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { authenticatedUserObject } = useUserContext();
  const { userid: viewerUID } = authenticatedUserObject;

  const { userObject } = useProfile();
  const { userid } = userObject || {};

  const [savePost, { isLoading: isPostSaving, isError: isPostSaveError }] =
    useSavePostMutation();

  const { isLoading: isPostFetching, isError: isPostFetchError } =
    useGetPostsQuery({
      uid: userid,
      viewerUID: viewerUID, // ID of the one using the app.
    });

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
  const useIsParentReplyLoading = useSelector(selectIsParentReplyLoading);
  const useIsParentReplyError = useSelector(selectIsParentReplyError);

  //UI
  const setReplyId = (id: string | null) =>
    dispatch(setReplyIdSlice({ replyId: id }));
  const useReplyId = useSelector(selectReplyId);

  //COMMENT
  const useComment = useSelector(selectComment);

  return {
    loadingStates: {
      useIsCommentLoading,
      useIsCommentError,
      useIsParentReplyLoading,
      useIsParentReplyError,
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

    setPreviewImg,
    usePreviewImg,
    setPreviewContent,
    usePreviewContent,
  };
};
