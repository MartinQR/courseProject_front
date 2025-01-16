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
const APP_URL = import.meta.env.VITE_APP_URL;
import JiraModal from "./JiraModal";
import { formatDateTime } from "../../Utils/utils";

export default function ViewTickets() {
  const { authData } = useContext(AuthContext);
  const [openJira, setOpenJira] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);


  useEffect(() => {
    if (authData?.email) {
      getTicketsFromUser(authData?.email);
    }
  }, [authData]);

  // Handle Actions
  function getChipColor(status) {
    switch (status) {
      case "Tareas por hacer":
        return "default";
      case "En curso":
        return "primary";
      case "Completado":
        return "success";
      default:
        return "default";
    }
  }

  async function getTicketsFromUser(userEmail) {
    setLoading(true);
    try {
      const response = await fetch(
        `${APP_URL}/jira/getIssuesCreatedByUser?email=${userEmail}`
      );
      if (!response.ok) {
        throw new Error("Error gettin Tickets");
      }
      const data = await response.json();
      setTicketsData(data?.issues);
    } catch (error) {
      console.error("Error gettinf Form:", error);
    } finally {
      setLoading(false);
    }
  }

  const ticketStatus = {
    "En curso": "In progress",
    "Tareas por hacer": "Pending",
    Completado: "Completed",
  };

  console.log("Tickets Data", ticketsData);
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
        <div className="gap-2   mx-2 px-4 py-3 overflow-y-auto custom-scrollbar h-full space-y-2 max-h-96 overflow-y-auto ">
          {" "}
          {ticketsData.map((item, index) => (
            <Card key={index} shadow="sm" className="h-auto">
              <CardBody className="flex flex-col items-center space-y-3 ">
                <div className="h-2/5 flex text-center items-center justify-center space-x-4">
                  <p className="text-center text-md">Id #{item?.id}</p>
                  <Chip color={getChipColor(item?.status)}>
                    {ticketStatus[item?.status]}
                  </Chip>
                  {/* <Chip color="warning">{item?.priority}</Chip> */}
                </div>
                <div className="h-auto space-y-3  w-full">
                  <p>
                    <span className="font-semibold mr-1">Summary:</span>
                    {item?.summary}
                  </p>
                  <p>
                    {" "}
                    <span className="font-semibold mr-1">Created:</span>
                    {formatDateTime(item?.created)}
                  </p>
                  {/* <a href={item?.link}>Ir al ticket</a> */}
                </div>
                <Button size="sm" color="default">
                  <a
                    href={`https://quirozrmartin.atlassian.net/jira/software/projects/OPS/boards/1?selectedIssue=${item?.key}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    View Ticket
                  </a>
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </Card>
      <JiraModal open={openJira} setOpen={setOpenJira} />
    </div>
  );
}
