import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { LOCATION_CHANGE } from "./user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "./post/postActions";

export const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // For some reason I have to parse a parameter
    dispatch(getPosts(""));
    dispatch(LOCATION_CHANGE());
  }, [dispatch]);

  const { posts } = useSelector((state) => state.post);

  return (
    <section className="flex min-h-full flex-col justify-center px-10 py-12 lg:px-8">
      <ul className="divide-y divide-gray-100">
        {posts?.map((post) => (
          <NavLink key={post.id} to={"post/" + post.id}>
            <li
              key={post.id}
              className="p-5 flex justify-between rounded-md gap-x-6 py-5 bg-gray-100 hover:bg-gray-200 mb-2"
            >
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-xl font-semibold leading-6 text-gray-900">
                    {post.title}
                  </p>
                  <p className="mt-1 truncate text-m leading-5 text-gray-500">
                    {post.author?.displayname || ""}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Posted on{" "}
                  <time dateTime={post.updated_at}>
                    {new Date(post.updated_at).toDateString()}
                  </time>
                </p>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </section>
  );
};
