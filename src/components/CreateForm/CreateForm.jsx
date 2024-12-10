import "../../index.css";
import { useState, useEffect } from "react";
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

export default function CreateForm() {
  const [formData, setFormData] = useState();
  const [newInput, setNewInput] = useState();

  const input = {
    title: "Favorite Food",
    type: "CHECKBOX",
    description: "Check the food you like",
    displayed: true,
    options: ["Hamburguer", "Banana", "Hot Cakes", "Fruit"],
  };

  useEffect(() => {
    setFormData({
      title: "",
      description: "",
      topic: "",
      tags: [],
      isPublic: true,
      allowedUsers: [],
      inputsData: [],
    });
  }, []);

  // Handle Actions

  function handleAddTags(e) {
    const value = e.target.value;
    const tagsArray = value.split(",").map((palabra) => palabra.trim());
    setFormData({ ...formData, tags: tagsArray });
  }

  // UTILS

  const topics = [
    { key: "EDUCATION", label: "Education" },
    { key: "PERSONAL", label: "Personal" },
    { key: "QUIZ", label: "Quiz" },
    { key: "OTHER", label: "Other" },
  ];

  console.log("Form Data", formData);
  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3 flex items-center flex-col">
      {/* Header of Template */}
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
                }}></Input>
            </div>
            <div className="w-full h-2/3  flex items-center justify-center">
              <Textarea
                variant="bordered"
                label="Description"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }></Textarea>
            </div>
          </div>
        </div>
        <div className="bg-neutral-100 border-radius2 flex items-center justify-center p-4">
          <Input
            variant="bordered"
            label="#TAGS"
            onChange={handleAddTags}></Input>
        </div>
        <div className="bg-neutral-100 border-radius2 flex items-center justify-center flex-col p-4">
          <Select
            className="max-w-xs"
            label="Topic "
            variant="bordered"
            onChange={(e) =>
              setFormData({ ...formData, topic: e.target.value })
            }>
            {topics.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
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
        <div className="bg-neutral-100 row-start-2 col-start-1 border-radius2 flex items-center justify-center p-4"></div>
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

      {/* <Card className="w-full h-24 my-3 rounded-3xl bg-neutral-500 flex justify-center items-center">
        {" "}
        Form Title
      </Card> */}

      <Card className="bg-neutral-100 w-3/5 my-5 p-5">
        {/* <RenderInput inputData={input}></RenderInput> */}
        <div className="space-y-4 my-4">
          {formData?.inputsData?.map((item, index) => {
            return (
              <div key={index}>
                <RenderInput inputData={item}></RenderInput>
              </div>
            );
          })}
        </div>
        <AddInput className="my-4" setFormData={setFormData} formData={formData}></AddInput>
      </Card>
    </div>
  );
}
