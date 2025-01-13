import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { use, useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { createAccountAndContact, getAccessToken } from "../SalesForce/utils";

export default function SalesforceModal({ open, setOpen }) {
  const [token, setToken] = useState("");

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        setOpen(false);
      }}
      className="p-4 ">
      <ModalContent className="">
        <ModalHeader className="flex justify-center">
          <p className="text-center">Subscribe with Salesforce</p>
        </ModalHeader>
        <div className="max-h-96 overflow-y-auto my-4 space-y-10">
          <div className="space-y-2">
            <p className="font-semibold text-center">Account Data</p>
            <Input label="Account Name" size="sm" />
            <Input label="Industry" size="sm" />
            <Input label="Phone" size="sm" />
            <Input label="Website" size="sm" />
          </div>
          <div className="space-y-2 mb-6">
            <p className="font-semibold text-center">Contact Data</p>
            <Input label="First Name" size="sm" />
            <Input label="Last Name" size="sm" />
            <Input label="Instagram" size="sm" />
            <Input label="Fax" size="sm" />
            <Input label="Email" size="sm" />
            <Input label="Phone" size="sm" />
          </div>
        </div>
        <Button onClick={createAccountAndContact}>
          Create Account & Contact with SalesForce
        </Button>
      </ModalContent>
    </Modal>
  );
}
