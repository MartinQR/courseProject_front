import {
  Button,
  ButtonGroup,
  Chip,
  Card,
  CardBody,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  user,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import JiraModal from "./JiraModal";

const ticketsExample = [
  {
    id: 10234,
    summary: "Error al iniciar sesión",
    priority: "High",
    reportedBy: "user1@example.com",
    status: "Open",
    link: "https://tudominio.atlassian.net/browse/TICKET-10234",
  },
  {
    id: 20567,
    summary: "Problema con la carga de la página principal",
    priority: "Medium",
    reportedBy: "user2@example.com",
    status: "In Progress",
    link: "https://tudominio.atlassian.net/browse/TICKET-20567",
  },
  {
    id: 30845,
    summary: "Solicitud de nueva funcionalidad para exportar datos",
    priority: "Low",
    reportedBy: "user3@example.com",
    status: "Closed",
    link: "https://tudominio.atlassian.net/browse/TICKET-30845",
  },
  {
    id: 41278,
    summary: "Actualización de seguridad pendiente",
    priority: "High",
    reportedBy: "user4@example.com",
    status: "Open",
    link: "https://tudominio.atlassian.net/browse/TICKET-41278",
  },
];

export default function ViewTickets() {
  const { authData } = useContext(AuthContext);
  const [openJira, setOpenJira] = useState(false);
  return (
    <div className="w-full  flex flex-col space-y-4 items-center justify-center my-4">
      <Card className="w-full sm:w-4/5 lg:w-3/5 h-auto space-y-4 py-4 pb-8">
        <CardHeader>
          <div className="flex items-center justify-center w-full space-x-4">
            <p>
              {authData?.userSettings?.language
                ? "Open Tickets"
                : "Tickets Abiertos"}
            </p>
            <div>
              <Button
                onClick={() => {
                  setOpenJira(true);
                }}>
                {authData?.userSettings?.language
                  ? "Create New"
                  : "Crear Nuevo"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="gap-2   mx-2 px-4 py-3 overflow-y-auto custom-scrollbar h-full space-y-2 ">
          {" "}
          {ticketsExample.map((item, index) => (
            <Card key={index} shadow="sm" className="h-auto">
              <CardBody className="flex flex-col items-center space-y-3">
                <div className="h-2/5 flex text-center items-center justify-center space-x-4">
                  <p className="text-center text-md">{item?.id}</p>
                  <Chip color="warning">{item?.priority}</Chip>
                </div>
                <div className="h-auto">
                  <p>status: {item?.status}</p>
                  <a href={item?.link}>Ir al ticket</a>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </Card>
      <JiraModal open={openJira} setOpen={setOpenJira} />
    </div>
  );
}
