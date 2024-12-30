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
  Spinner,
  Avatar,
} from "@nextui-org/react";
import AddInput from "../Input/AddInput";
import RenderInput from "../Input/RenderInput";
import toast from "react-hot-toast";
import arrow from "../../assets/arrowthin.svg";
import { useNavigate } from "react-router-dom";
const APP_URL = import.meta.env.VITE_APP_URL;
const APP_FRONT = import.meta.env.VITE_APP_FRONT;
import { AuthContext } from "../../contexts/AuthContext";
import useWindowSize from "../../Hooks.jsx/UseWindowSize.js";
import { SearchTemplateModal } from "../SearchTemplateModal/SearchTemplateModal.jsx";
import { SearchUsersModal } from "../SearchUsersModal/SearchUsersModal.jsx";

export default function CreateForm() {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [topicsData, setTopicsData] = useState();
  const [usersData, setUsersData] = useState();
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const [formResponse, setFormResponse] = useState();
  const { authData, setAuthData } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [tagValue, setTagValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const size = useWindowSize();

  const initialFormData = {
    userId: authData?.userId,
    title: "",
    description: "",
    topicId: "",
    tags: [],
    isPublic: true,
    allowedUsers: [],
    inputsData: [],
  };

  useEffect(() => {
    setFormData({
      userId: authData?.userId,
      title: "",
      description: "",
      topicId: "",
      tags: [],
      isPublic: true,
      allowedUsers: [],
      inputsData: [],
    });
  }, [authData]);


  function validateForm() {
    if (!formData.title) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.description) {
      toast.error("Description is required");
      return false;
    }
    if (!formData.topicId) {
      toast.error("Topic is required");
      return false;
    }
    if (!formData.inputsData.length) {
      toast.error("At least one input is required");
      return false;
    }
    return true;
  }

  // Post Method to create a Form
  async function handleCreateForm() {
    setIsLoading(true);

    try {
      if (!validateForm()) return;

      const response = await fetch(`${APP_URL}/form/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          alowedUsers: formData?.allowedUsers?.map((user) => user?.id),
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
      setFormResponse(data);
      setFormData(initialFormData);
      setTagValue("");

      toast.success("Form created sucessfully!");
      setOpenModal(true);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Get TopisID
  async function fetchTopics() {
    try {
      const response = await fetch(`${APP_URL}/topic/getAll`);

      if (!response.ok) {
        throw new Error("Error fetching topics");
      }
      const data = await response.json();

      setTopicsData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    fetchTopics();
  }, []);

  // Handle Actions

  function handleAddTags(e) {
    const value = e.target.value;

    setTagValue(value);

    const tagsArray = value
      ?.split(",")
      ?.map((tag) => tag?.trim())
      ?.filter((tag) => tag);

    setFormData({ ...formData, tags: tagsArray });
  }

  const InputTag = (
    <Input
      variant="bordered"
      label="#TAGS"
      onChange={handleAddTags}
      placeholder="tag1, tag2, tag3"
      value={tagValue}
    />
  );
  
  const allowedUsersInput = (
    <Button
      onClick={() => setOpenUsersModal(true)} 
    >
      Allowed Users
    </Button>
  );

  const handleClickPublic = (e) => {
    setFormData({ ...formData, isPublic: e.target.checked });
  };
  

  const titleInput = (
    <Input
      variant="bordered"
      label="Title"
      onChange={(e) => {
        setFormData({ ...formData, title: e.target.value });
      }}
      value={formData?.title}
    />
  );

  const descriptionInput = (
    <Textarea
      variant="bordered"
      label="Description"
      onChange={(e) =>
        setFormData({ ...formData, description: e.target.value })
      }
      value={formData?.description}
    />
  );
  

  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3 flex items-center flex-col">
      {/* ----------------- START HEADER ----------------- */}
      {allowedUsersInput}

      <SearchUsersModal 
        open={openUsersModal}
        setOpen={setOpenUsersModal}
        form={formData}
        setForm={setFormData}
      />

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
          <div className="row-span-2 bg-neutral-100 border-radius2 flex items-center justify-center ">
            <div className="w-full h-full p-4">
              <div className="w-full h-1/3 flex items-center justify-center">
                {titleInput}
              </div>
              <div className="w-full h-2/3  flex items-center justify-center">
                {descriptionInput}
              </div>
            </div>
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center p-4">
            {InputTag}
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center flex-col p-4">
            <Select
              className="max-w-xs"
              label="Topic "
              variant="bordered"
              onChange={(e) =>
                setFormData({ ...formData, topicId: e.target.value })
              }>
              {topicsData?.map((topic) => (
                <SelectItem key={topic?.id}>{topic?.name}</SelectItem>
              ))}
            </Select>
            {/* <p>Public</p> */}
          </div>

          <div className="col-span-2 col-start-4 flex space-x-1 ">
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
          </div>
          <div className="bg-neutral-100 row-start-2 col-start-1 border-radius2 flex items-center justify-center p-4">
            {isloading ? (
              <Spinner />
            ) : (
              <button className="w-1/2 flex" onClick={handleCreateForm}>
                <div className="flex w-full items-center">
                  <div className="w-1/2 text-right">CREATE FORM</div>
                  <img src={arrow} className="h-auto object-contain" />
                </div>
              </button>
            )}
          </div>

          <div className="bg-neutral-100 row-start-2 col-start-2 border-radius2 flex items-center justify-center p-4">
            <Checkbox
              defaultSelected
              onChange={handleClickPublic}>
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
                  className="h-full w-full flex items-center justify-center font-semibold text-xl bg-neutral-900 text-white rounded-xl"
                  size="md"
                  onClick={() => {
                    navigate("/");
                  }}>
                  formo
                </button>
              </div>
            </div>
          </div>
          <Card className="w-full h-auto p-4 space-y-2">
            <div className="w-2/5 space-y-2 w-full">
              <div className="w-full flex items-center justify-center">
                {titleInput}
              </div>
              <div className="w-full   flex items-center justify-center">
                {descriptionInput}
              </div>
            </div>
            <div className="w-2/5 space-x-2 w-full flex items-center justify-center flex-row  ">
              <div className="w-1/2">{InputTag}</div>

              <div className="w-1/2">
                <Select
                  className="max-w-xs"
                  label="Topic "
                  variant="bordered"
                  onChange={(e) =>
                    setFormData({ ...formData, topicId: e.target.value })
                  }>
                  {topicsData?.map((topic) => (
                    <SelectItem key={topic?.id}>{topic?.name}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-center w-full ">
              <div className="flex-grow flex items-center justify-center ">
                <Checkbox
                  defaultSelected
                  onChange={handleClickPublic}>
                  Public
                </Checkbox>
              </div>
              {isloading ? (
                <Spinner />
              ) : (
                <button
                  className="flex w-1/2 items-center"
                  onClick={handleCreateForm}>
                  <div className="w-3/5 text-right">CREATE FORM</div>
                  <div className="w-1/5 flex">
                    <img src={arrow} className="w-auto object-contain" />
                  </div>
                </button>
              )}
            </div>
          </Card>
        </div>
      ) : size.width <= 768 ? (
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
                  className="h-full w-full  flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white rounded-3xl"
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
            <div className="w-2/5 space-y-2">
              <div className="w-full flex items-center justify-center">
                {titleInput}
              </div>
              <div className="w-full   flex items-center justify-center">
                {descriptionInput}
              </div>
            </div>
            <div className="w-2/5 space-y-2 h-full flex flex-col ">
              {InputTag}

              <Select
                className="max-w-xs"
                label="Topic "
                variant="bordered"
                onChange={(e) =>
                  setFormData({ ...formData, topicId: e.target.value })
                }>
                {topicsData?.map((topic) => (
                  <SelectItem key={topic?.id}>{topic?.name}</SelectItem>
                ))}
              </Select>
              <div className="flex-grow flex items-center ml-1 ">
                <Checkbox
                  defaultSelected
                  onChange={handleClickPublic}>
                  Public
                </Checkbox>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-1/5 ">
              {isloading ? (
                <Spinner />
              ) : (
                <div>
                  <div className="w-1/2 text-right">CREATE FORM</div>
                  <button className="w-full flex" onClick={handleCreateForm}>
                    <img src={arrow} className="h-auto object-contain" />
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>
      ) : (
        "No resize"
      )}

      {/* ------------------ END HEADER ----------------- */}
      <p className="text-center text-3xl my-5">CREATE A NEW FORM</p>
      <Card className="bg-neutral-100  w-full sm:w-4/5 lg:w-3/5  mb-5 p-5">
        {/* <RenderInput inputData={input}></RenderInput> */}

        <div className="">
          {formData?.inputsData?.map((item, index) => {
            return (
              <div key={index}>
                <RenderInput
                  inputData={item}
                  index={index}
                  setFormData={setFormData}
                  formData={formData}
                />
              </div>
            );
          })}
        </div>
        <div className="my-4">
          <AddInput setFormData={setFormData} formData={formData} />
        </div>
      </Card>

      {/* Confirmation Modal */}

      <Modal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        size="lg">
        <ModalContent>
          <ModalHeader className="flex items-center">
            <p>Form created sucessfully!</p>
            <div className="w-6 h-auto ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  fill="#32CD32"
                  d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                />
              </svg>
            </div>
          </ModalHeader>
          <ModalBody className="m-2">
            <div>
              Your form has been created successfully. Share the link below so
              others can respond to it, or provide the generated Form ID.
            </div>
            <div className="text-sm space-y-21">
              <div>
                <span className="font-bold">Form Link: </span>
                {`${APP_FRONT}/fill-form?idTemplate=${formResponse?.id}`}
              </div>
              <div>
                <span className="font-bold">Form ID: </span> {formResponse?.id}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              onClick={() => {
                navigate("/dashboard");
              }}>
              My Forms
            </Button>
            <Button
              variant="flat"
              onClick={() => {
                setOpenModal(false);
              }}>
              New Form
            </Button>
            <Button
              variant="shadow"
              onClick={() => {
                navigate("/");
              }}>
              Home
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SearchTemplateModal
        open={openSearch}
        setOpen={setOpenSearch}></SearchTemplateModal>
    </div>
  );
}
