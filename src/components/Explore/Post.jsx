import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";

import {
  ClockIcon,
  CommentIcon,
  EmptyLikeIcon,
  LikeIcon,
  FullSavedIcon,
  EmptySavedIcon,
  XIcon,
  SendIcon,
} from "../../components/genera-ui/IconsSvg";
import ImageSlider from "../../components/genera-ui/ImageSlider";
import MixedText from "../genera-ui/MixedText";
import { timeAgo } from "../../util/date";
import { errorHandlingFunction, getBaseUrl } from "../../util/http";
import {
  createCommentMutation,
  likePostMutaiton,
  postWithCommentsQuery,
  savePostMutation,
} from "../../http/home";
import { errorHandlingActions } from "../../store/errorHandlingSlice";
import { AnimatePresence } from "framer-motion";
import Modal from "../genera-ui/Modal";
import { range } from "../../util/validation";
import { alertActions } from "../../store/alertSlice";

const Post = forwardRef(({ post }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [like, setLike] = useState(post.like);
  const [save, setSave] = useState(post.saved_post);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [likeBtnDisabled, setLikeBtnDisabled] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const isFirstRender = useRef(true);
  const isFirstRender2 = useRef(true);

  const text = post.text;
  const images = post.images || [];

  const { mutate: mutateLike } = useMutation({
    mutationFn: likePostMutaiton,
    onError: errorHandlingFunction(dispatch, errorHandlingActions, navigate),
    // refetchOnWindowFocus: false,
  });

  const { mutate: mutateSave } = useMutation({
    mutationFn: savePostMutation,
    onError: errorHandlingFunction(dispatch, errorHandlingActions, navigate),
    // refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLikeBtnDisabled(true);
    const timer = setTimeout(() => {
      mutateLike({ like, postId: post._id });
      setLikesCount((state) => {
        return like ? state + 1 : state - 1;
      });
      setLikeBtnDisabled(false);
    }, 1 * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [like, setLikesCount, mutateLike]);

  useEffect(() => {
    if (isFirstRender2.current) {
      isFirstRender2.current = false;
      return;
    }

    setSaveBtnDisabled(true);
    const timer = setTimeout(() => {
      mutateSave({ save, postId: post._id });
      setSaveBtnDisabled(false);
    }, 1 * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [save, mutateSave]);

  return (
    <div
      ref={ref}
      className="bg-white min-w-full dark:bg-elementBlack dark:text-white border border-gray-300 dark:border-darkBorder shadow-sm p-4 rounded-md flex flex-col space-y-3"
    >
      {/* userimage, name, and time posted */}
      <div className="flex flex-row space-x-2 rtl:space-x-reverse">
        <img
          src={getBaseUrl() + post.publisher_id.profile_image}
          className="w-12 h-12 rounded-full"
        />
        <div className="mt-2 md:mt-1">
          <div className="text-sm md:text-md font-normal">
            {post.publisher_id.username}
          </div>
          <div className="flex flex-row items-center text-slate-500 dark:text-slate-300 space-x-1 rtl:space-x-reverse text-xs  mt-1">
            <div>
              <ClockIcon style="w-3" />
            </div>
            <div>{timeAgo(post.created_at)}</div>
          </div>
        </div>
      </div>
      {/* post text */}
      <div>
        <MixedText
          className="text-[15px] font-light transition-all"
          text={text}
        />
      </div>
      {/* images */}
      {images.length > 0 && (
        <div div className="w-full">
          <ImageSlider images={images} />
        </div>
      )}

      {/* interactions  */}
      <div className="w-full mt-1 bg-gray-300 dark:bg-darkBorder h-[1px]"></div>
      <div className="w-full flex flex-row items-center justify-between text-gray-600 h-6">
        <div className=" grid grid-cols-2 gap-7 rtl:space-x-reverse">
          <button
            disabled={likeBtnDisabled}
            className="flex flex-row space-x-2 rtl:space-x-reverse items-center justify-center"
            onClick={() => setLike((state) => !state)}
          >
            {like === true ? (
              <LikeIcon style="w-5 text-logoOrange" />
            ) : (
              <EmptyLikeIcon style="w-5 hover:text-logoOrange" />
            )}
            <span>{likesCount}</span>
          </button>
          <button
            onClick={() => setShowComments(true)}
            className="flex flex-row space-x-2 rtl:space-x-reverse items-center justify-center "
          >
            <CommentIcon style="w-5 hover:text-logoOrange mt-[4px]" />
            <span>{post.comments_count}</span>
          </button>
        </div>
        <div>
          <button
            className="mt-[4px]"
            disabled={saveBtnDisabled}
            onClick={() => setSave((state) => !state)}
          >
            {save ? (
              <FullSavedIcon style="w-5 text-logoOrange hover:text-logoOrange" />
            ) : (
              <EmptySavedIcon style="w-5 hover:text-logoOrange" />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showComments && (
          <CommentsModal
            onClose={() => setShowComments(false)}
            postId={post._id}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

export function PostShimmer() {
  return (
    <div className="bg-white min-w-full dark:bg-elementBlack border border-gray-300 dark:border-darkBorder shadow-sm p-4 rounded-md flex flex-col space-y-3 animate-pulse">
      {/* User Image, Name, and Time Placeholder */}
      <div className="flex flex-row space-x-2 rtl:space-x-reverse">
        <div className="w-12 h-12 bg-gray-300 dark:bg-darkBorder rounded-full"></div>
        <div className="mt-2 md:mt-1 flex-1">
          <div className="h-4 bg-gray-300 dark:bg-darkBorder rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-darkBorder rounded w-1/3"></div>
        </div>
      </div>

      {/* Post Text Placeholder */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-darkBorder rounded w-full"></div>
        <div className="h-3 bg-gray-300 dark:bg-darkBorder rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 dark:bg-darkBorder rounded w-3/4"></div>
      </div>

      {/* Image Slider Placeholder */}
      <div className="w-full h-32 bg-gray-300 dark:bg-darkBorder rounded"></div>

      {/* Interactions Placeholder */}
      <div className="w-full mt-1 bg-gray-300 dark:bg-darkBorder h-[2px]"></div>
      <div className="w-full flex flex-row items-center justify-between text-gray-600">
        <div className="flex flex-row space-x-7 rtl:space-x-reverse">
          <div className="w-5 h-5 bg-gray-300 dark:bg-darkBorder rounded"></div>
          <div className="w-5 h-5 bg-gray-300 dark:bg-darkBorder rounded"></div>
          <div className="w-5 h-5 bg-gray-300 dark:bg-darkBorder rounded"></div>
        </div>
        <div className="w-5 h-5 bg-gray-300 dark:bg-darkBorder rounded"></div>
      </div>
    </div>
  );
}

function CommentsModal({ postId, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textArea = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [morePagesExist, setMorePagesExist] = useState(true);
  const [totalComments, setTotalComments] = useState(0);
  const [commentValidation, setCommentValidation] = useState(null);

  const observer = useRef(null);

  const { isFetching } = useQuery({
    queryKey: ["posts", "comments", postId, page],
    queryFn: () => postWithCommentsQuery({ postId, page }),
    onSuccess: (data) => {
      setMorePagesExist(
        data.comments_details.pagination.current_page <
          data.comments_details.pagination.number_of_pages
      );
      setComments((previousComments) => {
        return [...previousComments, ...data.comments_details.comments];
      });
      setTotalComments(data.comments_details.total_count);
    },
    onError: errorHandlingFunction(dispatch, errorHandlingActions, navigate),
    keepPreviousData: true,
    enabled: morePagesExist,
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: createCommentMutation,
    onSuccess: (response) => {
      dispatch(
        alertActions.alert({
          messages: [response.message],
        })
      );
      setComments((prevComments) => [
        {
          ...response.comment,
          user_id: {
            profile_image: user.profile_image,
            username: user.username,
          },
        },
        ...prevComments,
      ]);
      textArea.current.value = "";
    },
    onError: errorHandlingFunction(dispatch, errorHandlingActions, navigate),
  });

  const lastCommentRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && morePagesExist) {
          setPage((previousPage) => previousPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, morePagesExist]
  );

  function handleCreateComment(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let { text } = Object.fromEntries(formData);

    if (!range(text, 1, 2048)) {
      setCommentValidation("the_comment_should_be_between_1_and_2048_chars");
    }
    setCommentValidation(null);

    mutate({ text, post_id: postId });
  }

  return (
    <Modal
      onClose={onClose}
      lockScroll={true}
      bgDiv={true}
      className="inset-0 rounded-md dark:bg-elementBlack "
      animation={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div className="w-[440px] md:w-[600px] dark:bg-elementBlack dark:text-white flex flex-col py-3 px-4 rounded-md border border-gray-300 dark:border-darkBorder ">
        {/* header */}
        <div className="w-full flex flex-row items-center justify-between mb-4">
          <div className="font-medium">
            {t("comments")}
            <span className="text-xs">{" ( " + totalComments + " ) "}</span>
          </div>
          <button type="button" className="text-gray-500" onClick={onClose}>
            <XIcon style="w-3 h-3" />
          </button>
        </div>

        {/* list of comments */}
        <div className="max-h-80 overflow-y-auto flex flex-col items-start space-y-2 px-2">
          {comments.map((comment, index) => (
            <Comment
              comment={comment}
              key={comment._id}
              ref={comments.length === index + 1 ? lastCommentRef : null}
            />
          ))}
        </div>

        {/* comment creation */}
        <div className="w-full">
          <form
            onSubmit={handleCreateComment}
            className="flex flex-row space-x-4 rtl:space-x-reverse items-center mt-2"
          >
            <textarea
              ref={textArea}
              name="text"
              placeholder={t("leave_a_comment")}
              className="bg-gray-200 dark:bg-elementGray font-light text-sm outline-none w-full h-16 max-h-16 min-h-16 p-2 rounded-lg dark:text-white"
            ></textarea>
            <button className="hover:text-logoOrange">
              <SendIcon style="w-5 h-5 rtl:rotate-180" />
            </button>
          </form>
          <div>
            {commentValidation && (
              <div className="text-red-500 text-sm font-light mt-1">
                {t(commentValidation)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

const url = getBaseUrl();

function Comment({ comment }) {
  return (
    <div className="flex flex-row space-x-2 rtl:space-x-reverse bg-gray-200 dark:bg-elementGray  p-2 rounded-md">
      <img
        src={url + comment.user_id.profile_image}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col space-y-1">
        <div className="text-sm font-semibold">{comment.user_id.username}</div>
        <div className="flex flex-row items-center text-slate-500 dark:text-slate-300 space-x-1 rtl:space-x-reverse text-xs  mt-1">
          <div>
            <ClockIcon style="w-3" />
          </div>
          <div className="text-xs font-light">
            {timeAgo(comment.created_at)}
          </div>
        </div>
        <MixedText text={comment.text} className="text-sm font-light" />
      </div>
    </div>
  );
}

export default Post;
