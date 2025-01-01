import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../contexts/AuthContext";

export default function RenderInputFill({
  inputData,
  answersForm,
  setAnswersForm,
  filledForm,
  setFilledForm,
}) {
  const [selected, setSelected] = useState([]);
  const { authData } = useContext(AuthContext);

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
        <Card className="bg- w-full h-auto p-3 ">
          <div className="pl-2">
            <div className="flex justify-between">
              <p className="font-bold">{inputData?.title}</p>
            </div>

            <p className="text-sm">{inputData?.description}</p>
          </div>

          <div>
            <Input
              label={authData?.userSettings?.language ? "Answer" : "Respuesta"}
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
              label={authData?.userSettings?.language ? "Answer" : "Respuesta"}
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
              label={authData?.userSettings?.language ? "Answer" : "Respuesta"}
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
              label={authData?.userSettings?.language ? "Select one or more options" : "Seleccione una o más opciones"}
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
