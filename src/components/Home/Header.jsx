import { useState, useEffect, useContext } from "react";
import { Card, CardBody, Button, ButtonGroup, Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { SearchTemplateModal } from "../SearchTemplateModal/SearchTemplateModal";

export default function Header() {
  const [toggleBtn, setToggleBtn] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

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
    <>
      <div className="flex flex-wrap items-center justify-between space-y-1.5">
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
          <div>
            {toggleBtn ? (
              <button
                onClick={() => setToggleBtn(!toggleBtn)}
                className="w-12 h-12  rounded-full flex items-center justify-center bg-neutral-300">
                <div className="w-8 h-0.5 bg-white absolute bg-black"></div>{" "}
              </button>
            ) : (
              <button
                onClick={() => setToggleBtn(!toggleBtn)}
                className="w-12 h-12  rounded-full flex items-center justify-center bg-neutral-300">
                <div className="w-0.5 h-8 bg-white absolute bg-black"></div>{" "}
                <div className="w-8 h-0.5 bg-white absolute bg-black"></div>{" "}
              </button>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          {toggleBtn && (
            <div className="space-x-1 flex flex-wrap">
              {authData ? (
                <>
                  <Button
                    className="h-10"
                    onClick={() => {
                      navigate("/create-form");
                    }}>
                    Create Form
                  </Button>

                  <Button
                    className="h-10"
                    onClick={() => {
                      navigate("/fill-form");
                    }}>
                    Fill out form
                  </Button>

                  <Button
                    className="h-10"
                    onClick={() => {
                      navigate("/dashboard");
                    }}>
                    Dashboard
                  </Button>

                  <Button className="h-10" onClick={logOut}>
                    Log out
                  </Button>
                </>
              ) : (
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

        <div className="min-w-40  ">
          {authData && (
            <div className="flex items-center space-x-2 mr-2 ">
              <Avatar showFallback src="https://images.unsplash.com/broken" />
              <p className="">
                {authData?.firstName} {authData?.lastName}
              </p>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="block lg:hidden ">
          {toggleBtn && (
            <div className="space-x-1 flex flex-wrap items-center">
              {authData ? (
                <>
                  <Button
                    className="h-10 mt-2"
                    onClick={() => {
                      navigate("/create-form");
                    }}>
                    Create Form
                  </Button>

                  <Button
                    className="h-10 mt-2"
                    onClick={() => {
                      navigate("/fill-form");
                    }}>
                    Fill out form
                  </Button>

                  <Button
                    className="h-10 mt-2"
                    onClick={() => {
                      navigate("/dashboard");
                    }}>
                    Dashboard
                  </Button>

                  <Button className="h-10 mt-2" onClick={logOut}>
                    Log out
                  </Button>
                </>
              ) : (
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
      </div>

      <Button onClick={() => {
          setOpen(true)
        }} 
      >
        Search
      </Button>
      <SearchTemplateModal 
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
