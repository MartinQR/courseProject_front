import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
} from "@nextui-org/react";
import "../../index.css";

// Component that generates a question/input and returns it as an object
export default function AddInput({ setFormData, formData }) {
  const [inputData, setInputData] = useState({});
  const [newOption, setNewOption] = useState("");

  useEffect(() => {
    setInputData({
      title: "",
      type: "",
      description: "",
      displayed: true,
      options: [],
    });
  }, []);

  //   Handle Options

  function clearInput() {
    setInputData({
      title: "",
      type: null,
      description: "",
      displayed: true,
      options: [],
    });
  }

  function handleAddOption() {
    setInputData({ ...inputData, options: [...inputData.options, newOption] });
    setNewOption("");
  }

  function handleAddInput() {
    setFormData({
      ...formData,
      inputsData: [...formData.inputsData, inputData],
    });
    clearInput();
  }
  // UTILS - OTHERS
  const inputs = [
    { key: "SINGLE-LINE", label: "Single-line" },
    { key: "MULTIPLE-LINE", label: "Multiple-line" },
    { key: "INTEGER", label: "Number" },
    { key: "CHECKBOX", label: "Checkbox" },
  ];

  console.log("Input Data", inputData);
  // console.log("New Option", newOption);
  return (
    <Card className="w-full h-full p-2 space-y-4">
      <div className="flex w-full justify-around space-x-4">
        <div className="w-2/5">
          <Input
            label="Title"
            size="sm"
            value={inputData?.title}
            onChange={(e) => {
              setInputData({ ...inputData, title: e.target.value });
            }}></Input>
        </div>
        <div className="w-2/5">
          <Select
            className="w-full"
            label="Input Type"
            size="sm"
            // selectedKeys={inputData.type}
            onChange={(e) =>
              setInputData({ ...inputData, type: e.target.value })
            }>
            {inputs.map((input) => (
              <SelectItem key={input.key}>{input.label}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex items-center w-1/5 ">
          <Checkbox
            defaultSelected
            onChange={(e) =>
              //   console.log("Checkbox Event",e)
              setInputData({ ...inputData, displayed: e.target.checked })
            }>
            Visible
          </Checkbox>
        </div>
      </div>
      <div>
        <Input
          label="Description"
          size="sm"
          value={inputData?.description}
          onChange={(e) => {
            setInputData({ ...inputData, description: e.target.value });
          }}></Input>
      </div>
      {/* Div for answers depending of input  */}
      <div>
        {inputData?.type === "SINGLE-LINE" ? (
          <Input
            label="Single line answer"
            variant="underlined"
            disabled="true"
            size="sm"></Input>
        ) : inputData?.type === "MULTIPLE-LINE" ? (
          <Textarea
            className="max-w-xs"
            label="Multiple line answer"
            variant="underlined"
            disabled="true"
          />
        ) : inputData?.type === "INTEGER" ? (
          <Input
            label="Integer"
            variant="underlined"
            disabled="true"
            size="sm"></Input>
        ) : (
          inputData?.type === "CHECKBOX" && (
            <div className="h-auto">
              {/* <p>Options</p> */}
              {/* Render Options */}
              <div>
                {
                  // inputData?.options?.length > 0
                  true && <p className="text-sm ml-2">Options</p>
                }

                {inputData?.options?.map((item, index) => {
                  return (
                    <div className="flex items-center ml-4 " key={index}>
                      <div>
                        <Checkbox isDisabled size="sm"></Checkbox>
                      </div>
                      <p className="text-xs">{item}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex space-x-2">
                <Input
                  //   variant="faded"
                  variant="underlined"
                  label="Add Option"
                  size="sm"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}>
                  sdfsdf
                </Input>
                <Button className="text-3xl" onClick={handleAddOption}>
                  +
                </Button>
              </div>
            </div>
          )
        )}
      </div>
      {/* Add Button */}
      <div className="my-5">
        <Button color="primary" className="w-full" onClick={handleAddInput}>
          ADD +
        </Button>
      </div>
    </Card>
  );
}
