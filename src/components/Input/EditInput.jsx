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

  //   Handle Action to add Answer to an input

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
    console.log("Value",value)
    const newAnswers = formEditAnswers?.map((item) => {
      if (item?.id === inputData?.id) {
        console.log("COINDICEEEEEE")
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

  return (
    <div className="my-2">
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
          </div>
        </Card>
      ) : (
        <div>Invalid Input</div>
      )}
    </div>
  );
}
