import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Posts } from "./components/Posts";
import { Post } from "./components/Post";
import { PageError } from "./components/PageError";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { CreatePost } from "./components/CreatePost";
// TODO: Fix Create Post Cors Error, probably issues with req body
// Register User displays error message on success
// Crud Post
function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Posts />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/post/new" element={<CreatePost />} />
					</Route>
					<Route path="/post/:id" element={<Post />} />
					<Route path="*" element={<PageError />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
