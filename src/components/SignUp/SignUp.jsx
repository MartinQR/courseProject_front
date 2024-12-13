import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button, AvatarIcon, Avatar } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import Header from "../Home/Header";
import toast from "react-hot-toast";
import "../../index.css";
const AP_URL = import.meta.env.VITE_APP_URL;

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [user, setUser] = useState();
  const navigate = useNavigate();

  // Handle Functions

  function handleInputFirstName(e) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

    if (regex.test(e.target.value)) {
      setUser({ ...user, firstName: e.target.value.trim() });
    }
  }

  function handleInputLastName(e) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;

    if (regex.test(e.target.value)) {
      setUser({ ...user, lastName: e.target.value.trim() });
    }
  }

  function handleInputEmail(e) {
    setUser({ ...user, email: e.target.value.trim() });
  }

  function handleInputPassword(e) {
    setUser({ ...user, password: e.target.value });
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${AP_URL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Successfully registered user: " + JSON.stringify(data));
        toast.success("Successfully registered user!");
        navigate("/");
      } else {
        console.log("Error: " + data.message);
        toast.error("Error: " + data.message);
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  };
  console.log("User", user);
  return (
    <div className="gray-background px-3 py-3 h-screen ">
      <div className="h-1/6">
        <Header />
      </div>
      <div className="flex w-full items-center justify-center flex-col h-auto h-4/6 ">
        <Card className="w-64 sm:w-72 md:w-80 h-auto flex items-center bg-neutral-500 ">
          {/* <p className="mt-5">Don't have an account? Sign up!</p> */}
          <div className="flex items-center justify-center my-2.5">
            <Avatar
              icon={<AvatarIcon />}
              classNames={{
                icon: "text-black/80",
              }}
            />
          </div>
          <div className="space-y-2 mx-4">
            {/* Input Name */}
            <div className="">
              <Input
                value={user?.firstName}
                isRequired
                size="sm"
                label="First Name "
                variant="flat"
                placeholder="Enter your name"
                onChange={handleInputFirstName}></Input>
            </div>
            <div className="">
              <Input
                value={user?.lastName}
                isRequired
                size="sm"
                label="Last Name"
                variant="flat"
                placeholder="Enter your name"
                onChange={handleInputLastName}></Input>
            </div>
            {/* Input Email */}
            <div className="">
              <Input
                isRequired
                size="sm"
                label="Email"
                variant="flat"
                placeholder="Enter your email"
                onChange={handleInputEmail}></Input>
            </div>
            {/* Input PassWord */}
            <div className="">
              <Input
                isRequired
                size="sm"
                label="Password"
                variant="flat"
                placeholder="Enter your password"
                onChange={handleInputPassword}
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
                className="max-w-xs"
              />
            </div>
          </div>
          <Button onClick={handleSubmit} className="w-40 my-2.5 bg-amber-400 text-white font-semibold" size="sm">
            Create Account
          </Button>
        </Card>
      </div>
      <div className="h-1/6 flex flex items-center justify-center ">
        {" "}
        <p className="text-xs text-center mt-4 sm:text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white hover:underline font-semibold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
