import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { CardBody, CardFooter, Image} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const APP_URL = import.meta.env.VITE_APP_URL;

export function TemplatesManagment() {
  const { authData } = useContext(AuthContext);
  const [templates, setTemplates] = useState([]);
  const [btnSelection, setBtnSelection] = useState(true);

  const getUserTemplates = async (userId) => {
    try {
      const response = await fetch(`${APP_URL}/form/getFormsByUserId?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      console.log(data);

      setTemplates(data);
      
      
    } catch (error) {
      throw new Error(error);
    }
  };

  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];
  
  useEffect(() => {
    getUserTemplates(authData?.id);
  }, []);

  return (
    <div className="w-full  flex flex-col space-y-4 items-center justify-center my-4">
      <ButtonGroup className="w-2/5 ">
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
      <Card className="w-full h-80">
        {btnSelection ? (
          <>
            <CardHeader>
              <div className="flex items-center justify-center w-full space-x-4">
                <p>Tempaltes Created</p>
                <div>
                  <Button>Create New + </Button>
                </div>
              </div>
            </CardHeader>
          </>
        ) : (
          <>
            <CardHeader>
            <div className="flex items-center justify-center w-full space-x-4">
                <p>Filled Forms</p>
                <div>
                  <Button>Create New + </Button>
                </div>
              </div>
            </CardHeader>
          </>
        )}
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {templates.map((item, index) => (
            /* eslint-disable no-console */
            <Card key={index} isPressable shadow="sm" className="mx-3" onPress={() => console.log("item pressed")}>
              <CardBody className="overflow-visible p-0">
                <div className="flex items-center justify-center">
                  <b>{item.title}</b>
                </div>
              </CardBody>
              <CardFooter className="text-small justify-between">
                <p className="text-default-500">{item.description}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        
      </Card>
    </div>
  );
}
