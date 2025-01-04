import { Button, Card, Chip, Skeleton } from "@nextui-org/react";
import { useEffect, useState, useContext } from "react";
import { SearchTemplateModal } from "../SearchTemplateModal/SearchTemplateModal";
import { AuthContext } from "../../contexts/AuthContext";

const APP_URL = import.meta.env.VITE_APP_URL;

export function TagsCloud() {
  const [tagsData, setTagsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState({});
  const { authData } = useContext(AuthContext);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${APP_URL}/tag/getAll`);
      const data = await response.json();
      setTagsData(data);
    } catch (error) {
      console.error("Error fetching tags", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Card
      className={`w-full my-5 rounded-lg py-6 px-8 h-48 overflow-auto custom-scrollbar rounded-3xl ${
        authData?.userSettings?.theme ? "bg-neutral-300" : "bg-neutral-500"
      }`}>
      <div className="flex flex-wrap justify-center">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-20 h-10 bg-neutral-500 border-2 border-neutral-50 rounded-lg m-1"
              />
            ))
          : tagsData?.map((tag) => (
              <Button
                key={tag?.id}
                // className="m-1 text-white"
                className={`m-1 ${
                  authData?.userSettings?.theme ? "text-black" : "text-white"
                }`}
                variant={`${
                  authData?.userSettings?.theme ? "faded" : "ghost"
                }`}

                onClick={() => {
                  setOpen(true);
                  setTag(tag?.name);
                }}>
                {tag?.name}
              </Button>
            ))}
      </div>

      <SearchTemplateModal open={open} setOpen={setOpen} tag={tag} />
    </Card>
  );
}
