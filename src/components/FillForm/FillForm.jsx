import "../../index.css";
import { useState, useEffect, useContext } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const APP_URL = import.meta.env.VITE_APP_URL;
import { AuthContext } from "../../contexts/AuthContext";
import useWindowSize from "../../Hooks.jsx/UseWindowSize.js";

export default function FillForm() {
  const { authData, setAuthData } = useContext(AuthContext);
  const size = useWindowSize();

  // Get template to fill
  const fetchForm = async () => {
    try {
      const response = await fetch(`${AP_URL}/user/getAll`);
      if (!response.ok) {
        throw new Error("Error fetching users");
      }
      const data = await response.json();
      setDataUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3 flex items-center flex-col">
      {size?.width >= 768 ? (
        <div className="grid grid-cols-5  gap-2 w-full auto-rows-[6rem]">
          <div className="bg-orange-600 border-radius2 flex items-center justify-center ">
            <button className=" space-y-0.5">
              <div className="w-20 h-5 bg-neutral-900 rounded-t-lg"></div>
              <div className="w-20 h-5 bg-neutral-900"></div>
              <div className="w-20 h-5 bg-neutral-900 rounded-b-lg"></div>
            </button>
          </div>
          <div className="bg-amber-400 border-radius2 flex items-center justify-center">
            2
          </div>
          <div className="row-span-2 bg-neutral-100 border-radius2 flex items-center justify-center ">
            3
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center p-4">
            4
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center flex-col p-4">
            5
          </div>

          <div className="col-span-2 col-start-4 flex space-x-1 ">
            {/* Inicia Div 8 */}
            <div className="w-1/6 ">
              <Card
                className="h-full flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius3 "
                size="md">
                .
              </Card>
            </div>
            <div className="w-2/6">
              <Card
                className="h-full  flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius2"
                size="md">
                /
              </Card>
            </div>
            <div className="w-3/6">
              <button
                className="h-full w-full  flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius3"
                size="md"
                onClick={() => {
                  navigate("/");
                }}>
                formo
              </button>
            </div>
            {/* Termina Div 9 */}
          </div>
          <div className="bg-neutral-100 row-start-2 col-start-1 border-radius2 flex items-center justify-center p-4">
            6
          </div>

          <div className="bg-neutral-100 row-start-2 col-start-2 border-radius2 flex items-center justify-center p-4">
            {" "}
            7
          </div>
        </div>
      ) : size?.width <= 468 ? (
        <div className="w-full space-y-2">
          <div className="flex flex-row w-full h-12 space-x-1">
            <div className="flex w-2/6  space-x-2">
              <div className="bg-orange-600 rounded-xl flex items-center justify-center w-1/2">
                {/* Hamburguer Menu */}

                <button className=" space-y-0.5">
                  <div className="w-8 h-2 bg-neutral-900 rounded-t-lg"></div>
                  <div className="w-8 h-2 bg-neutral-900"></div>
                  <div className="w-8 h-2 bg-neutral-900 rounded-b-lg"></div>
                </button>
              </div>
              <div className="bg-amber-400 rounded-xl flex items-center justify-center w-1/2">
                2
              </div>
            </div>
            <div className="w-4/6  col-span-2 col-start-4 flex space-x-1  ">
              <div className="w-1/6 ">
                <Card
                  className="h-full flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius3 "
                  size="md">
                  .
                </Card>
              </div>
              <div className="w-2/6">
                <Card
                  className="h-full  flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius2"
                  size="md">
                  /
                </Card>
              </div>
              <div className="w-3/6">
                <button
                  className="h-full w-full  flex items-center justify-center font-semibold text-xl bg-neutral-900 text-white rounded-xl"
                  size="md"
                  onClick={() => {
                    navigate("/");
                  }}>
                  formo
                </button>
              </div>
            </div>
          </div>
          <Card className="w-full h-20"></Card>
        </div>
      ) : size?.width <= 768 ? (
        <div className="w-full space-y-2">
          <div className="flex flex-row w-full h-20 space-x-1">
            <div className="flex w-2/6  space-x-2">
              <div className="bg-orange-600 rounded-3xl flex items-center justify-center w-1/2">
                {/* Hamburguer Menu */}

                <button className=" space-y-0.5">
                  <div className="w-12 h-3 bg-neutral-900 rounded-t-lg"></div>
                  <div className="w-12 h-3 bg-neutral-900"></div>
                  <div className="w-12 h-3 bg-neutral-900 rounded-b-lg"></div>
                </button>
              </div>
              <div className="bg-amber-400 rounded-3xl flex items-center justify-center w-1/2">
                2
              </div>
            </div>
            <div className="w-4/6  col-span-2 col-start-4 flex space-x-1  ">
              <div className="w-1/6 ">
                <Card
                  className="h-full flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius3 "
                  size="md">
                  .
                </Card>
              </div>
              <div className="w-2/6">
                <Card
                  className="h-full  flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius2"
                  size="md">
                  /
                </Card>
              </div>
              <div className="w-3/6">
                <button
                  className="h-full w-full flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white rounded-3xl"
                  size="md"
                  onClick={() => {
                    navigate("/");
                  }}>
                  formo
                </button>
              </div>
            </div>
          </div>
          <Card className="w-full h-20"></Card>
        </div>
      ) : (
        "No resize window"
      )}
      {/* Body Div */}
      <div className="mt-4 w-full flex items-center justify-center px-10">
        <p className="text-4xl">PLEASE FILL OUT THE FORM</p>
      </div>
    </div>
  );
}
