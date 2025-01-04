import { Button, ButtonGroup, Card, CardHeader, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, user } from "@nextui-org/react";
import { CardBody, CardFooter, Image, Chip } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../Utils/utils";
import { div, p } from "framer-motion/client";
const APP_URL = import.meta.env.VITE_APP_URL;

export function TemplatesManagment() {
  const { authData } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);
  const [userFilledForms, setUserFilledForms] = useState();
  const [btnSelection, setBtnSelection] = useState(true);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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

  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteTemplate = async (templateId) => {
    const body = {
      formId: templateId,
      userId: authData?.userId,
    };

    setLoadingDelete(true);
    try {
      const response = await fetch(
        `${APP_URL}/form/deleteForm`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        console.log("Template Deleted");
        getUserTemplates(authData?.userId);
      }
      setOpenModal(false);
    } catch (error) {
      console.error("Error deleting template", error);
    } finally {
      setLoadingDelete(false);
    }
  }


  return (
    <div className="w-full  flex flex-col space-y-4 items-center justify-center my-4">
      <ButtonGroup className="w-full sm:px-0 sm:w-3/5 md:w-2/5 ">
        <Button
          className="w-1/2"
          color={btnSelection ? "primary" : "default"}
          onClick={() => {
            setBtnSelection(true);
          }}>
          {authData?.userSettings?.language ? "Templates" : "Plantillas"}
        </Button>
        <Button
          className="w-1/2"
          color={!btnSelection ? "primary" : "default"}
          onClick={() => {
            setBtnSelection(false);
          }}>
          {authData?.userSettings?.language ? "Filled Forms" : "Formularios Llenados"}
        </Button>
      </ButtonGroup>
      <Card className="w-full sm:w-4/5 lg:w-3/5 h-96">
        {btnSelection ? (
          <>
            <CardHeader>
              <div className="flex items-center justify-center w-full space-x-4">
                <p>
                  {authData?.userSettings?.language ? "Tempaltes Created" : "Plantillas Creadas"}
                </p>
                <div>
                  <Button
                    onClick={() => {
                      navigate("/create-form");
                    }}>
                    {authData?.userSettings?.language ? "Create new" : "Crear nuevo"} +{" "}
                  </Button>
                </div>
              </div>
            </CardHeader>
            {templates?.length > 0 ? (
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
                          {index + 1}
                        </Chip>
                      </div>
                    </CardBody>
                    <CardFooter
                      className="flex items-center justify-center w-full space-x-4"
                    >
                      <Button 
                        size="sm" 
                        variant="faded"
                        onClick={() => {
                          console.log("Selected Template", item);
                          
                          setSelectedTemplate(item);
                          setOpenModal(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          height="100"
                          width="40%"
                        >
                          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                        </svg>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="gap-2 mx-2 flex items-center justify-center px-4 py-3 overflow-y-auto custom-scrollbar h-full ">
                {authData?.userSettings?.language ? "You haven't created a form yet." : "Aún no has creado una plantilla."}
              </div>
            )}
          </>
        ) : (
          <>
            <CardHeader>
              <div className="flex items-center justify-center w-full space-x-4">
                <p>{authData?.userSettings?.language ? "Forms answered by you" : "Formularios respondidos por ti"}</p>
                <div>
                  <Button>{authData?.userSettings?.language ? "Answer a form" : "Responder formulario"}</Button>
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
                    handleViewTemplateAnswer(item?.form?.id, authData?.userId);
                  }}>
                  <CardBody className="overflow-visible p-0 space-y-2">
                    <div className="h-2/5 flex text-center items-center justify-center">
                      <b className="text-center text-sm">
                        {item?.form?.title} , By:{" "}
                        {item?.form?.creator?.firstName}{" "}
                        {item?.form?.creator?.lastName}
                      </b>
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


      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        className="w-1/2"
        title="Template Details"

      >
        <ModalContent
          
        >
          <ModalHeader>
            <div className="">
              <p>
                {authData?.userSettings?.language 
                  ? "Are you sure you want to delete this template?" 
                  : "¿Estás seguro de que deseas eliminar esta plantilla?"
                }
              </p>
            </div>
          </ModalHeader>
          <ModalBody>
            {selectedTemplate?.title}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="light" onPress={() => setOpenModal(false)}>
              {authData?.userSettings?.language ? "Cancel" : "Cancelar"}
            </Button>
            <Button 
              color="danger" 
              onPress={() => handleDeleteTemplate(selectedTemplate?.id)} 
              isLoading={loadingDelete}
            >
              {authData?.userSettings?.language ? "Delete" : "Eliminar"}
            </Button>
          </ModalFooter>
        </ModalContent>

      </Modal>
    </div>
  );
}
