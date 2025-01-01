import {
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const APP_URL = import.meta.env.VITE_APP_URL;

export function SearchUsersModal({ open, setOpen, form, setForm }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { authData, setAuthData } = useContext(AuthContext);

  const getUsersByQuery = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${APP_URL}/user/getAvailableUsersByQuery?query=${query}`
      );

      if (!response.ok) {
        throw new Error("An error occurred while fetching the data");
      }

      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    getUsersByQuery(e.target.value);
  };

  useEffect(() => {
    getUsersByQuery(query);
  }, []);

  const handleSelectUser = (userId) => {
    const user = usersData.find((user) => user.id === userId);
    setForm({
      ...form,
      allowedUsers: [...form?.allowedUsers, user],
    });
  };

  const handleUnselectUser = (userId) => {
    const user = usersData.find((user) => user.id === userId);
    setForm({
      ...form,
      allowedUsers: form?.allowedUsers.filter(
        (allowedUser) => allowedUser?.id !== user.id
      ),
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size="4xl" className="p-6">
      <ModalContent>
        <div className="flex justify-center items-center m-3">
          <ButtonGroup className="w-full sm:px-0 sm:w-3/5 md:w-2/5 ">
            <Button
              className="w-1/2"
              color={selectedTab === 0 ? "primary" : "default"}
              onClick={() => {
                setSelectedTab(0);
              }}>
              {authData?.userSettings?.language
                ? "Add users"
                : "Agregar Usuarios"}
            </Button>
            <Button
              className="w-1/2"
              color={selectedTab === 1 ? "primary" : "default"}
              onClick={() => {
                setSelectedTab(1);
              }}>
              {authData?.userSettings?.language
                ? " View users"
                : "Ver usuarios"}
            </Button>
          </ButtonGroup>
        </div>
        <ModalHeader className="block items-center">
          <p className="text-lg font-bold text-center my-2">
            {authData?.userSettings?.language
              ? "Select the users who can complete the form"
              : "Selecciona los usuarios que podran responder el formulario"}
          </p>
          {selectedTab === 0 && (
            <div className="flex w-full">
              <Input
                placeholder="Search user..."
                size="lg"
                className="w-[90%]"
                value={query}
                onChange={handleSearch}
              />
              {loading && <Spinner />}
            </div>
          )}
        </ModalHeader>

        <ModalBody className="m-2 overflow-y-auto max-h-96">
          {selectedTab === 0
            ? usersData
                ?.filter(
                  (user) =>
                    !form?.allowedUsers?.find(
                      (allowedUser) => allowedUser?.id === user?.id
                    )
                )
                ?.map((user, i) => (
                  <div
                    key={user?.id}
                    className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
                      <p className="font-mono">{user?.email}</p>
                    </div>
                    <Button
                      onClick={() => handleSelectUser(user?.id)}
                      className={"bg-blue-500 text-white"}>
                      {authData?.userSettings?.language
                        ? "Select"
                        : "Seleccionar"}
                    </Button>
                  </div>
                ))
            : form?.allowedUsers?.map((user, i) => (
                <div
                  key={user?.id}
                  className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
                    <p className="font-mono">{user?.email}</p>
                  </div>
                  <Button
                    onClick={() => handleUnselectUser(user?.id)}
                    className={"bg-red-500 text-white"}>
                    {authData?.userSettings?.language ? "Remove" : "Quitar"}
                  </Button>
                </div>
              ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
