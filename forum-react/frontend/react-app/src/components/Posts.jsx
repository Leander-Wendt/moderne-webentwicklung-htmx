import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOCATION_CHANGE } from "./user/userSlice";
import { useNavigate } from "react-router-dom";

export const Posts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [posts, setPosts] = useState();
  const { userToken } = useSelector((state) => state.user);
  const backendURL = "http://127.0.0.1:8080";

  const fetchAllPosts = async () => {
    try {
      fetch(`${backendURL}/posts`, {
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

  const handleDelete = (postId) => {
    try {
      fetch(`${backendURL}/posts`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
          Authorization: `Bearer ${userToken}`,
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

  return (
    <section className="flex min-h-full flex-col justify-center px-10 py-12 lg:px-8">
      <ul role="list" className="divide-y divide-gray-100">
        {posts &&
          posts.map((post) => (
            <NavLink key={post.id} to={"post/" + post.id}>
              <li key={post.id} className="flex justify-between gap-x-6 py-5">
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
