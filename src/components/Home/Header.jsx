import { useState, useEffect, useContext } from "react";
import { Card, CardBody, Button, ButtonGroup, Avatar } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { SearchTemplateModal } from "../SearchTemplateModal/SearchTemplateModal";
const APP_URL = import.meta.env.VITE_APP_URL;

export default function Header() {
  const [toggleBtn, setToggleBtn] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isloading, setIsLoading] = useState(true);

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

  // Handle Actions
  async function handleUpdateUserSettings(userId, theme, language) {
    setIsLoading(true);

    try {
      const response = await fetch(`${APP_URL}/user/updateUserSettings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          theme: theme,
          language: language,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            `Error ${response.status}: ${response.statusText}`
        );
      }
      // SuccesFully Response
      const data = await response.json();
      toast.success("User Settings Updated Succesfully!");
      setOpenModal(true);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  console.log("Auth Data", authData);
  return (
    <>
      <div className="flex flex-wrap items-center justify-between space-y-1.5">
        <div className="flex  gap-1 ">
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
          <div className="flex space-x-1">
            {toggleBtn ? (
              <div className="flex flex-row space-x-2">
                <button
                  onClick={() => setToggleBtn(!toggleBtn)}
                  className="w-12 h-12  rounded-full flex items-center justify-center bg-neutral-300">
                  <div className="w-8 h-0.5 bg-white absolute bg-black"></div>{" "}
                </button>
              </div>
            ) : (
              <div className="flex flex-row space-x-2">
                <button
                  onClick={() => setToggleBtn(!toggleBtn)}
                  className="w-12 h-12  rounded-full flex items-center justify-center bg-neutral-300">
                  <div className="w-0.5 h-8 bg-white absolute bg-black"></div>{" "}
                  <div className="w-8 h-0.5 bg-white absolute bg-black"></div>{" "}
                </button>
              </div>
            )}
            <div>
              <button
                className="w-12 h-12 bg-orange-600  rounded-full flex items-center justify-center"
                onClick={() => {
                  setOpen(true);
                }}>
                <div className="w-6 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    height="100"
                    width="100%">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </div>
              </button>
            </div>
            <div>
              <button
                className="w-12 h-12 bg-zinc-500  rounded-full flex items-center justify-center"
                onClick={() => {
                  setAuthData({
                    ...authData,
                    userSettings: {
                      ...authData?.userSettings,
                      theme: !authData?.userSettings?.theme,
                      //  language: "en"
                    },
                  });
                  handleUpdateUserSettings(
                    authData?.userId,
                    !authData?.userSettings?.theme,
                    authData?.userSettings?.language
                  );
                }}>
                <div className="w-6 flex items-center  justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    height="100"
                    width="100%">
                    <path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                  </svg>
                </div>
              </button>
            </div>
            <div>
              <button
                className="w-12 h-12 bg-zinc-500  rounded-full flex items-center justify-center"
                onClick={() => {
                  setAuthData({
                    ...authData,
                    userSettings: {
                      ...authData?.userSettings,
                      language: !authData?.userSettings?.language,
                    },
                  });
                  handleUpdateUserSettings(
                    authData?.userId,
                    !authData?.userSettings?.theme,
                  !authData?.userSettings?.language
                  );
                  localStorage.setItem("authData", JSON.stringify(authData));
                }}>
                {authData?.userSettings?.language ? (
                  <p className="text-2xl text-center">EN</p>
                ) : (
                  <p className="text-2xl text-center">ES</p>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          {toggleBtn && (
            <div className="space-x-1 flex flex-wrap">
              {authData?.userId  ? (
                <>
                  <Button
                    className="h-10"
                    onClick={() => {
                      navigate("/create-form");
                    }}>
                    {authData?.userSettings?.language
                      ? "Create Form"
                      : "Crear Formulario"}
                  </Button>

                  <Button
                    className="h-10"
                    onClick={() => {
                      navigate("/fill-form");
                    }}>
                    {authData?.userSettings?.language
                      ? "Fill out form"
                      : "Llenar Formulario"}
                  </Button>

                  <Button
                    className="h-10"
                    onClick={() => {
                      navigate("/dashboard");
                    }}>
                    {authData?.userSettings?.language ? "Dashboard" : "Panel"}
                  </Button>

                  <Button className="h-10" onClick={logOut}>
                    {authData?.userSettings?.language
                      ? "Log out"
                      : "Cerrar Sesion"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="h-10"
                    onClick={() => {
                      navigate("/login");
                    }}>
                    {authData?.userSettings?.language
                      ? "Login"
                      : "Iniciar Sesion"}
                  </Button>
                  <Button
                    className="h-10"
                    onClick={() => {
                      navigate("/signup");
                    }}>
                    {authData?.userSettings?.language
                      ? "Sign Up"
                      : "Registrarse"}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="min-w-40  ">
          {authData?.email && (
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
              {authData?.userId ? (
                <>
                  <Button
                    className="h-10 mt-2"
                    onClick={() => {
                      navigate("/create-form");
                    }}>
                    {authData?.userSettings?.language
                      ? "Create Form"
                      : "Crear Formulario"}
                  </Button>

                  <Button
                    className="h-10 mt-2"
                    onClick={() => {
                      navigate("/fill-form");
                    }}>
                    {authData?.userSettings?.language
                      ? "Fill out form"
                      : "Llenar Formulario"}
                  </Button>

                  <Button
                    className="h-10 mt-2"
                    onClick={() => {
                      navigate("/dashboard");
                    }}>
                    {authData?.userSettings?.language ? "Dashboard" : "Panel"}
                  </Button>

                  <Button className="h-10 mt-2" onClick={logOut}>
                    {authData?.userSettings?.language
                      ? "Log out"
                      : "Cerrar Sesion"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="h-10 mt-1"
                    onClick={() => {
                      navigate("/login");
                    }}>
                    {authData?.userSettings?.language
                      ? "Login"
                      : "Iniciar Sesion"}
                  </Button>
                  <Button
                    className="h-10 mt-1"
                    onClick={() => {
                      navigate("/signup");
                    }}>
                    {authData?.userSettings?.language
                      ? "Sign Up"
                      : "Registrarse"}
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* <Button
        onClick={() => {
          setOpen(true);
        }}>
        Search
      </Button> */}
      <SearchTemplateModal open={open} setOpen={setOpen} />
    </>
  );
}
