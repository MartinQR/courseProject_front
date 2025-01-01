import { useState, useEffect, useContext } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../Home/Header";
import { AuthContext } from "../../contexts/AuthContext";

const AP_URL = import.meta.env.VITE_APP_URL;

export default function Login() {
  const { setAuthData } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [userForm, setUserForm] = useState();
  const [isloading, setIsLoading] = useState();

  const navigate = useNavigate();

  // Handle Actions

  function handleInputEmail(e) {
    setUserForm({ ...userForm, email: e.target.value });
  }

  function handleInputPassword(e) {
    setUserForm({ ...userForm, password: e.target.value });
  }

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${AP_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userForm.email,
          password: userForm.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Successsfully Login!");
        setAuthData(data);
        localStorage.setItem("authData", JSON.stringify(data));
        navigate("/", { state: { email: userForm.email } });
      } else {
        toast.error("Error: " + data.error);
      }
    } catch (error) {
      console.error("Request error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="gray-background px-3 py-3 h-screen  ">
      <div className="h-1/5">
        <Header />
      </div>

      <div className="flex items-center justify-center h-auto flex-col px-4 md:px-0 ">
        <Card className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto flex items-center my-4 md:my-5 p-4 md:px-10 px-6 bg-neutral-500">
          <p className="mt-2 text-center text-xl sm:text-3xl text-white">
            LOGIN
          </p>

          <div className="my-3 w-full">
            {/* Input Email */}
            <div className="my-3 w-full">
              <Input
                value={userForm?.email}
                onChange={handleInputEmail}
                isRequired
                size="sm"
                label="Email"
                variant="flat"
                placeholder="Enter your email"
                className="w-full text-sm sm:text-base"
              />
            </div>
            {/* Input Password */}
            <div className="my-3 w-full">
              <Input
                value={userForm?.password}
                onChange={handleInputPassword}
                isRequired
                size="sm"
                label="Password"
                variant="flat"
                placeholder="Enter your password"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility">
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-full text-sm sm:text-base"
              />
            </div>
          </div>
          <Button
            className="w-full md:w-40 bg-amber-400 text-white font-semibold"
            size="md"
            isLoading={isloading}
            onClick={handleLogin}>
            Sign In
          </Button>
        </Card>
      </div>
      <div className="h-1/5 flex flex items-center justify-center ">
        <p className="text-xs text-center mt-4 sm:text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-white hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
