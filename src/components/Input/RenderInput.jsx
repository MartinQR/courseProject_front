import { useState } from "react";
import {
  Card,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
  Textarea,
} from "@nextui-org/react";

export default function RenderInput({ inputData, index, setFormData, formData }) {

  function handleDeleteInput() {
    const newInputs = formData?.inputsData?.filter((_, i) => i !== index);
    setFormData({ ...formData, inputsData: newInputs });
  }
  

  return (
    <div className="my-4">
      {inputData?.type === "SINGLE-LINE" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            <div className="flex justify-between">
              <p className="font-bold">{inputData?.title}</p>
              <Button 
                size="sm"
                variant="faded"
                onClick={handleDeleteInput}
              >
                x
              </Button>
            </div>

            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div>
            <Input label="Answer" variant="underlined" size="sm"></Input>
          </div>
        </Card>
      ) : inputData?.type === "MULTIPLE-LINE" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            <div className="flex justify-between">
              <p className="font-bold">{inputData?.title}</p>
              <Button 
                size="sm"
                variant="faded"
                onClick={handleDeleteInput}
              >
                x
              </Button>
            </div>
            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div>
            {" "}
            <Textarea label="Answer" variant="underlined" size="sm"></Textarea>
          </div>
        </Card>
      ) : inputData?.type === "INTEGER" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            <div className="flex justify-between">
              <p className="font-bold">{inputData?.title}</p>
              <Button 
                size="sm"
                variant="faded"
                onClick={handleDeleteInput}
              >
                x
              </Button>
            </div>
            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div>
            <Input label="Answer" variant="underlined" size="sm"></Input>
          </div>
        </Card>
      ) : inputData?.type === "CHECKBOX" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            <div className="flex justify-between">
              <p className="font-bold">{inputData?.title}</p>
              <Button 
                size="sm"
                variant="faded"
                onClick={handleDeleteInput}
              >
                x
              </Button>
            </div>
            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div className="ml-4 my-2 ">
            <CheckboxGroup>
              {inputData?.options?.map((item, index) => {
                return <div key={index} className="">
                    <Checkbox size="sm" value={item}>{item}</Checkbox>
                </div>;
              })}
            </CheckboxGroup>
          </div>
        </Card>
      ) : (
        <div>Invalid Input</div>
      )}
    </div>
  );
}
