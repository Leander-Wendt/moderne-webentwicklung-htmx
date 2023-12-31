import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { editPost } from "./post/postActions";
import { useDispatch, useSelector } from "react-redux";
import { LOCATION_CHANGE } from "./user/userSlice";

export const EditPost = () => {
	const [inputs, setInputs] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [post, setPost] = useState({});

	const { id } = useParams();
	const { userToken } = useSelector((state) => state.user);

	const fetchPost = async () => {
		await fetch(`${import.meta.env.VITE_BE_URL}/public/posts/${id}`, {
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
				setInputs((values) => ({ ...values, title: body.title }));
				setInputs((values) => ({ ...values, body: body.body }));
				return body;
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	useEffect(() => {
		fetchPost();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(LOCATION_CHANGE());
	}, [dispatch]);

	const handleSubmit = (event) => {
		event.preventDefault();
		inputs.userToken = userToken;
		inputs.created_at = post.created_at;
		inputs.id = id;
		inputs.author = post.author;
		console.log(inputs);
		dispatch(editPost(inputs));
		navigate("/");
	};

	return (
		<div className="relative mt-20 mx-10 max-w-container px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Edit Post
					</h2>
				</div>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						onSubmit={handleSubmit}
						className="space-y-6"
						action="#"
						method="PUT"
					>
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Title
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="title"
									id="title"
									autoComplete="off"
									value={inputs.title || post.title || ""}
									required
									onChange={handleChange}
									className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="body"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Body (optional)
							</label>
							<div className="col-span-full">
								<textarea
									id="body"
									name="body"
									className="px-3 block w-full rounded-md border-0 py-1.5 text-xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={inputs.body || post.body || ""}
									onChange={handleChange}
								/>
							</div>
							<div className="mt-2">
								<input
									type="submit"
									value="Update"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
