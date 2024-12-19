import "../../index.css";
import { useState, useEffect, useContext } from "react";
import {
  Card,
  Spinner,
  Avatar,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
const APP_URL = import.meta.env.VITE_APP_URL;

export default function ViewTemplate() {
  // EndPoints Test

  // Get a list of all the filled out forms of a template
  const fetchFilledForms = async (templateId) => {
    console.log("Entra 1")
    try {
      const response = await fetch(
        `${APP_URL}/formResponse/getAllFilledOutFormsByFormId?formId=${templateId}`
      );
      if (!response.ok) {
        throw new Error("Error gettin Form");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error gettinf Form:", error);
    }
  };

  // Get the filled out template by user
  const fetchTemplateResponseByUser = async (userId, formId) => {
    console.log("Entra 2")
    try {
      const response = await fetch(
        `${APP_URL}/form/getFilledOutFormByUserId?userId=${userId}&formId=${formId}`
      );
      if (!response.ok) {
        throw new Error("Error gettin Form");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error gettinf Form:", error);
    }
  };

  // Get alld the filled out templates by you
  const fetchFilledOutTemplates = async (userId) => {
    console.log("Entra 3")
    try {
      const response = await fetch(
        `${APP_URL}/formResponse/getAllFilledOutFormsByUserId?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("Error gettin Form");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error gettinf Form:", error);
    }
  };

  return (
    <div className="space-x-4">
      <Button
        onClick={() => {
          fetchTemplateResponseByUser(
            "c9f05593-96eb-4fda-b33a-e341fe3f02c3",
            "275dabdd-507a-41e2-be3c-2011016d90c5"
          );
        }}>
        View Template response of a user -2
      </Button>
      <Button
        onClick={() => {
          fetchFilledForms("275dabdd-507a-41e2-be3c-2011016d90c5");
        }}>
        View Filled Forms -1
      </Button>
      <Button
        onClick={() => {
          fetchFilledOutTemplates("c9f05593-96eb-4fda-b33a-e341fe3f02c3 ");
        }}>
        View filled out templates - 3
      </Button>
    </div>
  );
}
