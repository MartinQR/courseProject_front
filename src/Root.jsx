import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import CreateForm from "./components/CreateForm/CreateForm.jsx";

export default function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-form" element={<CreateForm />} />
      </Routes>
    </Router>
  );
}
