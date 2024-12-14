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
} from "@nextui-org/react";
import AddInput from "../Input/AddInput";
import RenderInput from "../Input/RenderInput";
import toast from "react-hot-toast";
import arrow from "../../assets/arrowthin.svg";
import { useNavigate } from "react-router-dom";
const APP_URL = import.meta.env.VITE_APP_URL;
import { AuthContext } from "../../contexts/AuthContext";
import useWindowSize from "../../Hooks.jsx/UseWindowSize.js";

export default function CreateForm() {
  const [newInput, setNewInput] = useState();
  const [isloading, setIsLoading] = useState();
  const [topicsData, setTopicsData] = useState();
  const { authData, setAuthData } = useContext(AuthContext);

  const size = useWindowSize();

  const initialFormData = {
    userId: authData?.id,
    title: "",
    description: "",
    topicId: "",
    tags: [],
    isPublic: true,
    allowedUsers: [],
    inputsData: [],
  };

  const [formData, setFormData] = useState(initialFormData);

  const navigate = useNavigate();

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
        body: JSON.stringify(formData),
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

      navigate("/create-form");
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
    const tagsArray = value
      ?.split(",")
      ?.map((tag) => tag?.trim())
      ?.filter((tag) => tag);

    setFormData({ ...formData, tags: tagsArray });
  }

  // UTILS

  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3 flex items-center flex-col">
      {/* ----------------- START HEADER ----------------- */}

      {size?.width >= 768 ? (
        <div className="grid grid-cols-5  gap-2 w-full auto-rows-[6rem]">
          <div className="bg-orange-600 border-radius2 "></div>
          <div className="bg-amber-400 border-radius2"></div>
          <div className="row-span-2 bg-neutral-100 border-radius2 flex items-center justify-center ">
            <div className="w-full h-full p-4">
              <div className="w-full h-1/3 flex items-center justify-center">
                <Input
                  variant="bordered"
                  label="Title"
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                />
              </div>
              <div className="w-full h-2/3  flex items-center justify-center">
                <Textarea
                  variant="bordered"
                  label="Description"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center p-4">
            <Input
              variant="bordered"
              label="#TAGS"
              onChange={handleAddTags}
              placeholder="tag1, tag2, tag3"
            />
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
              <Card
                className="h-full  flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius3"
                size="md">
                formo
              </Card>
            </div>
          </div>
          <div className="bg-neutral-100 row-start-2 col-start-1 border-radius2 flex items-center justify-center p-4">
            <div className="flex w-full items-center">
              <div className="w-1/2 text-right">CREATE FORM</div>
              <button className="w-1/2 flex" onClick={handleCreateForm}>
                <img src={arrow} className="h-auto object-contain" />
              </button>
            </div>
          </div>

          <div className="bg-neutral-100 row-start-2 col-start-2 border-radius2 flex items-center justify-center p-4">
            <Checkbox
              defaultSelected
              onChange={(e) => {
                setFormData({ ...formData, isPublic: e.target.checked });
              }}>
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
              <div className="bg-amber-400 rounded-xl flex items-center justify-center w-1/2">
                2
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
                <Card
                  className="h-full  flex items-center justify-center font-semibold text-xl bg-neutral-900 text-white rounded-xl"
                  size="md">
                  formo
                </Card>
              </div>
            </div>
          </div>
          <Card className="w-full h-auto p-4 space-y-2">
            <div className="w-2/5 space-y-2 w-full">
              <div className="w-full flex items-center justify-center">
                <Input
                  variant="bordered"
                  label="Title"
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                />
              </div>
              <div className="w-full   flex items-center justify-center">
                <Textarea
                  variant="bordered"
                  label="Description"
                  minRows={6}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-2/5 space-x-2 w-full flex items-center justify-center flex-row  ">
              <div className="w-1/2">
                <Input
                  variant="bordered"
                  label="#TAGS"
                  onChange={handleAddTags}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

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
                  onChange={(e) => {
                    setFormData({ ...formData, isPublic: e.target.checked });
                  }}>
                  Public
                </Checkbox>
              </div>
              <button
                className="flex w-1/2 items-center"
                onClick={handleCreateForm}>
                <div className="w-3/5 text-right">CREATE FORM</div>
                <div className="w-1/5 flex">
                  <img src={arrow} className="w-auto object-contain" />
                </div>
              </button>
            </div>
          </Card>
        </div>
      ) : size.width <= 768 ? (
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
                2
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
                <Card
                  className="h-full  flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white rounded-3xl"
                  size="md">
                  formo
                </Card>
              </div>
            </div>
          </div>
          <Card className="w-full h-auto p-4 flex flex-row space-x-2">
            <div className="w-2/5 space-y-2">
              <div className="w-full flex items-center justify-center">
                <Input
                  variant="bordered"
                  label="Title"
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                />
              </div>
              <div className="w-full   flex items-center justify-center">
                <Textarea
                  variant="bordered"
                  label="Description"
                  minRows={6}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="w-2/5 space-y-2 h-full flex flex-col ">
              <Input
                variant="bordered"
                label="#TAGS"
                onChange={handleAddTags}
                placeholder="tag1, tag2, tag3"
              />

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
                  onChange={(e) => {
                    setFormData({ ...formData, isPublic: e.target.checked });
                  }}>
                  Public
                </Checkbox>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-1/5 ">
              <div className="w-1/2 text-right">CREATE FORM</div>
              <button className="w-full flex" onClick={handleCreateForm}>
                <img src={arrow} className="h-auto object-contain" />
              </button>
            </div>
          </Card>
        </div>
      ) : (
        "No resize"
      )}

      {/* ------------------ END HEADER ----------------- */}

      <Card className="bg-neutral-100 w-3/5 my-5 p-5">
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
    </div>
  );
}
