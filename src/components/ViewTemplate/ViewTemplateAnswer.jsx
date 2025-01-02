import "../../index.css";
import { useState, useEffect, useContext } from "react";
import {
  Card,
  Spinner,
  Avatar,
  ButtonGroup,
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
import arrow from "../../assets/arrowthin.svg";
import { useSearchParams } from "react-router-dom";
import { formatDateTime } from "../../Utils/utils.js";
import { div, form } from "framer-motion/m";
import EditInput from "../Input/EditInput.jsx";
import { SearchTemplateModal } from "../SearchTemplateModal/SearchTemplateModal.jsx";

export default function ViewTemplateAnswer() {
  const { authData, setAuthData } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [btnEditAnswer, setBtnEditAnswer] = useState(false);
  const [formEditAnswers, setFormEditAnswers] = useState([]);
  const size = useWindowSize();
  const idTemplate = searchParams.get("templateId");
  const idUser = searchParams.get("userId");
  const [openSearch, setOpenSearch] = useState(false);

  const fetchTemplateResponseByUser = async (userId, formId) => {
    try {
      const response = await fetch(
        `${APP_URL}/form/getFilledOutFormByUserId?userId=${userId}&formId=${formId}`
      );
      if (!response.ok) {
        throw new Error("Error gettin Form");
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error gettinf Form:", error);
    }
  };

  useEffect(() => {
    if (idTemplate && idUser) {
      fetchTemplateResponseByUser(idUser, idTemplate);
    }
  }, [idTemplate]);

  // Copy all the inputs

  useEffect(() => {
    const copyInputs = formData?.inputs?.map((item) => {
      return item;
    });

    setFormEditAnswers(copyInputs);

    console.log("Copy Inputs", copyInputs);
  }, [formData]);

  const navigate = useNavigate();

  //   Handle Actions

  function submitNewAnswers() {
    const newAnswers = formEditAnswers?.map((item) => {
      return {
        id: item?.id,
        answer: item?.answer,
      };
    });

    const formNewAnswers = {
      formId: formData?.id,
      userId: formData?.user?.id,
      inputs: newAnswers,
    };

    console.log("form newAnswers", formNewAnswers);
    submitUpdateAnswers(formNewAnswers);
  }

  async function submitUpdateAnswers(newAnswers) {
    setIsLoading(true);
    console.log("Entra");
    try {
      const response = await fetch(`${APP_URL}/form/updateFilledOutForm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnswers),
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

      toast.success("Form updated sucessfully!");
      setBtnEditAnswer(false);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // console.log("Form Data", formData);
  // console.log("Answers Form", answersForm);
  // console.log("Filled Form", filledForm);
  // console.log("authData", authData);
  // console.log("Form Data", formData);
  // console.log("Template Modifications",templateModifications)
  console.log("Form Data", formData);
  //   console.log("Form Edit Answers", formEditAnswers);

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
              <>
                {" "}
                <button
                  className="w-2/3 max-w-28 flex "
                  onClick={() => {
                    navigate(-1);
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
            <Checkbox
              defaultSelected
              // onChange={(e) => {
              //   setFormData({ ...formData, isPublic: e.target.checked });
              // }}
            >
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
              {/* <Button>SUBMIT</Button> */}
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
          <Card className="w-full h-auto p-4 flex flex-row space-x-2">
            <div className="w-full flex flex-col items-center space-y-2">
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

            {/* <div className="flex flex-col items-center justify-center w-1/5 ">
              <div className="w-1/2 text-right">SUBMIT</div>
              <button className="w-full flex">
                <img src={arrow} className="h-auto object-contain" />
              </button>
            </div> */}
          </Card>
        </div>
      ) : (
        "No resize window"
      )}

      {/* Body Div */}
      <div className="mt-4 w-full flex items-center flex-col justify-center space-y-2">
        <Button
          color={btnEditAnswer ? "primary" : "default"}
          onClick={() => {
            setBtnEditAnswer(true);
          }}>
          Edit Answers
        </Button>
        {btnEditAnswer && (
          // <ButtonGroup>
          <div className="space-x-2">
            <Button isLoading={isLoading} onClick={submitNewAnswers}>
              Submit
            </Button>
            <Button
              color="danger"
              onClick={() => {
                fetchTemplateResponseByUser(idUser, idTemplate);
                setBtnEditAnswer(false);
              }}>
              Cancel
            </Button>
          </div>
          // </ButtonGroup>
        )}
        <Card className="bg-neutral-100 w-full sm:w-4/5 lg:w-3/5 my-5 p-5 space-y-2">
          <div className="flex  flex-col items-center space-y-2">
            <div>
              Form completed by {formData?.user?.firstName}{" "}
              {formData?.user?.lastName}
            </div>
            <div>{formData?.user?.email}</div>
          </div>

          {/* Render of answers */}

          {formEditAnswers?.map((item, index) => (
            <EditInput
              inputData={item}
              viewAnswers={true}
              editAnswer={btnEditAnswer}
              formEditAnswers={formEditAnswers}
              setFormEditAnswers={setFormEditAnswers}></EditInput>
          ))}
        </Card>
      </div>
      <SearchTemplateModal
        open={openSearch}
        setOpen={setOpenSearch}></SearchTemplateModal>
    </div>
  );
}
