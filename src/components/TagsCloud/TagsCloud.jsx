import { Button, Card, Chip, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SearchTemplateModal } from "../SearchTemplateModal/SearchTemplateModal";


const APP_URL = import.meta.env.VITE_APP_URL;

export function TagsCloud() {
  const [tagsData, setTagsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState({});

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
  }, [])

  return (
    <Card className="w-full my-5 rounded-lg bg-neutral-500 py-6 px-8 h-48 overflow-auto custom-scrollbar">
      <div className="flex flex-wrap justify-center">
        {loading 
          ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton 
                key={index}
                className="w-20 h-10 bg-neutral-500 border-2 border-neutral-50 rounded-lg m-1"
              />
            ))
          ) 
          : tagsData?.map((tag) => (
            <Button 
              key={tag?.id} 
              className="m-1 text-white"
              variant="ghost"
              onClick={() => {
                setOpen(true);
                setTag(tag?.name);
              }}
            >
              {tag?.name}
            </Button>
          ))
        }
      </div>

      <SearchTemplateModal open={open} setOpen={setOpen} tag={tag}/>
    </Card>
  )
}