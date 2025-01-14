import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input, Button, AvatarIcon, Avatar } from "@nextui-org/react";
import { EyeFilledIcon } from "../../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../assets/EyeSlashFilledIcon";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "../Home/Header";
import toast from "react-hot-toast";
import "../../index.css";
const AP_URL = import.meta.env.VITE_APP_URL;

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();

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
    setIsLoading(true);
    try {
      const response = await fetch(`${AP_URL}/user/register`, {
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
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Successfully registered user!");
        navigate("/login");
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
    <div className="gray-background px-3 py-3 h-screen ">
      <div className="h-1/6">
        <Header />
      </div>
      <div className="flex w-full items-center justify-center flex-col h-auto h-4/6 ">
        <Card
          className={`w-64 sm:w-72 md:w-80 h-auto flex items-center  ${
            authData?.userSettings?.theme ? "bg-neutral-300" : "bg-neutral-500"
          }`}>
          {/* <p className="mt-5">Don't have an account? Sign up!</p> */}
          <div className="flex items-center justify-center my-2.5">
            <Avatar
              icon={<AvatarIcon />}
              className={` ${
                authData?.userSettings?.theme ? "bg-zinc-500 text-white" : ""
              } `}
            />
          </div>
          <div className="space-y-2 mx-4">
            {/* Input Name */}
            <div className="">
              <Input
                value={user?.firstName}
                isRequired
                size="sm"
                label={
                  authData?.userSettings?.language ? "First Name" : "Nombres"
                }
                variant="flat"
                placeholder={
                  authData?.userSettings?.language
                    ? "Enter your name"
                    : "Ingresa tus nombres"
                }
                onChange={handleInputFirstName}></Input>
            </div>
            <div className="">
              <Input
                value={user?.lastName}
                isRequired
                size="sm"
                label={
                  authData?.userSettings?.language ? "Last Name" : "Apellidos"
                }
                variant="flat"
                placeholder={
                  authData?.userSettings?.language
                    ? "Enter your Last Name"
                    : "Ingresa tus apellidos"
                }
                onChange={handleInputLastName}></Input>
            </div>
            {/* Input Email */}
            <div className="">
              <Input
                isRequired
                size="sm"
                label="Email"
                variant="flat"
                placeholder={
                  authData?.userSettings?.language
                    ? "Enter your email"
                    : "Ingresa tu email"
                }
                onChange={handleInputEmail}></Input>
            </div>
            {/* Input PassWord */}
            <div className="">
              <Input
                isRequired
                size="sm"
                label={
                  authData?.userSettings?.language ? "Password" : "Contraseña"
                }
                variant="flat"
                placeholder={
                  authData?.userSettings?.language
                    ? "Enter your password"
                    : "Ingresa tu contraseña"
                }
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
          <Button
            isLoading={isLoading}
            onClick={handleSubmit}
            className={`w-40 text-white font-semibold my-4 ${
              authData?.userSettings?.theme ? "bg-zinc-500" : "bg-amber-400"
            }`}
            size="md">
            {authData?.userSettings?.language
              ? "Create Account"
              : "Crear Cuenta"}
          </Button>
        </Card>
      </div>
      <div className="h-1/6 flex flex items-center justify-center ">
        {" "}
        <p className="text-xs text-center mt-4 sm:text-sm">
          {authData?.userSettings?.language
            ? "Already have an account? "
            : "Ya tienes una cuenta? "}
          <Link
            to="/login"
            className={` hover:underline font-semibold ${
              authData?.userSettings?.theme ? "text-black" : "text-white"
            }`}>
            {authData?.userSettings?.language ? "Log In" : "Iniciar Sesión"}
          </Link>
        </p>
      </div>
    </div>
  );
}
