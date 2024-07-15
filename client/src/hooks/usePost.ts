import { useSelector, useDispatch } from "react-redux";
import {
  setPreviewImg as setPreviewImgSlice,
  selectPreviewImg,
  setPreviewContent as setPreviewContentSlice,
  selectPreviewContent,
  selectPost,
} from "@/app/features/post/postSlice";
import {
  useGetPostsQuery,
  useSavePostMutation,
} from "@/app/features/post/postApiSlice";
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

  const {
    isLoading: isPostLoading,
    isError: isPostError,
    refetch,
  } = useGetPostsQuery({
    uid: userid,
    offset: offset,
    limit: limit,
  });

  const useFetchedPost = useSelector(selectPost);

  const setPreviewImg = (url: string | null) =>
    dispatch(setPreviewImgSlice({ url: url }));
  const usePreviewImg = useSelector(selectPreviewImg);

  const setPreviewContent = (content: string | null) =>
    dispatch(setPreviewContentSlice({ content: content }));
  const usePreviewContent = useSelector(selectPreviewContent);

  return {
    postStates: {
      posts: useFetchedPost,
      isLoading: isPostLoading,
      isError: isPostError,
      refetch,
    },
    pagination: {
      limit,
      setLimit,
      offset,
      setOffset,
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
