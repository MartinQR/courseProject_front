import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
const APP_URL = import.meta.env.VITE_APP_URL;
import toast from "react-hot-toast";

export default function JiraModal({ open, setOpen }) {
  const { authData, setAuthData } = useContext(AuthContext);
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState();
  const currentUrl = window.location.href;

  useEffect(() => {
    setTicket({
      reportedBy: authData?.email,
      link: currentUrl,
      template: "",
      description: "",
      priority: "",
      summary: "",
    });
  }, [authData?.email]);
  // console.log("Ticket", ticket);

  function handleChangeTicket(label, value) {
    // console.log("Label", label);
    // console.log("Value", value);
    setTicket({ ...ticket, [label]: value });
  }
  const priorityOptions = [
    { key: "High", label: "High" },
    { key: "Medium", label: "Medium" },
    { key: "Low", label: "Low" },
  ];
  // console.log("Auth Context", authData);
  // console.log("Ticket", ticket);
  // HandleActions

  async function handleCreateTicket() {
    if (!authData?.email) {
      toast.error("You must be logged in to make a ticket");
      return;
    }
    // console.log(APP_URL)

    setTicket({
      ...ticket,
      reportedBy: authData?.email,
      link: "www.example.com",
    });
    setLoading(true);
    const url = `${APP_URL}/jira/createIssue`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticket),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, response: ${errorText}`
        );
      }

      const data = await response.json();
      handleResetInputs();
      toast.success("Ticket created successfully");
      console.log("Ticket created successfully:", data);
      setOpen(false);
    } catch (error) {
      toast.error("Error creating ticket");
      console.error("Error creating ticket:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleResetInputs() {
    setTicket({
      reportedBy: authData?.email,
      template: "",
      priority: "",
      summary: "",
      description: "",
    });
  }

  // console.log("Auth Data", authData);
  console.log("Ticket", ticket);
  return (
    <Modal
      isOpen={open}
      size="3xl"
      onClose={() => {
        setOpen(false);
      }}
      className="p-4">
      <ModalContent className="flex justify-center items-center">
        <ModalHeader className="flex justify-center space-x-4">
          <p className="text-center">Create support ticket</p>
          <div className="w-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M64 64C28.7 64 0 92.7 0 128l0 64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320l0 64c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-64c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6l0-64c0-35.3-28.7-64-64-64L64 64zm64 112l0 160c0 8.8 7.2 16 16 16l288 0c8.8 0 16-7.2 16-16l0-160c0-8.8-7.2-16-16-16l-288 0c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32l320 0c17.7 0 32 14.3 32 32l0 192c0 17.7-14.3 32-32 32l-320 0c-17.7 0-32-14.3-32-32l0-192z" />
            </svg>
          </div>
        </ModalHeader>
        <div className="space-y-4 my-10 w-full flex flex-col justify-center items-center">
          <div className="flex w-10/12 space-x-4">
            <Input isDisabled label="Reported by:" value={authData?.email} />
            <Input
              label="Template:"
              value={ticket?.template}
              onChange={(e) => {
                handleChangeTicket("template", e.target.value);
              }}
            />
          </div>
          <div className="flex w-10/12 space-x-4">
            <Input
              label="Summary:"
              value={ticket?.summary}
              onChange={(e) => {
                handleChangeTicket("summary", e.target.value);
              }}
            />
            <Select
              onChange={(e) => {
                handleChangeTicket("priority", e.target.value);
              }}
              label="Priority:">
              {priorityOptions.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>

          <div className="w-10/12">
            <Textarea
              value={ticket?.description}
              label="Description:"
              onChange={(e) => {
                handleChangeTicket("description", e.target.value);
              }}></Textarea>
          </div>
        </div>
        <Button
          isLoading={loading}
          className="w-10/12 mb-4 bg-amber-400"
          onClick={() => {
            handleCreateTicket();
            // createAccountAndContact(accountData, contactData);
          }}>
          CREATE TICKET
        </Button>
      </ModalContent>
    </Modal>
  );
}
