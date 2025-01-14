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
import { useState } from "react";
import toast from "react-hot-toast";
const APP_URL = import.meta.env.VITE_APP_URL;


export default function SalesforceModal({ open, setOpen }) {
  const [accountData, setAccountData] = useState({ Type: "Customer" });
  const [contactData, setContactData] = useState({});
  function updateAccountData(value, input) {
    setAccountData({
      ...accountData,
      [input]: value,
    });
  }

  function updateContactData(value, input) {
    setContactData({ ...contactData, [input]: value });
  }

  const createAccountAndContact = async () => {

    try {
      const response = await fetch(`${APP_URL}/salesforce/createAccountAndContact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountData, contactData }),
      });

      if (response.ok) {
        setOpen(false);
        setAccountData({ Type: "Customer" });
        setContactData({});
        toast.success("Account and Contact created successfully");
      }
      
    } catch (error) {
      throw new Error(error);
    }
  }


  return (
    <Modal
      isOpen={open}
      onClose={() => {
        setOpen(false);
      }}
      className="p-4">
      <ModalContent className="px-2">
        <ModalHeader className="flex justify-center">
          <p className="text-center">Subscribe with Salesforce</p>
        </ModalHeader>
        <div className="max-h-96 overflow-y-auto my-4 space-y-10 mx-6">
          <div className="space-y-2">
            <p className="font-semibold text-center">Account Data</p>
            <Input
              label="Account Name"
              size="sm"
              value={accountData?.name}
              onChange={(e) => {
                updateAccountData(e.target.value, "Name");
              }}
            />
            <Input
              label="Industry"
              size="sm"
              value={accountData?.Industry}
              onChange={(e) => {
                updateAccountData(e.target.value, "Industry");
              }}
            />
            <Input
              label="Phone"
              size="sm"
              value={accountData?.Phone}
              onChange={(e) => {
                updateAccountData(e.target.value, "Phone");
              }}
            />
            <Input
              label="Website"
              size="sm"
              value={accountData?.Website}
              onChange={(e) => {
                updateAccountData(e.target.value, "Website");
              }}
            />
          </div>
          <div className="space-y-2 mb-6">
            <p className="font-semibold text-center">Contact Data</p>
            <Input
              label="First Name"
              size="sm"
              value={contactData?.FirstName}
              onChange={(e) => {
                updateContactData(e.target.value, "FirstName");
              }}
            />
            <Input
              label="Last Name"
              size="sm"
              value={contactData?.LastName}
              onChange={(e) => {
                updateContactData(e.target.value, "LastName");
              }}
            />
            <Input
              label="Instagram"
              size="sm"
              value={contactData?.Instagram__c}
              onChange={(e) => {
                updateContactData(e.target.value, "Instagram__c");
              }}
            />
            <Input
              label="Fax"
              size="sm"
              value={contactData?.Fax}
              onChange={(e) => {
                updateContactData(e.target.value, "Fax");
              }}
            />
            <Input
              label="Email"
              size="sm"
              value={contactData?.Email}
              onChange={(e) => {
                updateContactData(e.target.value, "Email");
              }}
            />
            <Input
              label="Phone"
              size="sm"
              value={contactData?.Phone}
              onChange={(e) => {
                updateContactData(e.target.value, "Phone");
              }}
            />
          </div>
        </div>
        <div className="1 w-full flex items-center justify-center">
          <Button
            className="w-5/6"
            onClick={() => {
              createAccountAndContact(accountData, contactData);
            }}>
            Create Account & Contact with SalesForce
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
