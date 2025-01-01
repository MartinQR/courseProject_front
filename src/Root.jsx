import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import CreateForm from "./components/CreateForm/CreateForm.jsx";
import Login from "./components/Login/Login.jsx";
import SignUp from "./components/SignUp/SignUp.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import FillForm from "./components/FillForm/FillForm.jsx";
import ViewTemplate from "./components/ViewTemplate/ViewTemplate.jsx";
import { Toaster } from "react-hot-toast";
import ViewTemplateAnswer from "./components/ViewTemplate/ViewTemplateAnswer.jsx";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import "./index.css";

export default function Root() {
  const { authData, setAuthData } = useContext(AuthContext);

  // setAuthData({
  //   ...authData,
  //   userSettings: { 
  //     theme: !authData?.userSettings?.theme ,
  //      language: true },
  // });

  useEffect(() => {
    const root = document.documentElement;
    if (authData?.userSettings?.theme ) {
      root.style.setProperty(
        "--gray-background",
        "var(--gray-background-light)"
      );
    } else {
      root.style.setProperty(
        "--gray-background",
        "var(--gray-background-dark)"
      );
    }
  }, [authData]);

  return (
    // <div className={`gray-background ${theme}`}>
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
        <Route path="/view-templateAnswer" element={<ViewTemplateAnswer />} />
      </Routes>
    </Router>
    // </div>
  );
}
