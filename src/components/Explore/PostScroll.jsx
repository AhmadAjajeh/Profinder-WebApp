import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getPostQuery } from '../../http/home';
import Post, { PostShimmer } from './Post';
import { useDispatch, useSelector } from 'react-redux';
import useErrorHandler from '../../hooks/useErrorHandler';

export default function PostScroll() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleError = useErrorHandler();

  const event = useSelector((state) => state.event);

  const [page, setPage] = useState(1);
  const [morePagesExist, setMorePagesExist] = useState(true);
  const [posts, setPosts] = useState([]);

  const observer = useRef(null);

  useEffect(() => {
    if (event.type === 'new-post' && event.data) {
      setPosts((prePosts) => [event.data, ...prePosts]);
    }
    if (event.type === 'edit-post' && event.data) {
      setPosts((prePosts) => {
        return prePosts.map((post) =>
          post._id === event.data._id ? event.data : post
        );
      });
    }
    if (event.type === 'delete-post' && event.data) {
      setPosts((prePosts) => {
        return prePosts.filter((post) => post._id !== event.data);
      });
    }
  }, [event]);

  const { isFetching } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => getPostQuery(page),
    onSuccess: ({ data }) => {
      setMorePagesExist(
        data.pagination.current_page < data.pagination.number_of_pages
      );
      setPosts((previousPosts) => {
        return [...previousPosts, ...data.posts];
      });
    },
    onError: handleError,
    keepPreviousData: true,
    enabled: morePagesExist,
    refetchOnWindowFocus: false,
  });

  const lastPostRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && morePagesExist) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetching, morePagesExist]
  );

  return (
    <div className="flex flex-col items-center space-y-1 max-w-full">
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return <Post post={post} key={post._id} ref={lastPostRef} />;
        }
        return <Post key={post._id} post={post} />;
      })}
      {isFetching && (
        <>
          <PostShimmer />
          <PostShimmer />
        </>
      )}
    </div>
  );
}
