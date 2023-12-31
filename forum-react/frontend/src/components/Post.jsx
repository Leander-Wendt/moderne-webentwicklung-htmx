import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Post = () => {
	const { id } = useParams();
	const [post, setPost] = useState();
	const { userToken, username } = useSelector((state) => state.user);
	const navigate = useNavigate();

	const backendURL = import.meta.env.VITE_BE_URL;

	const fetchPost = async () => {
		await fetch(`${backendURL}/public/posts/${id}`, {
			method: "get",
			headers: {},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error(res.statusText);
				}
			})
			.then((body) => {
				setPost(body);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleDelete = async () => {
		await fetch(`${backendURL}/posts/${id}`, {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userToken}`,
			},
		}).catch((err) => {
			console.error(err);
		});
		navigate("/");
	};

	const handleEdit = () => {
		navigate(`/post/${id}/edit`);
	};

	useEffect(() => {
		fetchPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{post ? (
				<div className="relative mt-20 mx-10 max-w-container px-4 sm:px-6 lg:px-8">
					<div className="flex flex-col">
						<div className="flex flex-row items-center justify-between">
							<h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-900">
								{post.title}
							</h1>
							{post.author.username === username && (
								<div className="flex flex-row items-center gap-4">
									<button
										onClick={handleEdit}
										className="px-4 py-2 rounded-xl bg-zinc-500 hover:bg-zinc-400 text-white"
									>
										Edit
									</button>
									<button
										onClick={handleDelete}
										className="px-4 py-2 rounded-xl bg-zinc-500 hover:bg-zinc-400 text-white"
									>
										Delete
									</button>
								</div>
							)}
						</div>

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
