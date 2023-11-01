import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register2 } from "./components/Register2";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Posts } from "./components/Posts";
import { Counter } from "./components/Counter";

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
