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

export default function RenderInput({
  inputData,
  index,
  setFormData,
  formData,
}) {
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
              <Button size="sm" variant="faded" onClick={handleDeleteInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height="100"
                  width="40%">
                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                </svg>
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
              <Button size="sm" variant="faded" onClick={handleDeleteInput}>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    height="100"
                    width="40%">
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                  </svg>
                </div>
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
              <Button size="sm" variant="faded" onClick={handleDeleteInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height="100"
                  width="40%">
                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                </svg>
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
              <Button size="sm" variant="faded" onClick={handleDeleteInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height="100"
                  width="40%">
                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                </svg>
              </Button>
            </div>
            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div className="ml-4 my-2 ">
            <CheckboxGroup>
              {inputData?.options?.map((item, index) => {
                return (
                  <div key={index} className="">
                    <Checkbox size="sm" value={item}>
                      {item}
                    </Checkbox>
                  </div>
                );
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
