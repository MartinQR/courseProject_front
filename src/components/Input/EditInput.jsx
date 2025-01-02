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
import { div, input } from "framer-motion/m";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function EditInput({
  inputData,
  filledForm,
  editInput,
  editAnswer,
  viewAnswers,
  templateModifications,
  setTemplateModifications = () => {},
  formEditAnswers,
  setFormEditAnswers = () => {},
  index,
}) {
  const [selected, setSelected] = useState([]);
  const [checkboxOption, setCheckboxOption] = useState("");

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: inputData?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const DeleteButton = (
    <Button size="sm" variant="faded" onClick={handleDeleteInput}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        height="100"
        width="40%">
        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
      </svg>
    </Button>
  );
  //   Handle Action to add Answer to an input

  function handleDeleteInput() {
    const newInputs = templateModifications?.filter(
      (item) => item?.id !== inputData?.id
    );
    setTemplateModifications(newInputs);
  }

  function handleEditInput(newValue, field) {
    const newInputs = templateModifications?.map((item) => {
      if (item?.id == inputData?.id) {
        return { ...item, [field]: newValue };
      } else {
        return item;
      }
    });

    setTemplateModifications(newInputs);
  }

  function editCheckboxOptions(newValue, index, field) {
    const newInputs = templateModifications?.map((item) => {
      if (item?.id == inputData?.id) {
        const updatedCheckboxOptions = [...item?.options];
        updatedCheckboxOptions[index] = newValue;

        return { ...item, [field]: updatedCheckboxOptions };
      } else {
        return item;
      }
    });

    setTemplateModifications(newInputs);
  }

  function deleteCheckboxOptions(index) {
    const newInputs = templateModifications?.map((item) => {
      if (item?.id == inputData?.id) {
        const updatedCheckboxOptions = [...item?.options];

        updatedCheckboxOptions.splice(index, 1);

        return { ...item, options: updatedCheckboxOptions };
      } else {
        return item;
      }
    });

    setTemplateModifications(newInputs);
  }

  function addCheckboxOptions() {
    const newInputs = templateModifications?.map((item) => {
      if (item?.id == inputData?.id) {
        const updatedCheckboxOptions = [...item?.options];

        updatedCheckboxOptions.push(checkboxOption);

        return { ...item, options: updatedCheckboxOptions };
      } else {
        return item;
      }
    });

    setTemplateModifications(newInputs);
    setCheckboxOption("");
  }
  function handleEditAnswer(value) {
    console.log("Value", value);
    const newAnswers = formEditAnswers?.map((item) => {
      if (item?.id === inputData?.id) {
        console.log("COINDICEEEEEE");
        return {
          ...item,
          answer: inputData?.type === "CHECKBOX" ? value : [value],
        };
      } else {
        return item;
      }
    });

    setFormEditAnswers(newAnswers);
  }

  //   console.log("Input Data", inputData);
  //   console.log("filledForm", filledForm);
  // console.log("Index",index)

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="my-2">
      {inputData?.type === "SINGLE-LINE" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            {editInput ? (
              <div className="space-y-2">
                {/* <p>Qustion #{index} Type:{inputData?.type}</p> */}
                <Input
                  type="text"
                  size="sm"
                  label="Title"
                  value={inputData?.title}
                  onChange={(e) => {
                    handleEditInput(e.target.value, "title");
                  }}></Input>
                <Input
                  type="text"
                  size="sm"
                  label="Description"
                  value={inputData?.description}
                  onChange={(e) => {
                    handleEditInput(e.target.value, "description");
                  }}></Input>{" "}
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <p className="font-bold">{inputData?.title}</p>
                </div>

                <p className="text-sm">{inputData?.description}</p>
              </>
            )}
          </div>

          <div>
            <Input
              label="Answer"
              variant="underlined"
              size="sm"
              value={viewAnswers ? inputData?.answer[0] : ""}
              disabled={!editAnswer}
              onChange={(e) => {
                handleEditAnswer(e.target.value);
              }}></Input>
          </div>
          <div className="flex items-center justify-center mt-4">
            {editInput && DeleteButton}
          </div>
        </Card>
      ) : inputData?.type === "MULTIPLE-LINE" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            {editInput ? (
              <div className="space-y-2">
                {/* <p>Qustion #{index} Type:{inputData?.type}</p> */}
                <Input
                  type="text"
                  size="sm"
                  label="Title"
                  value={inputData?.title}
                  onChange={(e) => {
                    handleEditInput(e.target.value, "title");
                  }}></Input>
                <Input
                  type="text"
                  size="sm"
                  label="Description"
                  value={inputData?.description}
                  onChange={(e) => {
                    handleEditInput(e.target.value, "description");
                  }}></Input>{" "}
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <p className="font-bold">{inputData?.title}</p>
                </div>
                <p className="text-sm">{inputData?.description}</p>
              </>
            )}
          </div>

          <div>
            {" "}
            <Textarea
              label="Answer"
              variant="underlined"
              value={viewAnswers ? inputData?.answer[0] : ""}
              size="sm"
              disabled={!editAnswer}
              onChange={(e) => {
                handleEditAnswer(e.target.value);
              }}></Textarea>
          </div>
          <div className="flex items-center justify-center mt-4">
            {editInput && DeleteButton}
          </div>
        </Card>
      ) : inputData?.type === "INTEGER" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            {editInput ? (
              <div className="space-y-2">
                {/* <p>Qustion #{index} Type:{inputData?.type}</p> */}
                <Input
                  type="text"
                  size="sm"
                  label="Title"
                  value={inputData?.title}
                  onChange={(e) => {
                    handleEditInput(e.target.value, "title");
                  }}></Input>
                <Input
                  type="text"
                  size="sm"
                  label="Description"
                  value={inputData?.description}
                  onChange={(e) => {
                    handleEditInput(e.target.value, "description");
                  }}></Input>{" "}
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <p className="font-bold">{inputData?.title}</p>
                </div>
                <p className="text-sm">{inputData?.description}</p>
              </>
            )}
          </div>

          <div>
            <Input
              label="Answer"
              variant="underlined"
              size="sm"
              value={viewAnswers ? inputData?.answer[0] : ""}
              disabled={!editAnswer}
              onChange={(e) => {
                handleEditAnswer(e.target.value);
              }}></Input>
          </div>
          <div className="flex items-center justify-center mt-4">
            {editInput && DeleteButton}
          </div>
        </Card>
      ) : inputData?.type === "CHECKBOX" ? (
        <Card className="w-full h-auto p-3 ">
          <div className="pl-2">
            {editInput ? (
              <div className="space-y-2">
                {/* <p>Qustion #{index} Type:{inputData?.type}</p> */}
                <Input
                  type="text"
                  size="sm"
                  label="Title"
                  value={inputData?.title}
                  onChange={(e) => {
                    handleEditInput(e.target.value, "title");
                  }}></Input>
                <Input
                  type="text"
                  size="sm"
                  label="Description"
                  value={inputData?.description}
                  onChange={(e) => {
                    handleEditInput(e.target.value, "description");
                  }}></Input>{" "}
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <p className="font-bold">{inputData?.title}</p>
                </div>
                <p className="text-sm">{inputData?.description}</p>
              </>
            )}
          </div>

          <div className="ml-4 my-2 ">
            {editInput ? (
              <div className="space-y-2">
                {inputData?.options?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row space-x-2 items-center">
                      <Input
                        onChange={(e) => {
                          editCheckboxOptions(e.target.value, index, "options");
                        }}
                        value={item}></Input>
                      <Button
                        size="sm"
                        onClick={() => {
                          deleteCheckboxOptions(index);
                        }}>
                        Delete
                      </Button>
                    </div>
                  );
                })}
                <div
                  key={index}
                  className="flex flex-row space-x-2 items-center">
                  <Input
                    label="Add a new option"
                    size="sm"
                    onChange={(e) => {
                      setCheckboxOption(e.target.value);
                    }}
                    value={checkboxOption}></Input>
                  <Button
                    size="sm"
                    color="primary"
                    onClick={addCheckboxOptions}>
                    Add +
                  </Button>
                </div>
              </div>
            ) : viewAnswers ? (
              <CheckboxGroup
                label="Select one or more options"
                value={inputData?.answer}
                disabled={true}
                onValueChange={(newValues) => {
                  setSelected(newValues);
                  handleEditAnswer(newValues);
                }}
                //   onChange={() => {
                //     handleEditAnswer(selected);
                //   }}
              >
                {inputData?.values?.map((item, index) => {
                  return (
                    <div key={index} className="">
                      <Checkbox isDisabled={!editAnswer} value={item} size="sm">
                        {item}
                      </Checkbox>
                    </div>
                  );
                })}
              </CheckboxGroup>
            ) : (
              <CheckboxGroup
                label="Select one or more options"
                value={selected}
                disabled={true}
                onValueChange={(newValues) => {
                  setSelected(newValues);
                  handleEditAnswer(newValues);
                }}
                //   onChange={() => {
                //     handleEditAnswer(selected);
                //   }}
              >
                {inputData?.options?.map((item, index) => {
                  return (
                    <div key={index} className="">
                      <Checkbox isDisabled={!editAnswer} value={item} size="sm">
                        {item}
                      </Checkbox>
                    </div>
                  );
                })}
              </CheckboxGroup>
            )}

            <div className="flex items-center justify-center mt-4">
              {editInput && DeleteButton}
            </div>
          </div>
        </Card>
      ) : (
        <div>Invalid Input</div>
      )}
    </div>
  );
}
