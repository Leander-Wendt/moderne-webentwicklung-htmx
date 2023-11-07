import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register2 } from "./components/Register2";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Posts } from "./components/Posts";
// TODO:
// Form validation for Login / Register
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
          {/*<Route element={<ProtectedRoute />}>
            <Route path='/post/new' element={<CreatePost />} />
          </Route>*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
