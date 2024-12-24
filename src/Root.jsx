import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import CreateForm from "./components/CreateForm/CreateForm.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import FillForm from "./components/FillForm/FillForm.jsx";
import ViewTemplate from "./components/ViewTemplate/ViewTemplate.jsx";
import { Toaster } from "react-hot-toast";

export default function Root() {
  return (
    <Router>
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/fill-form" element={<FillForm />} />
        <Route path="/view-template" element={<ViewTemplate />} />
      </Routes>
    </Router>
  );
}
