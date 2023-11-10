import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const { userToken, username } = useSelector((state) => state.user);

  const backendURL = "http://127.0.0.1:8080";

  const fetchPost = () => {
    try {
      fetch(`${backendURL}/public/posts/${id}`, {
        method: "get",
        headers: {},
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            console.log(res);
            throw new Error("Error");
          }
        })
        .then((body) => {
          setPost(body);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = () => {
    try {
      fetch(`${backendURL}/posts/${postId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:8080",
          Authorization: `Bearer ${userToken}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      {post ? (
        <div className="relative mt-20 mx-10 max-w-container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-900">
              {post.title}
            </h1>
            {post.author.username === username && (
              <>
                <button>Edit</button>
                <button>Delete</button>
              </>
            )}
            <h2 className="mt-1 text-s leading-6 text-gray-400">
              {post.author.displayname} posted at{" "}
              {new Date(post.updated_at).toDateString()}
            </h2>
            <p className="mt-10 text-xl leading-6 text-gray-600">{post.body}</p>

            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12"></div>
            </div>
          </div>
        </div>
      ) : (
        <p>Error</p>
      )}
    </>
  );
};
