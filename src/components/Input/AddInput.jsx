import { useState, useEffect, useContext } from "react";
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
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

// Component that generates a question/input and returns it as an object
export default function AddInput({ setFormData, formData }) {
  const [inputData, setInputData] = useState({});
  const [newOption, setNewOption] = useState("");
  const { authData, setAuthData } = useContext(AuthContext);

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
      type: "",
      description: "",
      displayed: true,
      options: [],
    });
  }

  function handleAddOption() {
    if (!newOption?.trim()) {
      toast.error("Option is required");
      return;
    }

    setInputData({
      ...inputData,
      options: [...inputData.options, newOption?.trim()],
    });
    setNewOption("");
  }

  function handleAddInput() {
    if (!inputData?.title?.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!inputData?.type) {
      toast.error("Type is required");
      return;
    }

    if (!inputData?.description?.trim()) {
      toast.error("Description is required");
      return;
    }

    if (inputData?.type === "CHECKBOX" && !inputData?.options?.length) {
      toast.error("At least one option is required");
      return;
    }

    setFormData({
      ...formData,
      inputsData: [...formData.inputsData, inputData],
    });
    clearInput();
  }

  function hanldeChangeSelect(e) {
    const value = e.target.value;
    const totalInputsWithSameType = formData?.inputsData?.filter(
      (input) => input?.type === value
    ).length;

    if (totalInputsWithSameType >= 4) {
      toast.error("You can't add more than four input with the same type");
      return;
    }

    setInputData({ ...inputData, type: e.target.value });
  }

  // UTILS - OTHERS

  const inputs = [
    {
      key: "SINGLE-LINE",
      label: authData?.userSettings?.language ? "Single-line" : "Linea Unica",
    },
    {
      key: "MULTIPLE-LINE",
      label: authData?.userSettings?.language ? "Multiple-line" : "Multi linea",
    },
    {
      key: "INTEGER",
      label: authData?.userSettings?.language ? "Number" : "Numero",
    },
    { key: "CHECKBOX", label: "Checkbox" },
  ];

  return (
    <Card className="w-full h-full p-2 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
        <div className="flex w-full justify-around space-x-4">
          <div className="w-2/5">
            <Input
              isRequired
              label={authData?.userSettings?.language ? "Title" : "Titulo"}
              size="sm"
              value={inputData?.title}
              onChange={(e) => {
                setInputData({ ...inputData, title: e.target.value });
              }}
            />
          </div>
          <div className="w-2/5">
            <Select
              className="w-full"
              label={
                authData?.userSettings?.language
                  ? "Input Type"
                  : "Tipo de Input"
              }
              size="sm"
              selectedKeys={[inputData.type]}
              onChange={hanldeChangeSelect}>
              {inputs?.map((input, i) => (
                <SelectItem key={input?.key || i}>{input?.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <div className="flex items-center w-1/5 ml-4 sm:ml-0 ">
            <Checkbox
              defaultSelected
              onChange={(e) =>
                setInputData({ ...inputData, displayed: e.target.checked })
              }>
              Visible
            </Checkbox>
          </div>
        </div>
      </div>
      <div>
        <Input
          isRequired
          label={
            authData?.userSettings?.language ? "Description" : "Descripción"
          }
          size="sm"
          value={inputData?.description}
          onChange={(e) => {
            setInputData({ ...inputData, description: e.target.value });
          }}
        />
      </div>
      {/* Div for answers depending of input  */}
      <div>
        {inputData?.type === "SINGLE-LINE" ? (
          <Input
            label={
              authData?.userSettings?.language
                ? "Single line answer"
                : "Respuesta de una linea"
            }
            variant="underlined"
            disabled
            size="sm"></Input>
        ) : inputData?.type === "MULTIPLE-LINE" ? (
          <Textarea
            className="max-w-xs"
            label={
              authData?.userSettings?.language
                ? "Multiple line answer"
                : "Respuesta Multilinea"
            }
            variant="underlined"
            disabled
          />
        ) : inputData?.type === "INTEGER" ? (
          <Input
            label={authData?.userSettings?.language ? "Integer" : "Entero"}
            variant="underlined"
            disabled
            size="sm"></Input>
        ) : (
          inputData?.type === "CHECKBOX" && (
            <div className="h-auto">
              {/* <p>Options</p> */}
              {/* Render Options */}
              <div>
                {
                  // inputData?.options?.length > 0
                  true && (
                    <p className="text-sm ml-2">
                      {authData?.userSettings?.language
                        ? "Options"
                        : "Opciones"}
                    </p>
                  )
                }

                {inputData?.options?.map((item, index) => {
                  return (
                    <div className="flex items-center ml-4 " key={index}>
                      <div>
                        <Checkbox isDisabled size="sm" />
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
                  label={
                    authData?.userSettings?.language
                      ? "Add Option"
                      : "Agregar Opción"
                  }
                  size="sm"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}></Input>
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
          {authData?.userSettings?.language ? "ADD +" : "AGREGAR +"}
        </Button>
      </div>
    </Card>
  );
}
