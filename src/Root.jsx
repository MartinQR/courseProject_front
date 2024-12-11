import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import CreateForm from "./components/CreateForm/CreateForm.jsx";
import Login from "./components/Login/Login.jsx"
import { Toaster } from "react-hot-toast";

export default function Root() {
  return (
    <Router>
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
