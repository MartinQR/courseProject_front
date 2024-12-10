import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import CreateForm from "./components/CreateForm/CreateForm.jsx";
import { Toaster } from "react-hot-toast";

export default function Root() {
  return (
    <Router>
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-form" element={<CreateForm />} />
      </Routes>
    </Router>
  );
}
