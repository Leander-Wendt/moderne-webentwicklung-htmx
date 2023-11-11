import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./user/userSlice";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
	const navigation = [{ name: "Home", href: "/", current: false }];

	const authRoutes = [
		{ name: "Login", href: "/login", current: false },
		{ name: "Register", href: "/register", current: false },
	];
	const dispatch = useDispatch();
	const { userToken } = useSelector((state) => state.user);

	const handleLogout = () => {
		dispatch(logout());
	};
	// Source: https://tailwindui.com/components/application-ui/application-shells/stacked
	return (
		<Disclosure as="nav" className="bg-gray-800 top-0 sticky">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => {
											return (
												<NavLink
													key={item.name}
													to={item.href}
													className={classNames(
														item.current
															? "bg-gray-900 text-white"
															: "text-gray-300 hover:bg-gray-700 hover:text-white",
														"rounded-md px-3 py-2 text-sm font-medium"
													)}
													aria-current={item.current ? "page" : undefined}
												>
													{item.name}
												</NavLink>
											);
										})}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-2 sm:pr-0">
								<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
									<div className="hidden sm:ml-4 sm:block">
										<div className="flex space-x-4">
											{userToken ? (
												<>
													<NavLink
														key={"Create Post"}
														to={"/post/new"}
														className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
														aria-current={"Create Post"}
													>
														Create Post
													</NavLink>
													<p
														className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
														onClick={handleLogout}
													>
														Logout
													</p>
												</>
											) : (
												authRoutes.map((item) => {
													return (
														<NavLink
															key={item.name}
															to={item.href}
															className={classNames(
																item.current
																	? "bg-gray-900 text-white"
																	: "text-gray-300 hover:bg-gray-700 hover:text-white",
																"rounded-md px-3 py-2 text-sm font-medium"
															)}
															aria-current={item.current ? "page" : undefined}
														>
															{item.name}
														</NavLink>
													);
												})
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={classNames(
										item.current
											? "bg-gray-900 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white",
										"block rounded-md px-3 py-2 text-base font-medium"
									)}
									aria-current={item.current ? "page" : undefined}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};
