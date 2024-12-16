import { useState, useEffect, useContext } from "react";
import { Card, CardBody, Button, ButtonGroup, Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
  const [toggleBtn, setToggleBtn] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);

  const navigate = useNavigate();

  // handleActions
  // function handleCreateForm() {
  //   navigate("/create-form");
  // }

  function logOut() {
    setAuthData(null);
    localStorage.removeItem("authData");
    navigate("/");
  }

  return (
    <div className="flex items-center justify-between ">
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
          <button
            onClick={() => {
              navigate("/");
            }}>
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
            
            {authData ? (
              <>
                <Button
                  className="h-12"
                  onClick={() => {
                    navigate("/create-form");
                  }}
                >
                  Create Form
                </Button>

                <Button className="h-12">Join Form</Button>

                <Button
                  className="h-12"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Dashboard
                </Button>

                <Button
                  className="h-12"
                  onClick={logOut}
                >
                  Log out
                </Button>
              </>
            )
            :(
              <>
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
              </>
            )}
          </div>
        )}
      </div>
      {authData && (
        <div className="flex items-center space-x-2 mr-2 ">
          <Avatar showFallback src="https://images.unsplash.com/broken" />
          <p className="">
            {authData?.firstName} {authData?.lastName}
          </p>
        </div>
      )}
    </div>
  );
}
