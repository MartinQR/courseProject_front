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
} from "@nextui-org/react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function JiraModal({ open, setOpen }) {
  const { authData, setAuthData } = useContext(AuthContext);
  const [ticket, setTicket] = useState({});

  console.log("Ticket", ticket);

  function handleChangeTicket(label, value) {
    setTicket({ ...ticket, [label]: value });
  }
  const priorityOptions = [
    { key: "HIGH", label: "High" },
    { key: "AVERAGE", label: "Average" },
    { key: "LOW", label: "Low" },
  ];
  console.log("Auth Context", authData);
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
            <Input label="Template:" value={authData?.email} />
          </div>
          <div className="flex w-10/12 space-x-4">
            <Input label="Link:" value={authData?.email} />
            <Select
              onChange={(e) => {
                handleChangeTicket("Priority", e.target.value);
              }}
              label="Priority:"
              value={authData?.email}>
              {priorityOptions.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-10/12 space-x-4">
            <Input label="Status:" value={authData?.email} />
          </div>
        </div>
        <Button
          className="w-10/12 mb-4 bg-amber-400"
          onClick={() => {
            // createAccountAndContact(accountData, contactData);
          }}>
          CREATE TICKET
        </Button>
      </ModalContent>
    </Modal>
  );
}
