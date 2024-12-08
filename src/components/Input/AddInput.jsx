import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  SelectItem,
  checkbox,
  Checkbox,
} from "@nextui-org/react";
import "../../index.css";

// Component that generates a question/input and returns it as an object
export default function AddInput() {
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

  function handleAddOption() {
    setInputData({ ...inputData, options: [...inputData.options, newOption] });
    setNewOption("");
  }
  // UTILS - OTHERS
  const inputs = [
    { key: "TEXT", label: "Text" },
    { key: "OPTIONS", label: "Options" },
    { key: "MULTIPLEOPTIONS", label: "Multiple Options" },
  ];

  console.log("Input Data", inputData);
  console.log("New Option",newOption)
  return (
    <Card className="w-full h-full p-2 space-y-4 ">
      <div className="flex w-full justify-around space-x-4">
        <div className="w-2/5">
          <Input
            label="Title"
            size="sm"
            onChange={(e) => {
              setInputData({ ...inputData, title: e.target.value });
            }}></Input>
        </div>
        <div className="w-2/5">
          <Select
            className="w-full"
            label="Input Type"
            size="sm"
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
          onChange={(e) => {
            setInputData({ ...inputData, description: e.target.value });
          }}></Input>
      </div>
      {/* Div for answers depending of input  */}
      <div>
        {inputData?.type === "TEXT" ? (
          <Input
            label="Text Answer"
            variant="underlined"
            disabled="true"
            size="sm"></Input>
        ) : (
          <div className="h-auto">
            {/* <p>Options</p> */}
            {/* Render Options */}
            <div>

                {inputData?.options?.length > 0 && <p>Options</p>}

                
              {inputData?.options?.map((item, index) => {
                return (
                  <div className="flex ml-2 my-1" key={index}>
                    <div>
                      <Checkbox isDisabled></Checkbox>
                    </div>
                    <div>{item}</div>
                  </div>
                );
              })}
            </div>
            <div className="flex space-x-2">
              <Input variant="faded"label="Add Option" size="sm" onChange={(e) => setNewOption(e.target.value)}>
                sdfsdf
              </Input>
              <Button className="text-3xl" onClick={() => handleAddOption()}>
                +
              </Button>
            </div>
          </div>
        )}
      </div>
      {/* Add Button */}
      <div className="my-5">
        <Button color="primary" className="w-full">
          ADD +
        </Button>
      </div>
    </Card>
  );
}
