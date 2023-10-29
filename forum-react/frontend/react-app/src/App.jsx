import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register2 } from "./components/Register2";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<h1>Hello World</h1>} />
				<Route path="/register" element={<Register2 />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
