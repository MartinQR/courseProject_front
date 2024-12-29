import { Button, ButtonGroup, Card, CardHeader } from "@nextui-org/react";
import { CardBody, CardFooter, Image, Chip } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../Utils/utils";
import { div } from "framer-motion/client";
const APP_URL = import.meta.env.VITE_APP_URL;

export function TemplatesManagment() {
  const { authData } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);
  const [userFilledForms, setUserFilledForms] = useState();
  const [btnSelection, setBtnSelection] = useState(true);
  const navigate = useNavigate();

  // --------- FETCH REQUEST --------
  const getUserTemplates = async (userId) => {
    try {
      const response = await fetch(
        `${APP_URL}/form/getFormsByUserId?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      throw new Error(error);
    }
  };

  const getFilledFormsByYou = async (userId) => {
    try {
      const response = await fetch(
        `${APP_URL}/formResponse/getAllFilledOutFormsByUserId?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Error gettin Form");
      }
      const data = await response.json();
      setUserFilledForms(data);
    } catch (error) {
      console.error("Error gettinf Form:", error);
    }
  };

  // Handle Actions

  function handleViewTemplate(templateId) {
    navigate(`/view-template?idTemplate=${templateId}`);
  }

  function handleViewTemplateAnswer(templateId, userId) {
    console.log("TemplateId", templateId);
    navigate(`/view-templateAnswer?templateId=${templateId}&userId=${userId}`);
  }

  useEffect(() => {
    if (authData?.userId) {
      getUserTemplates(authData?.userId);
      getFilledFormsByYou(authData?.userId);
    }
  }, [authData]);

  console.log("Templates", templates);
  console.log("User Filled Forms", userFilledForms);
  console.log("Auth Data",authData)
  return (
    <div className="w-full  flex flex-col space-y-4 items-center justify-center my-4">
      <ButtonGroup className="w-full sm:px-0 sm:w-3/5 md:w-2/5 ">
        <Button
          className="w-1/2"
          color={btnSelection ? "primary" : "default"}
          onClick={() => {
            setBtnSelection(true);
          }}>
          Templates
        </Button>
        <Button
          className="w-1/2"
          color={!btnSelection ? "primary" : "default"}
          onClick={() => {
            setBtnSelection(false);
          }}>
          Filled Forms
        </Button>
      </ButtonGroup>
      <Card className="w-full sm:w-4/5 lg:w-3/5 h-96">
        {btnSelection ? (
          <>
            <CardHeader>
              <div className="flex items-center justify-center w-full space-x-4">
                <p>Tempaltes Created</p>
                <div>
                  <Button
                    onClick={() => {
                      navigate("/create-form");
                    }}>
                    Create New +{" "}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4  mx-2 px-4 py-3 overflow-y-auto custom-scrollbar h-full ">
              {templates?.map((item, index) => (
                <Card
                  key={index}
                  isPressable
                  shadow="sm"
                  className="p-2 h-40 "
                  onPress={() => {
                    handleViewTemplate(item?.id);
                  }}>
                  <CardBody className="overflow-visible p-0 space-y-2">
                    <div className="h-2/5 flex text-center items-center justify-center">
                      <b className="text-center text-sm">{item.title}</b>
                    </div>

                    <div className="h-2/5 text-center px-1 overflow-y-auto ">
                      <p className="text-default-500 text-xs">
                        {item.description}
                      </p>
                    </div>
                    <div className="h-1/5 flex items-center justify-center  ">
                      <Chip color="warning" variant="dot">
                        {index}
                      </Chip>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            <CardHeader>
              <div className="flex items-center justify-center w-full space-x-4">
                <p>Forms answered by you</p>
                <div>
                  <Button>Answer a form</Button>
                </div>
              </div>
            </CardHeader>

            <div className="gap-2   mx-2 px-4 py-3 overflow-y-auto custom-scrollbar h-full space-y-2 ">
              {userFilledForms?.map((item, index) => (
                <Card
                  key={index}
                  isPressable
                  shadow="sm"
                  className="p-2 h-32 w-full "
                  onPress={() => {
                    handleViewTemplateAnswer(item?.form?.id,authData?.userId);
                  }}>
                  <CardBody className="overflow-visible p-0 space-y-2">
                    <div className="h-2/5 flex text-center items-center justify-center">
                      <b className="text-center text-sm">{item?.form?.title}</b>
                    </div>

                    <div className="h-2/5 text-center px-1 overflow-y-auto ">
                      <p className="text-default-500 text-xs">
                        {item?.form?.description}
                      </p>
                    </div>
                    <div className="h-2/5 text-center px-1 overflow-y-auto ">
                      <p className="text-default-500 text-xs">
                        Form filled on:{formatDateTime(item?.createdAt)}
                      </p>
                    </div>
                    <div className="h-1/5 flex items-center justify-center  ">
                      <Chip color="warning" variant="dot">
                        {index}
                      </Chip>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
