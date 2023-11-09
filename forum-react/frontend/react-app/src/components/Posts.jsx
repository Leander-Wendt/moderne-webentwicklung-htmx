import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { LOCATION_CHANGE } from "./user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const Posts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [posts, setPosts] = useState();
  const backendURL = "http://127.0.0.1:8080";

  const fetchAllPosts = async () => {
    try {
      fetch(`${backendURL}/public/posts`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Error");
          }
        })
        .then((body) => {
          setPosts(body);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    dispatch(LOCATION_CHANGE());
  }, []);

  useEffect(() => {
    fetchAllPosts();
    dispatch(LOCATION_CHANGE());
  }, [navigate]);

  return (
    <section className="flex min-h-full flex-col justify-center px-10 py-12 lg:px-8">
      <ul role="list" className="divide-y divide-gray-100">
        {posts &&
          posts.map((post) => (
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
                      {post.author.displayname}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Last seen{" "}
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
