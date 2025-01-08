import "../../index.css";
import { useState, useEffect, useContext } from "react";
import { Card, Avatar, Textarea } from "@nextui-org/react";
const APP_URL = import.meta.env.VITE_APP_URL;
import { AuthContext } from "../../contexts/AuthContext";

export default function FormInformation({ formId, formInputs }) {
  const { authData } = useContext(AuthContext);
  const [information, setInformation] = useState({});

  const getInformation = async () => {
    try {
      const response = await fetch(
        `${APP_URL}/form/getAggregatedResponsesByFormId?formId=${formId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("error", response);
        return;
      }
      
      const data = await response.json();
      console.log("data", data);
      
      setInformation(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (formId) {
      getInformation();
    }
  }, [formId]);

  console.log("formInputs", formInputs);
  

  return (
    // <div className="">
    <Card className="bg-neutral-100 w-full my-5 p-5">
      <div className="text-center font-bold text-2xl h-1/3">
        {authData?.userSettings?.language ? "Information" : "Información"}
      </div>

      <div>
        {formInputs?.map((input) => (
          <Card
            key={input?.id}
            className="bg-neutral-100 my-4 flex items-center justify-between p-2">
            <div className="flex items-center">
              <p className="text-xl font-bold ml-2">{input?.title}</p>
            </div>

            <div className="flex items-center">
              <p className="font-bold">Most frequent response:</p> 
              <p>{information?.[input?.id]?.mostFrequentValue}</p>
            </div>

            {
              input.type === "INTEGER" && (
                <div className="flex items-center">
                  <p className="font-bold">Average: </p> 
                  <p>
                    {information?.[input?.id]?.average}
                  </p>
                </div>
              )
            }
          </Card>
        ))}
      </div>
    </Card>
    // </div>
  );
}
