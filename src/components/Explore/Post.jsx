import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  FaThumbsUp,
  FaRegComment,
  FaRegThumbsUp,
  FaSave,
  FaRegBookmark,
  FaBookmark,
} from 'react-icons/fa';
import { AiOutlineLoading3Quarters, AiOutlineUser } from 'react-icons/ai';

import {
  ClockIcon,
  XIcon,
  SendIcon,
  MenuIcon,
  DeleteIcon,
  EditIcon,
} from '../general-ui/IconsSvg';
import ImageSlider from '../general-ui/ImageSlider';
import MixedText from '../general-ui/MixedText';
import { timeAgo } from '../../util/date';
import { errorHandlingFunction, getBaseUrl } from '../../util/http';
import {
  createCommentMutation,
  deletePostMutation,
  likePostMutaiton,
  postWithCommentsQuery,
  savePostMutation,
} from '../../http/home';
import { errorHandlingActions } from '../../store/errorHandlingSlice';
import { AnimatePresence } from 'framer-motion';
import Modal from '../general-ui/Modal';
import { range } from '../../util/validation';
import { alertActions } from '../../store/alertSlice';
import { NewPostModal } from './NewPost';
import DeletionModal from '../general-ui/DeletionModal';
import { eventActions } from '../../store/dataSlice';

