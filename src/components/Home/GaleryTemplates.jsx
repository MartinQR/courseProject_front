import { Card, Skeleton } from "@nextui-org/react";
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const APP_URL = import.meta.env.VITE_APP_URL;


export default function GalleryTemplates() {
  const [lastFivePublicTemplate, setLastFivePublicTemplate] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getLastFivePublicForms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${APP_URL}/form/getLastFivePublicForms`);
      const data = await response.json();
      
      setLastFivePublicTemplate(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getLastFivePublicForms();
  }, []);


  const icon = (formId) => (
    <svg
      onClick={() => {
        console.log("formId", formId);
        navigate(`/fill-form?idTemplate=${formId}`);
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 512 512">
      <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
    </svg>
  );



  return (
    <div className=" overflow-x-auto custom-scrollbar py-4">
      <div className="flex space-x-4 w-max">

        {loading 
          ? (
              <>
                <Skeleton className="w-80 h-80 bg-neutral-100 rounded-3xl flex flex-col justify-between" />
                <Skeleton className="w-80 h-80 bg-neutral-100 rounded-3xl flex flex-col justify-between" />
                <Skeleton className="w-80 h-80 bg-neutral-100 rounded-3xl flex flex-col justify-between" />
                <Skeleton className="w-80 h-80 bg-neutral-100 rounded-3xl flex flex-col justify-between" />
                <Skeleton className="w-80 h-80 bg-neutral-100 rounded-3xl flex flex-col justify-between" />
              </>
            ) 
          : lastFivePublicTemplate?.map((template) => (
              <Card key={template?.id} className="w-80 h-80 bg-neutral-100 rounded-3xl flex flex-col justify-between">
                <div className="m-5">
                  {icon(template?.id)}
                </div>
                <div className="m-5">
                  <p className="font-bold mb-4"> * {template?.title}</p>
                  <p>
                    {template?.description}
                  </p>


                  <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-500 mt-4">
                      {template?.topic?.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      {template?.creator?.email}
                    </p>
                  </div>
                </div>
              </Card>
            )
          )
        }

      </div>
    </div>
  );
}
