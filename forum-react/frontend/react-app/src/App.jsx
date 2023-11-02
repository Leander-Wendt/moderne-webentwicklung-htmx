import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register2 } from "./components/Register2";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Posts } from "./components/Posts";
// TODO:
// Form validation for Login / Register
// Cross Link between Login / Register
// Store JWT in redux store, implement logout
// View all Posts
// Crud Post
// Crud Comment (delete comments from project?)
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/register" element={<Register2 />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
