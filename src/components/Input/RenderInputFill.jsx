import { useEffect, useState } from "react";
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
import { input } from "framer-motion/m";

export default function RenderInputFill({
  inputData,
  answersForm,
  setAnswersForm,
  filledForm,
  setFilledForm,
}) {
  const [selected, setSelected] = useState([]);

  //   Handle Action to add Answer to an input

  function handleAnswer(value) {
    const newAnswers = filledForm?.answers?.map((item) => {
      if (item?.inputId === inputData?.id) {
        return {
          ...item,
          value: inputData?.type === "CHECKBOX" ? value : [value],
        };
      } else {
        return item;
      }
    });

    setFilledForm({ ...filledForm, answers: newAnswers });
  }

  return (
    <div className="my-2">
      {inputData?.type === "SINGLE-LINE" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            <div className="flex justify-between">
              <p className="font-bold">{inputData?.title}</p>
            </div>

            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div>
            <Input
              label="Answer"
              variant="underlined"
              size="sm"
              onChange={(e) => {
                handleAnswer(e.target.value);
              }}></Input>
          </div>
        </Card>
      ) : inputData?.type === "MULTIPLE-LINE" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            <div className="flex justify-between">
              <p className="font-bold">{inputData?.title}</p>
            </div>
            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div>
            {" "}
            <Textarea
              label="Answer"
              variant="underlined"
              size="sm"
              onChange={(e) => {
                handleAnswer(e.target.value);
              }}></Textarea>
          </div>
        </Card>
      ) : inputData?.type === "INTEGER" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            <div className="flex justify-between">
              <p className="font-bold">{inputData?.title}</p>
            </div>
            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div>
            <Input
              label="Answer"
              variant="underlined"
              size="sm"
              onChange={(e) => {
                handleAnswer(e.target.value);
              }}></Input>
          </div>
        </Card>
      ) : inputData?.type === "CHECKBOX" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            <div className="flex justify-between">
              <p className="font-bold">{inputData?.title}</p>
            </div>
            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div className="ml-4 my-2 ">
            <CheckboxGroup
              label="Select one or more options"
              value={selected}
              onValueChange={(newValues) => {
                setSelected(newValues);
                handleAnswer(newValues);
              }}
              //   onChange={() => {
              //     handleAnswer(selected);
              //   }}
            >
              {inputData?.values?.map((item, index) => {
                return (
                  <div key={index} className="">
                    <Checkbox value={item} size="sm">
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
