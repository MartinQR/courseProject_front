import { Button, Card } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TableTemplates() {
  const APP_URL = import.meta.env.VITE_APP_URL;
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  const getMostRespondedForms = async () => {
    try {
      const response = await fetch(`${APP_URL}/form/getMostRespondedForms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMostRespondedForms();
  }, []);


  return (
    <div className="flex flex-col sm:flex-row w-full h-full sm:h-96 my-5 space-y-2 sm:space-x-4 sm:space-y-0">
      <Card className=" w-full sm:w-1/3 h-48 sm:h-full bg-amber-400 rounded-3xl flex items-center justify-center text-center text-3xl md:text-4xl lg:text-6xl leading-none overflow-hidden break-words">
        5 most popular templates
      </Card>
      <Card className="w-full sm:w-2/3 h-full bg-neutral-100 rounded-3xl flex flex-row items-center ">
        <div className="flex flex-col items-center justify-center h-full sm:h-96  w-1/3  ">
          <div className="w-20 h-6 bg-amber-400 rounded-lg "></div>

          <div className="h-4"></div>

          <div className="w-20 h-6 bg-amber-400 rounded-lg"></div>

          <div className="h-4"></div>

          <div className="w-20 h-6 bg-amber-400 rounded-lg"></div>
        </div>
        <div className="w-2/3 h-full flex items-center justify-center flex-col p-3 space-y-2 sm:space-y-4  ">
          {/* Top 5 popular templates */}

          {templates?.map((template, i) => (
            <div key={template?.id} className="flex justify-between items-center w-full">
              <div>
                <p className="font-bold">{template?.title}</p>
                <p className="font-mono">{template?.description}</p>
              </div>
              <Button
                className="bg-amber-400"
                onClick={() => {
                  navigate(`/fill-form?idTemplate=${template?.id}`);
                  setOpen(false);
                }}
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
