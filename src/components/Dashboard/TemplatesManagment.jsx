import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const APP_URL = import.meta.env.VITE_APP_URL;

export function TemplatesManagment() {
  const { authData } = useContext(AuthContext);
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
      
      
    } catch (error) {
      throw new Error(error);
    }
  };
  
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
      </Card>
    </div>
  );
}
