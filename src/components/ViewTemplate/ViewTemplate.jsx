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
import RenderInputFill from "../Input/RenderInputFill.jsx";
import EditInput from "../Input/EditInput.jsx";
import arrow from "../../assets/arrowthin.svg";
import { useSearchParams } from "react-router-dom";
import { formatDateTime } from "../../Utils/utils.js";
import { SearchTemplateModal } from "../SearchTemplateModal/SearchTemplateModal.jsx";
const APP_FRONT = import.meta.env.VITE_APP_FRONT;
import { SearchUsersModal } from "../SearchUsersModal/SearchUsersModal.jsx";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import AddInput from "../Input/AddInput.jsx";

export default function ViewTemplate() {
  const { authData, setAuthData } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [filledForm, setFilledForm] = useState({});
  const [answersForm, setAnswersForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [btnSelection, setBtnSelection] = useState(false);
  const [btnSelection2, setBtnSelection2] = useState(false);
  const [btnDrag, setBtnDrag] = useState(false);
  const size = useWindowSize();
  const idTemplate = searchParams.get("idTemplate");
  const [templateModifications, setTemplateModifications] = useState([]);
  const [filledOutForms, setFilledOutForms] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openUsersModal, setOpenUsersModal] = useState(false);

  // const [editInput, setEditInput] = useState();
  // const [editAnswer, setEditAnswwer] = useState();

  useEffect(() => {
    if (idTemplate) {
      getTemplate(idTemplate);
      getFilledForms(idTemplate);
    }
  }, [idTemplate]);

  // Copy all the inputs

  useEffect(() => {
    const copyInputs = formData?.inputs?.map((item, index) => {
      return {
        id: item?.id,
        title: item?.title,
        type: item?.type,
        description: item?.description,
        displayed: item?.display,
        options: item?.values,
        dragIndex: index,
      };
    });

    setTemplateModifications(copyInputs);

    // console.log("Copy Inputs", copyInputs);
  }, [formData]);

  const navigate = useNavigate();

  // SUBMIT THE EDITED TEMPLATE
  async function handleSubmitEditedTemplate() {
    const idexedInputs = templateModifications.map((item, index) => {
      return { ...item, dragIndex: index };
    });

    const templateEditData = {
      formId: idTemplate,
      inputsData: idexedInputs,
      userId: authData?.userId,
      allowedUsers: formData?.allowedUsers?.map((el) => el?.id),
    };

    setIsLoading(true);
    try {
      const response = await fetch(`${APP_URL}/form/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateEditData),
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
      setBtnDrag(false);
      setBtnSelection(false);
    }
  }

  // Get template to fill
  const getTemplate = async (formId) => {
    try {
      const response = await fetch(`${APP_URL}/form/getFormById?id=${formId}`);
      if (!response.ok) {
        throw new Error("Error gettin Form");
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error("Error gettinf Form:", error);
    }
  };

  // GET A LIST OF ALL THE FILLED OUT FORMS OF A TEMPLATE
  const getFilledForms = async (templateId) => {
    try {
      const response = await fetch(
        `${APP_URL}/formResponse/getAllFilledOutFormsByFormId?formId=${templateId}`
      );
      if (!response.ok) {
        throw new Error("Error gettin Form");
      }
      const data = await response.json();
      setFilledOutForms(data);
    } catch (error) {
      console.error("Error gettinf Form:", error);
    }
  };

  // useEffect(() => {
  //   fetchForm("2852440d-01d5-4e5d-9293-eae559737df3");
  // }, []);

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

  // Handle Actions
  function handleViewTemplateAnswer(templateId, userId) {
    console.log("TemplateId", templateId);
    navigate(`/view-templateAnswer?templateId=${templateId}&userId=${userId}`);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log("Active", active.id);
    console.log("Over", over.id);

    const oldIndex = templateModifications.findIndex(
      (item) => item?.id === active?.id
    );
    const newIndex = templateModifications.findIndex(
      (item) => item?.id === over?.id
    );

    const newOrderInputs = arrayMove(templateModifications, oldIndex, newIndex);
    console.log("New Order Inputs", newOrderInputs);
    console.log("Old Index", oldIndex);
    console.log("New Index", newIndex);
    setTemplateModifications(newOrderInputs);
  }

  console.log("Template Modifications", templateModifications);
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
                  className="w-2/3 flex "
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
                </div>{" "}
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
            <div className="h-auto text-center">{formData?.description}</div>
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
        <div className="w-full  sm:w-3/5 md:w-4/5 flex  flex-row space-x-2">
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
            className="w-1/2">
            Share Template
            <div className="w-5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                height="100"
                width="100%">
                <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2l0 64-112 0C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96l96 0 0 64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" />
              </svg>
            </div>
          </Button>
          <Button
            className="w-1/2"
            color={btnSelection2 ? "primary" : "default"}
            onClick={() => {
              setBtnSelection(false);
              setBtnSelection2(true);
              setBtnDrag(false);
            }}>
            View Responses
          </Button>
        </div>

        <ButtonGroup className="w-full sm:px-0 sm:w-3/5 md:w-4/5 ">
          <Button
            className="w-1/2"
            color={btnSelection ? "primary" : "default"}
            onClick={() => {
              setBtnSelection(true);
              setBtnSelection2(false);
              setBtnDrag(false);
            }}>
            Modify Template
          </Button>
          <Button
            className="w-1/2"
            color={btnDrag ? "primary" : "default"}
            onClick={() => {
              setBtnSelection(false);
              setBtnSelection2(false);
              setBtnDrag(true);
            }}>
            Enabled Drag
          </Button>
        </ButtonGroup>
        {btnSelection && (
          <div className="space-x-2 flex items-center">
            <Button isLoading={isLoading} onClick={handleSubmitEditedTemplate}>
              Submit
            </Button>
            <Button
              color="danger"
              onClick={() => {
                getTemplate(idTemplate);
                setBtnSelection(false);
              }}>
              Cancel
            </Button>
          </div>
        )}
        {btnDrag && (
          <div className="space-x-2 flex items-center">
            <Button isLoading={isLoading} onClick={handleSubmitEditedTemplate}>
              Submit
            </Button>
            <Button
              color="danger"
              onClick={() => {
                getTemplate(idTemplate);
                setBtnDrag(false);
              }}>
              Cancel
            </Button>
          </div>
        )}
        {btnSelection && (
          <p className="text-sm">
            {" "}
            Created by: {formData?.creator?.firstName}{" "}
            {formData?.creator?.lastName}
          </p>
        )}

        <Button onClick={() => setOpenUsersModal(true)}>Allowed Users</Button>
        {btnSelection2 ? (
          <Card className="bg-neutral-100 w-full sm:w-4/5 lg:w-3/5 my-5 p-5 space-y-2">
            <p className="text-center my-2">Filled Forms</p>
            {filledOutForms?.map((item, index) => (
              <Card
                className="py-2 text-sm flex flex-row justify-around"
                isPressable
                onPress={() => {
                  handleViewTemplateAnswer(item?.formId, item?.user?.id);
                }}>
                <div className="w-1/2">
                  {item?.user?.firstName} {item?.user?.lastName}
                </div>
                <div className="w-1/2">{formatDateTime(item?.createdAt)}</div>
              </Card>
            ))}
          </Card>
        ) : (
          <Card className="bg-neutral-100 w-full sm:w-4/5 lg:w-3/5 my-5 p-5">
            {btnDrag ? (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <SortableContext
                  items={templateModifications ?? []}
                  strategy={verticalListSortingStrategy}>
                  {templateModifications?.map((item, index) => (
                    <EditInput
                      inputData={item}
                      filledForm={filledForm}
                      editInput={btnSelection}
                      editAnswer={false}
                      templateModifications={templateModifications}
                      setTemplateModifications={setTemplateModifications}
                      index={index}
                      key={item?.id}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              templateModifications?.map((item, index) => (
                <EditInput
                  inputData={item}
                  filledForm={filledForm}
                  editInput={btnSelection}
                  editAnswer={false}
                  templateModifications={templateModifications}
                  setTemplateModifications={setTemplateModifications}
                  index={index}
                  key={item?.id}
                />
              ))
            )}
            {btnSelection && (
              <AddInput
                setFormData={setTemplateModifications}
                formData={templateModifications}
                edit={true}></AddInput>
            )}
          </Card>
        )}
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        size="lg"
        className="py-5 px-8">
        <ModalContent>
          <ModalHeader className="flex flex-row items-center">
            <p>Here is all the information you need to share the form</p>
            <div className="w-14 h-auto ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#32CD32"
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                />
              </svg>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="text-sm">
              <span className="font-semibold">Template Id:</span> {idTemplate}
            </div>

            <div className="text-sm">
              <span className="font-semibold">Template Link:</span>{" "}
              {`${APP_FRONT}/fill-form?idTemplate=${idTemplate}`}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SearchTemplateModal
        open={openSearch}
        setOpen={setOpenSearch}></SearchTemplateModal>

      <SearchUsersModal
        form={formData}
        setForm={setFormData}
        open={openUsersModal}
        setOpen={setOpenUsersModal}
      />
    </div>
  );
}
