import { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useWindowSize from "../../Hooks.jsx/UseWindowSize.js";
import { div } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import TableUsers from "./TableUsers.jsx";
import { TemplatesManagment } from "./TemplatesManagment.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import {
  Card,
  Spinner,
  Avatar,
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
import arrow from "../../assets/arrowthin.svg";
import { SearchTemplateModal } from "../SearchTemplateModal/SearchTemplateModal.jsx";

export default function Dashboard() {
  const { authData, setAuthData } = useContext(AuthContext);
  const [openSearch, setOpenSearch] = useState(false);

  const size = useWindowSize();
  const navigate = useNavigate();

  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3 flex items-center flex-col">
      {size?.width >= 768 ? (
        <div className="grid grid-cols-5  gap-2 w-full auto-rows-[6rem]">
          <div className="bg-orange-600 border-radius2 flex items-center justify-center ">
            <div className="w-16">
              <button
                onClick={() => {
                  setOpenSearch(true);
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="100"
                  width="100%">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </button>
            </div>
            {/* <button className=" space-y-0.5">
              <div className="w-20 h-5 bg-neutral-900 rounded-t-lg"></div>
              <div className="w-20 h-5 bg-neutral-900"></div>
              <div className="w-20 h-5 bg-neutral-900 rounded-b-lg"></div>
            </button> */}
          </div>
          <div className="bg-amber-400 border-radius2 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center space-x-2 mr-2 ">
              <Avatar showFallback src="https://images.unsplash.com/broken" />
              <p className="text-center text-sm">
                {authData?.firstName} {authData?.lastName}
              </p>
            </div>
          </div>
          <div className="row-span-2 bg-neutral-100 border-radius2 flex items-center justify-center text-2xl text-wrap">
            DASHBOARD
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center p-4 text-4xl">
            formo
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center flex-col p-4 text-4xl ">
            {" "}
            - -
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
            <div className="flex w-full items-center justify-center">
              <>
                {" "}
                <button
                  className="w-3/5 max-w-28 flex "
                  onClick={() => {
                    navigate("/");
                  }}>
                  <img
                    src={arrow}
                    className="h-auto object-contain transform rotate-180"
                  />
                </button>
              </>
            </div>
          </div>

          <div className="bg-neutral-100 row-start-2 col-start-2 border-radius2 flex items-center justify-center p-4">
            {" "}
            <Button
              onClick={() => {
                setAuthData(null);
                localStorage.removeItem("authData");
                navigate("/");
              }}>
              Log out
            </Button> 
          </div>
        </div>
      ) : size?.width <= 468 ? (
        <div className="w-full space-y-2">
          <div className="flex flex-row w-full h-12 space-x-1">
            <div className="flex w-2/6  space-x-2">
              <div className="bg-orange-600 rounded-xl flex items-center justify-center w-1/2">
                {/* Hamburguer Menu */}
                <div className="w-7">
                  <button
                    onClick={() => {
                      setOpenSearch(true);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height="100"
                      width="100%">
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                  </button>
                </div>
                {/* <button className=" space-y-0.5">
                  <div className="w-8 h-2 bg-neutral-900 rounded-t-lg"></div>
                  <div className="w-8 h-2 bg-neutral-900"></div>
                  <div className="w-8 h-2 bg-neutral-900 rounded-b-lg"></div>
                </button> */}
              </div>
              <div className="bg-amber-400 rounded-xl flex text-center items-center justify-center w-1/2 text-xs">
                {authData?.firstName} {authData?.lastName}
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
          <Card className="w-full h-20 flex items-center justify-center text-3xl">
            <div>DASHBOARD</div>
          </Card>
        </div>
      ) : size?.width <= 768 ? (
        <div className="w-full space-y-2">
          <div className="flex flex-row w-full h-20 space-x-1">
            <div className="flex w-2/6  space-x-2">
              <div className="bg-orange-600 rounded-3xl flex items-center justify-center w-1/2">
                {/* Hamburguer Menu */}
                <div className="w-11">
                  <button
                    onClick={() => {
                      setOpenSearch(true);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      height="100"
                      width="100%">
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                  </button>
                </div>
                {/* <button className=" space-y-0.5">
                  <div className="w-12 h-3 bg-neutral-900 rounded-t-lg"></div>
                  <div className="w-12 h-3 bg-neutral-900"></div>
                  <div className="w-12 h-3 bg-neutral-900 rounded-b-lg"></div>
                </button> */}
              </div>
              <div className="bg-amber-400 rounded-3xl flex items-center justify-center w-1/2">
                <div className="flex flex-col items-center justify-center space-x-2 mr-2 ">
                  <p className="text-center text-sm">
                    {authData?.firstName} {authData?.lastName}
                  </p>
                </div>
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
          <Card className="w-full h-20 flex items-center justify-center ">
            <p className="text-3xl">DASHBOARD</p>
          </Card>
        </div>
      ) : (
        "No resize window"
      )}
      {/* Body Div */}
      <div className="w-full h-auto py-3 flex flex-col items-center">
        {/* <div className="w-auto ml-8 mt-4 ">
          <p className="text-4xl">DASHBOARD</p>
        </div> */}
        {/* Table Managment */}
        {authData?.isAdmin ? (
          <div className="w-full  flex items-center justify-center flex-col mt-4 overflow-x-auto ">
            <p className="text-3xl">USERS</p>
            <TableUsers />
          </div>
        ) : null}

        {/* Templates and Forms Managment */}
        <div className="mt-4 w-full flex flex-col items-center ">
          <p className="text-3xl text-center">Templates Managment</p>
          <TemplatesManagment />
        </div>
      </div>
      <SearchTemplateModal
        open={openSearch}
        setOpen={setOpenSearch}></SearchTemplateModal>
    </div>
  );
}
