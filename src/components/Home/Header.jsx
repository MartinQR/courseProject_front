import { useState, useEffect } from "react";
import { Card, CardBody, Button, ButtonGroup } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [toggleBtn, setToggleBtn] = useState(false);

  const navigate = useNavigate();

  // handleActions
  // function handleCreateForm() {
  //   navigate("/create-form");
  // }

  return (
    <div className="flex  gap-1">
      <div className="w-6 ">
        <Card
          className="h-12 flex items-center justify-center font-semibold text-2xl bg-neutral-900 text-white "
          size="md">
          .
        </Card>
      </div>
      <div>
        <Card
          className="h-12 w-12 flex items-center justify-center font-semibold text-xl bg-neutral-900 text-white"
          size="md">
          /
        </Card>
      </div>
      <div>
        <button onClick={()=>{navigate("/")}}>
          <Card
            className="h-12 w-28 rounded-3xl flex items-center justify-center font-semibold text-2xl bg-neutral-900 text-white"
            size="md">
            formo
          </Card>
        </button>
      </div>
      {toggleBtn ? (
        <button
          onClick={() => setToggleBtn(!toggleBtn)}
          className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center bg-neutral-300">
          <div className="w-8 h-0.5 bg-white absolute bg-black"></div>{" "}
        </button>
      ) : (
        <button
          onClick={() => setToggleBtn(!toggleBtn)}
          className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center bg-neutral-300">
          <div className="w-0.5 h-8 bg-white absolute bg-black"></div>{" "}
          <div className="w-8 h-0.5 bg-white absolute bg-black"></div>{" "}
        </button>
      )}

      {toggleBtn && (
        <div className="space-x-1 ml-2">
          <Button
            className="h-12"
            onClick={() => {
              navigate("/login");
            }}>
            Login
          </Button>
          <Button
            className="h-12"
            onClick={() => {
              navigate("/signup");
            }}>
            Sign Up
          </Button>
          <Button className="h-12">Join Form</Button>
          <Button
            className="h-12"
            onClick={() => {
              navigate("/create-form");
            }}>
            Create Form
          </Button>
          <Button
            className="h-12"
            onClick={() => {
              navigate("/dashboard");
            }}>
            Dashboard
          </Button>
        </div>
      )}

      {/* <div >
        <Card className="w-12 h-12 rounded-full flex items-center justify-center text-5xl" size="md">+</Card>
      </div> */}
    </div>
  );
}
