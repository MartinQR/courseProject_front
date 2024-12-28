import "../../index.css";
import { useState, useEffect, useContext } from "react";
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
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const APP_URL = import.meta.env.VITE_APP_URL;
import { AuthContext } from "../../contexts/AuthContext";
import useWindowSize from "../../Hooks.jsx/UseWindowSize.js";
import RenderInputFill from "../Input/RenderInputFill.jsx";
import arrow from "../../assets/arrowthin.svg";
import { useSearchParams } from "react-router-dom";
import Comments from "../Comments/Comments.jsx";
import Likes from "../Likes/Likes.jsx";

export default function FillForm() {
  const { authData, setAuthData } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [filledForm, setFilledForm] = useState({});
  const [answersForm, setAnswersForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isloading2,setIsLoading2]= useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [templateIdModal, setTemplateIdModal] = useState("");
  const size = useWindowSize();
  const idTemplate = searchParams.get("idTemplate");

  useEffect(() => {
    if (idTemplate) {
      getTemplate(idTemplate);
    } else {
      setOpenModal(true);
    }
  }, [idTemplate]);

  const navigate = useNavigate();

  // SUBMIT DE FORM
  async function handleSubmitForm() {
    setIsLoading(true);
    try {
      const response = await fetch(`${APP_URL}/form/filloutForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filledForm),
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

      toast.success("Form created sucessfully!");
      setOpenModal(true);
      // navigate("/create-form");
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Get template to fill
  const getTemplate = async (formId) => {
    setIsLoading2(true)
    try {
      const response = await fetch(`${APP_URL}/form/getFormById?id=${formId}`);
      if (!response.ok) {
        throw new Error("Error gettin Form");
      }
      const data = await response.json();
      setFormData(data);
      setOpenModal(false)
    } catch (error) {
      console.error("Error gettinf Form:", error);
    }finally {
      setIsLoading2(false);
    }
  };

 

  useEffect(() => {
    const answersForm = formData?.inputs?.map((item) => {
      return { inputId: item?.id };
    });

    setFilledForm({
      formId: formData?.id,
      userId: authData?.userId,
      answers: answersForm,
    });
  }, [formData]);

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
            <div className="flex flex-col items-center justify-center space-x-2 mr-2 ">
              <Avatar showFallback src="https://images.unsplash.com/broken" />
              <p className="text-center text-sm">
                {authData?.firstName} {authData?.lastName}
              </p>
            </div>
          </div>
          <div className="row-span-2 bg-neutral-100 border-radius2 flex items-center justify-center flex-col p-4 ">
            <div className="text-center font-bold text-sm h-1/3">
              {formData?.title}
            </div>
            <div className="text-center text-xs h-2/3">
              {formData?.description}
            </div>
          </div>
          <div className="bg-neutral-100 border-radius2 p-4">
            {formData?.tags?.map((item, index) => {
              return (
                <p key={index} className="text-xs">
                  #{item}
                </p>
              );
            })}
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center flex-col p-4">
            {formData?.topic?.name}
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
              {isLoading ? (
                <Spinner size="lg" color="warning" />
              ) : (
                <>
                  {" "}
                  <div className="w-1/2 text-right">SUBMIT</div>
                  <button className="w-1/2 flex " onClick={handleSubmitForm}>
                    <img src={arrow} className="h-auto object-contain" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="bg-neutral-100 row-start-2 col-start-2 border-radius2 flex items-center justify-center p-4">
            <Checkbox defaultSelected isDisabled>
              Public
            </Checkbox>
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
          <Card className="w-full h-auto p-4 flex flex-row space-y-2 flex flex-col">
            <div className=" text-center font-bold text-xl">
              {formData?.title}
            </div>
            <div className="h-auto">{formData?.description}</div>
            <Card className="text-center">
              {formData?.tags?.map((item, index) => {
                return (
                  <p key={index} className="text-xs">
                    #{item}
                  </p>
                );
              })}
            </Card>
            <Card className="text-center">{formData?.topic?.name}</Card>
            <div className="flex items-center justify-center space-x-10 ">
              <div>
                <Checkbox defaultSelected>Public</Checkbox>
              </div>
              <Button>SUBMIT</Button>
            </div>
          </Card>
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
          <Card className="w-full h-auto p-4 flex flex-row space-x-2">
            <div className="w-4/5 flex flex-col items-center space-y-2">
              <div className="h-1/6 font-bold text-xl">{formData?.title}</div>
              <div className="h-auto">{formData?.description}</div>
              <div className="w-full flex space-x-4">
                <Card className="w-1/2 px-4 ">
                  {formData?.tags?.map((item, index) => {
                    return (
                      <p key={index} className="text-xs">
                        #{item}
                      </p>
                    );
                  })}
                </Card>
                <Card className="w-1/2 items-center justify-center">
                  {formData?.topic?.name}
                </Card>
              </div>
              <div className="">
                <Checkbox defaultSelected>Public</Checkbox>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-1/5 ">
              <div className="w-1/2 text-right">SUBMIT</div>
              <button className="w-full flex" onClick={handleSubmitForm}>
                <img src={arrow} className="h-auto object-contain" />
              </button>
            </div>
          </Card>
        </div>
      ) : (
        "No resize window"
      )}
      {/* Body Div */}
      <div className="mt-4 w-full flex items-center flex-col justify-center space-y-2">
        <p className="text-4xl text-center">PLEASE FILL OUT THE FORM</p>
        <p className="text-sm">
          Created by: {formData?.creator?.firstName}{" "}
          {formData?.creator?.lastName}
        </p>
        <Card className="bg-neutral-100 w-full sm:w-4/5 lg:w-3/5 my-5 p-5">
          {formData?.inputs?.map((item) => (
            <RenderInputFill
              key={item?.id}
              filledForm={filledForm}
              setFilledForm={setFilledForm}
              answersForm={answersForm}
              setAnswersForm={setAnswersForm}
              inputData={item}
            />
          ))}
        </Card>

        <Likes formId={formData?.id} />

        <Comments formId={formData?.id} />
        <Modal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
          }}>
          <ModalContent className="p-4">
            <ModalHeader>
              <p>Enter the template ID to fill out.</p>
            </ModalHeader>
            <ModalBody>
              <Input
                value={templateIdModal}
                onChange={(e) => {
                  setTemplateIdModal(e.target.value);
                }}
                label="Form ID"></Input>
              <Button
                isLoading={isloading2}
                onClick={() => getTemplate(templateIdModal)}
                className="bg-orange-600 text-white m-2">
                Fill out Form!
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