const Post = forwardRef(({ post }, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const user = useSelector((state) => state.auth.user);

  const [like, setLike] = useState(post.like);
  const [save, setSave] = useState(post.saved_post);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [likeBtnDisabled, setLikeBtnDisabled] = useState(false);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [menu, setMenu] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deletion, setDeletion] = useState(false);
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

  const { mutate: deletePost } = useMutation({
    mutationFn: deletePostMutation,
    onError: () => {
      console.log('error');
      return errorHandlingFunction(dispatch, errorHandlingActions, navigate);
    },
    onSuccess: (response) => {
      setMenu(false);
      setDeletion(false);
      dispatch(eventActions.set({ data: post._id, type: 'delete-post' }));
    },
  });

  // handling the like button (some kind of rate limiting)
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

  // handling the save button
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
      className="bg-white min-w-full max-w-full dark:bg-elementBlack dark:text-white border border-gray-300 dark:border-darkBorder shadow-sm p-4 rounded-md flex flex-col space-y-3"
    >
      <AnimatePresence>
        {edit && (
          <Modal
            lockScroll={true}
            onClose={() => {
              setEdit(false);
              setMenu(false);
            }}
            bgDiv={true}
            className="inset-0 rounded-md dark:bg-elementBlack "
            animation={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 },
            }}
          >
            <NewPostModal
              onClose={() => {
                setEdit(false);
                setMenu(false);
              }}
              prePopulate={post}
            />
          </Modal>
        )}
        {deletion && (
          <DeletionModal
            handleClose={() => setDeletion(false)}
            handleDelete={() => deletePost(post._id)}
          />
        )}
      </AnimatePresence>

      {/* userimage, name, and time posted */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2 rtl:space-x-reverse">
          {post.publisher_id.profile_image &&
          post.publisher_id.profile_image !== '' ? (
            <img
              src={getBaseUrl() + post.publisher_id.profile_image}
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <div
              className={
                'rounded-full flex items-center justify-center bg-gray-300 p-1 text-white dark:bg-gray-700 w-12 h-12'
              }
            >
              <AiOutlineUser className="w-10 h-10" />
            </div>
          )}
          <div className="mt-2">
            <div className="text-sm md:text-md font-normal">
              {post.publisher_id.username}
            </div>
            <div className="flex flex-row items-center text-slate-500 dark:text-slate-300 space-x-0.5 rtl:space-x-reverse text-[10px] ">
              <div>
                <ClockIcon style="w-2" />
              </div>
              <div>{timeAgo(post.created_at)}</div>
            </div>
          </div>
        </div>
        {post.publisher_id._id === user._id && (
          <div className="relative">
            <button onClick={() => setMenu((state) => !state)}>
              <MenuIcon style="w-4 h-4 dark:text-gray-400" />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: -5 },
                    animate: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="animate"
                  exit="hidden"
                  className="absolute w-32 z-[50] bg-white dark:bg-elementBlack flex flex-col  text-[13px] font-light ltr:right-0 rtl:left-0 border border-gray-400 dark:border-darkBorder"
                >
                  <button
                    onClick={() => setEdit(true)}
                    className="flex flex-row space-x-3 p-2 rtl:space-x-reverse items-center hover:bg-orange-300"
                  >
                    <EditIcon style="w-4 h-4" />
                    <span> {t('edit')}</span>
                  </button>
                  <button
                    onClick={() => setDeletion(true)}
                    className="flex flex-row space-x-3 p-2  rtl:space-x-reverse items-center text-red-500 hover:bg-red-300"
                  >
                    <DeleteIcon style="w-4 h-4" />
                    <span>{t('delete')}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* post text */}
      <div>
        <MixedText
          className="text-[15px] font-light transition-all max-w-full"
          text={text}
        />
      </div>
      {/* images */}
      {images.length > 0 && (
        <div div className="w-full">
          <ImageSlider images={images} />
        </div>
      )}

      {post.topics?.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-1 rtl:space-x-reverse text-white text-xs">
          {post.topics.map((topic) => (
            <span
              key={topic}
              className="bg-orange-100 dark:bg-orange-400 text-logoOrange dark:text-white transition p-1 rounded"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      {/* interactions  */}
      <div className="w-full mt-1 bg-gray-300  dark:bg-darkBorder h-[1px]"></div>
      <div className="w-full flex flex-row items-center justify-between text-gray-600 dark:text-gray-200 h-6">
        <div className=" grid grid-cols-2 gap-6 rtl:space-x-reverse">
          <button
            disabled={likeBtnDisabled}
            className="flex flex-row space-x-2 rtl:space-x-reverse items-center justify-center"
            onClick={() => setLike((state) => !state)}
          >
            {like === true ? (
              <FaThumbsUp className="text-logoOrange w-5 h-5" />
            ) : (
              <FaRegThumbsUp className="h-5 w-5 hover:text-logoOrange " />
            )}
            <span className="w-3 -mb-1">{likesCount}</span>
          </button>
          <button
            onClick={() => setShowComments(true)}
            className="flex flex-row space-x-2 rtl:space-x-reverse items-center justify-center mt-0.5"
          >
            <FaRegComment className="w-5 h-5 hover:text-logoOrange " />
            <span className="w-3 -mb-1">{post.comments_count}</span>
          </button>
        </div>
        <div>
          <button
            className="flex flex-row items-center justify-center"
            disabled={saveBtnDisabled}
            onClick={() => setSave((state) => !state)}
          >
            {save ? (
              <FaBookmark className="w-5 h-5 text-logoOrange hover:text-logoOrange" />
            ) : (
              <FaRegBookmark className="w-5 h-5 hover:text-logoOrange" />
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

  const { isFetching, isError } = useQuery({
    queryKey: ['posts', 'comments', postId, page],
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
      textArea.current.value = '';
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
      setCommentValidation('the_comment_should_be_between_1_and_2048_chars');
      return;
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
      <div className="w-[320px] sm:w-[440px] md:w-[600px] dark:bg-elementBlack dark:text-white flex flex-col py-3 px-4 rounded-md border border-gray-300 dark:border-darkBorder ">
        {/* header */}
        <div className="w-full flex flex-row items-center justify-between mb-4">
          <div className="font-medium">
            {t('comments')}
            <span className="text-xs">{' ( ' + totalComments + ' ) '}</span>
          </div>
          <button type="button" className="text-gray-500" onClick={onClose}>
            <XIcon style="w-3 h-3" />
          </button>
        </div>

        {isFetching && !isError && (
          <div className="mx-auto">
            <AiOutlineLoading3Quarters className="text-logoOrange animate-spin text-xl sm:text-3xl" />
          </div>
        )}

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
              placeholder={t('leave_a_comment')}
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
      {comment.user_id.profile_image && comment.user_id.profile_image !== '' ? (
        <img
          src={getBaseUrl() + comment.user_id.profile_image}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        />
      ) : (
        <div
          className={
            'rounded-full flex items-center justify-center bg-gray-300 p-1 text-white dark:bg-gray-700 w-10 h-10 sm:w-12 sm:h-12'
          }
        >
          <AiOutlineUser className="w-10 h-10" />
        </div>
      )}
      <div className="flex flex-col mt-[5px] sm:mt-1.5">
        <div className="text-sm font-semibold">{comment.user_id.username}</div>
        <div className="flex flex-row items-center text-slate-500 dark:text-slate-300 space-x-1 rtl:space-x-reverse text-xs mb-1 -mt-0.5">
          <div>
            <ClockIcon style="w-[10px]" />
          </div>
          <div className="text-[10px] font-light ">
            {timeAgo(comment.created_at)}
          </div>
        </div>
        <MixedText text={comment.text} className="text-sm font-light" />
      </div>
    </div>
  );
}

export default Post;
