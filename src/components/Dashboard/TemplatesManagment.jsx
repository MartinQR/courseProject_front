import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { useScroll } from "framer-motion";
import { useState } from "react";

export function TemplatesManagment() {
  const [btnSelection, setBtnSelection] = useState(true);

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
