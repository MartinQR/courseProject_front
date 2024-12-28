import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@nextui-org/react";
import { use, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const APP_URL = import.meta.env.VITE_APP_URL;

export function SearchTemplateModal({
  open,
  setOpen,
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [templatesfetched, setTemplatesFetched] = useState([]);
  const navigate = useNavigate();


  const getTemplatesByQuery = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${APP_URL}/form/searchForms?query=${query}`);
      const data = await response.json();
      setTemplatesFetched(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    getTemplatesByQuery(e.target.value);
  };

  useEffect(() => {
    getTemplatesByQuery(query);
  }, []);
  

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        setOpen(false);
      }}
      size="4xl"
    >
      <ModalContent>
        <ModalHeader className="flex items-center">
          {/* <p>Lupita here</p> */}
          <Input
            placeholder="Search template..."
            size="lg"
            className="w-[90%]"
            value={query}
            onChange={handleSearch}
           
          />
          {loading && <Spinner />}
        </ModalHeader>

        <ModalBody className="m-2 overflow-y-auto max-h-96">
          {templatesfetched?.map((template, i) => (
            <div key={template?.id} className="flex justify-between items-center">
              <div>
                <p className="font-bold">{template?.title}</p>
                <p className="font-mono">{template?.description}</p>
              </div>
              <Button
                onClick={() => {
                  navigate(`/fill-form?idTemplate=${template?.id}`);
                  setOpen(false);
                }}
              >
                View
              </Button>
            </div>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}