import { useSelector, useDispatch } from "react-redux";
import {
  setPreviewImg as setPreviewImgSlice,
  selectPreviewImg,
  setPreviewContent as setPreviewContentSlice,
  selectPreviewContent,
  selectPost,
  setPost as setPostSlice,
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

export const usePost = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [limit, setLimit] = useState<number>(5);
  const [offset, setOffset] = useState<number>(0);

  const { userObject } = useProfile();
  const { userid } = userObject || {};

  const [savePost, { isLoading: isPosting, isError: isPostingError }] =
    useSavePostMutation();

  const { isLoading: isPostLoading, isError: isPostError } = useGetPostsQuery({
    uid: userid,
    offset: offset,
    limit: limit,
  });

  const useFetchedPost = useSelector(selectPost);
  const setPost = (post: any) => dispatch(setPostSlice(post));

  const setPreviewImg = (url: string | null) =>
    dispatch(setPreviewImgSlice({ url: url }));
  const usePreviewImg = useSelector(selectPreviewImg);

  const setPreviewContent = (content: string | null) =>
    dispatch(setPreviewContentSlice({ content: content }));
  const usePreviewContent = useSelector(selectPreviewContent);

  //UI
  const setReplyId = (id: string | null) =>
    dispatch(setReplyIdSlice({ replyId: id }));
  const useReplyId = useSelector(selectReplyId);

  return {
    postStates: {
      posts: useFetchedPost,
      setPost,
      isLoading: isPostLoading,
      isError: isPostError,
    },
    pagination: {
      limit,
      setLimit,
      offset,
      setOffset,
    },
    ui: {
      setReplyId,
      replyid: useReplyId,
    },
    setPreviewImg,
    usePreviewImg,
    setPreviewContent,
    usePreviewContent,
    savePost,
    states: {
      isPosting,
      isPostingError,
    },
  };
};
