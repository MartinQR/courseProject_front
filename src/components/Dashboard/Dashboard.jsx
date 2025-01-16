import { useState, useEffect, useContext } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useWindowSize from "../../Hooks.jsx/UseWindowSize.js";
import { div } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import TableUsers from "./TableUsers.jsx";
import { TemplatesManagment } from "./TemplatesManagment.jsx";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { Card, Avatar, Button, Chip } from "@nextui-org/react";
import arrow from "../../assets/arrowthin.svg";
import { SearchTemplateModal } from "../SearchTemplateModal/SearchTemplateModal.jsx";
import logoSalesforce from "../../assets/Salesforce.png";
import SalesforceModal from "../SalesForce/SalesforceModal.jsx";
import JiraModal from "../Jira/JiraModal.jsx";
import ViewTickets from "../Jira/ViewTickets.jsx";
import CreateTicket from "../Jira/CreateTicket.jsx";

export default function Dashboard() {
  const { authData, setAuthData } = useContext(AuthContext);
  const [openSearch, setOpenSearch] = useState(false);
  const [openSalesforce, setOpenSalesforce] = useState(false);
  const [openJira, setOpenJira] = useState(false);

  const size = useWindowSize();
  const navigate = useNavigate();

  // console.log("Auth Data", authData);
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
          <div
            className={`${
              authData?.userSettings?.theme
                ? "bg-neutral-300"
                : "bg-neutral-100"
            } row-span-2 bg-neutral-100 border-radius2 flex items-center justify-center text-2xl text-wrap`}>
            {authData?.userSettings?.language ? "DASHBOARD" : "PANEL"}
          </div>
          <div
            className={`${
              authData?.userSettings?.theme
                ? "bg-neutral-300"
                : "bg-neutral-100"
            } bg-neutral-100 border-radius2 flex items-center justify-center p-4 text-4xl`}>
            <button
              className="w-24"
              onClick={() => {
                setOpenSalesforce(true);
              }}>
              <img src={logoSalesforce} />
            </button>
          </div>
          <div
            className={`${
              authData?.userSettings?.theme
                ? "bg-neutral-300"
                : "bg-neutral-100"
            } bg-neutral-100 border-radius2 flex items-center justify-center flex-col p-4 text-4xl `}>
            {" "}
            {authData?.isAdmin ? (
              <Chip color="success">ADMIN</Chip>
            ) : (
              <Chip color="warning">STAFF</Chip>
            )}
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
          <div
            className={`${
              authData?.userSettings?.theme
                ? "bg-neutral-300"
                : "bg-neutral-100"
            } bg-neutral-100 row-start-2 col-start-1 border-radius2 flex items-center justify-center p-4`}>
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

          <div
            className={`${
              authData?.userSettings?.theme
                ? "bg-neutral-300"
                : "bg-neutral-100"
            } bg-neutral-100 row-start-2 col-start-2 border-radius2 flex items-center justify-center p-3`}>
            {" "}
            <Button
              className={`w-full h-full ${
                authData?.userSettings?.theme
                  ? "bg-neutral-300"
                  : "bg-neutral-100"
              }`}
              onClick={() => {
                setOpenJira(true);
              }}>
              {/* {authData?.userSettings?.language ? "HELP?" : "AYUDA"} */}

              <div className="w-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  height="100"
                  width="100%">
                  <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                </svg>
              </div>
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
            <div>
              {authData?.userSettings?.language ? "DASHBOARD" : "PANEL"}
            </div>
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
            <p className="text-3xl">
              {authData?.userSettings?.language ? "DASHBOARD" : "PANEL"}
            </p>
          </Card>
        </div>
      ) : (
        "No resize window"
      )}
      {/* Body Div */}
      <div className="w-full h-auto py-3 flex flex-col items-center">
        {/* <div className="w-auto ml-8 mt-4 ">
          <p className="text-4xl">{authData?.userSettings?.language ? "DASHBOARD" : "PANEL"}"}}</p>
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
          <p className="text-3xl text-center">
            {authData?.userSettings?.language
              ? "Templates Managment"
              : "Gestión de Plantillas"}
          </p>
          <TemplatesManagment />
        </div>
        <div className="mt-4 w-full flex flex-col items-center ">
          <div className="flex items-center space-x-3">
            <p className="text-3xl text-center">
              {authData?.userSettings?.language
                ? "Help Tickets"
                : "Tickets de Ayuda"}
            </p>
            <div className="w-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M64 64C28.7 64 0 92.7 0 128l0 64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320l0 64c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-64c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-64c0-35.3-28.7-64-64-64L64 64zm64 112l0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16l0-160c0-8.8-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-320 0c-17.7 0-32-14.3-32-32l0-192z" />
              </svg>
            </div>
          </div>
          <ViewTickets />
        </div>
      </div>
      <SearchTemplateModal
        open={openSearch}
        setOpen={setOpenSearch}></SearchTemplateModal>
      <SalesforceModal
        open={openSalesforce}
        setOpen={setOpenSalesforce}></SalesforceModal>
      <JiraModal open={openJira} setOpen={setOpenJira}></JiraModal>
      <CreateTicket />
    </div>
  );
}
