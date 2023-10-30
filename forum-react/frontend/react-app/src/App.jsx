import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register2 } from "./components/Register2";
import { Login } from "./components/Login";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/register" element={<Register2 />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
