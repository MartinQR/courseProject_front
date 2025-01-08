import { useState, useEffect, useContext } from "react";
import { Card, Button } from "@nextui-org/react";
import "../../index.css";
import imgPhone from "../../assets/undraw_mobile_ux_re_59hr.svg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export default function MainCard() {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <Card
        className={`w-full h-96 my-4 border-radius border-radius-m flex flex-col sm:flex-row space-y-2 ${
          authData?.userSettings?.theme ? "bg-neutral-300" : "bg-neutral-500"
        }`}>
        <div className=" w-full sm:w-1/2 h-full flex items-center justify-center overflow-hidden">
          <img
            src={imgPhone}
            alt="Phone"
            className="w-auto h-screen  object-contain sm:object-cover"
          />
        </div>
        <div className="w-full sm:w-1/2 h-full  flex items-center justify-center flex-col gap-y-4 px-3 text-center sm:text-left sm:px-8 ">
          <div className="text-base sm:text-2xl font-semibold">
            {authData?.userSettings?.language
              ? "Tools to create seamless online forms with Formo."
              : "Herramientas para crear formularios en línea con Formo."}
          </div>
          <div className="text-sm sm:text-base">
            {authData?.userSettings?.language
              ? "Formo gives users the tools to create online forms that are simple,efficient, and customizable for any need."
              : "Formo ofrece a los usuarios las herramientas para crear formularios e simples,y personalizables para cualquier necesidad."}
          </div>
          <div className=" mb-3">
            <Button
              color="primary"
              className={` ${
                authData?.userSettings?.theme ? "bg-zinc-800" : "bg-zinc-100 text-black"
              }`}
              // className="bg-zinc-800"
              onClick={() => {
                if (!authData?.userId) {
                  toast.error("Please login to create a form");
                  return;
                }
                navigate("/create-form");
              }}>
              {authData?.userSettings?.language ? " START BUILDING!" : "CREAR!"}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
