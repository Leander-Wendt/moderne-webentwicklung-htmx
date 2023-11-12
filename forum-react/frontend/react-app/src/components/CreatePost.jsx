import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createPost } from "./post/postActions";
import { useDispatch, useSelector } from "react-redux";
import { LOCATION_CHANGE } from "./user/userSlice";

export const CreatePost = () => {
	const [inputs, setInputs] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { userToken } = useSelector((state) => state.user);

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs((values) => ({ ...values, [name]: value }));
	};

	useEffect(() => {
		dispatch(LOCATION_CHANGE());
	}, [dispatch]);

	const handleSubmit = (event) => {
		event.preventDefault();
		inputs.userToken = userToken;
		dispatch(createPost(inputs));
		navigate("/");
	};
	return (
		<div className="relative mt-20 mx-10 max-w-container px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col">
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						onSubmit={handleSubmit}
						className="space-y-6"
						action="#"
						method="POST"
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
									value={inputs.title || ""}
									required
									onChange={handleChange}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
									className="block w-full rounded-md border-0 py-1.5 text-xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									value={inputs.body || ""}
									onChange={handleChange}
								/>
							</div>
							<div className="mt-2">
								<NavLink to="/">Cancel</NavLink>
								<input
									type="submit"
									value="Post"
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
