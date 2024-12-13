import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Button,
  TimeInput,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};


const AP_URL = import.meta.env.VITE_APP_URL;

export default function TableUsers() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [reload, setReload] = useState();
  const location = useLocation();
  const { email } = location.state || {};

  const navigate = useNavigate();



  // Get Users Data
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${AP_URL}/user/getAll`,
      );
      if (!response.ok) {
        throw new Error("Error fetching users");
      }
      const data = await response.json();
      setDataUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };



  //Delete users
  const deleteUsers = async (selectedUserIds) => {
    try {
      const response = await fetch(
        "https://task4-backend-ebgi.onrender.com/api/users/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, ids: selectedUserIds }),
        }
      );

      if (!response.ok) {
        if (response.status === 403 || response.status === 404) {
          toast.error(
            "Your account is blocked or does not exist. Please log in again."
          );
          navigate("/");
          return;
        }
        throw new Error("Error deleting users");
      }

      const result = await response.json();
      toast.success("Successfully deleted users!", result);
      fetchUsers();
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  //Block Users

  const blockUsers = async (selectedUserIds) => {
    try {
      const response = await fetch(
        "https://task4-backend-ebgi.onrender.com/api/users/block",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, ids: selectedUserIds }),
        }
      );

      if (!response.ok) {
        if (response.status === 403 || response.status === 404) {
          toast.error(
            "Your account is blocked or does not exist. Please log in again."
          );
          navigate("/");
          return;
        }
        throw new Error("Error blocking users");
      }

      const result = await response.json();
      toast.success("Users successfully blocked!", result.message);

      fetchUsers();
    } catch (error) {
      toast.error("Error blocking users: " + error);
    }
  };

  // Unblock Users

  const unblockUsers = async (selectedUserIds) => {
    try {
      const response = await fetch(
        "https://task4-backend-ebgi.onrender.com/api/users/unblock",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, ids: selectedUserIds }),
        }
      );

      if (!response.ok) {
        if (response.status === 403 || response.status === 404) {
          toast.error(
            "Your account is blocked or does not exist. Please log in again."
          );
          navigate("/");
          return;
        }
        throw new Error("Error blocking users");
      }

      const result = await response.json();
      toast.success("Users successfully unlocked", result.message);

      fetchUsers();
    } catch (error) {
      console.error("Error unlocked users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        const userName = `${user?.firstName} ${user?.lastName}`;
        console.log("User Name", userName);
        return <User name={userName}></User>;
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {user?.email}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user?.status]}
            size="sm"
            variant="flat">
            {user?.isBlocked ? "Blocked" : }
          </Chip>
        );
    //   case "createdAt":
    //     return (
    //       <div className="flex flex-row align-center justify-center">
    //         <div className="flex items-center justify-center ">
    //           <p>
    //             {user?.created_at?.split("T")[0]}{" "}
    //             {user?.created_at?.split("T")[1].substring(0, 5)}
    //           </p>
    //         </div>
    //       </div>
    //     );
    //   case "lastLogin":
    //     return (
    //       <div className="flex flex-row align-center justify-center">
    //         <div className="flex items-center justify-center ">
    //           <div>
    //             {user?.last_login == null ? (
    //               <Chip color="warning" variant="bordered">
    //                 No Data
    //               </Chip>
    //             ) : (
    //               <p>
    //                 {user?.last_login?.split("T")[0]}{" "}
    //                 {user?.last_login?.split("T")[1].substring(0, 5)}
    //               </p>
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     );

      default:
        return cellValue;
    }
  }, []);

  const selectedUsers = Array.from(selectedKeys);

//   UTILS

const columns = [

    {name:"NAME", uid:"name"},
    {name:"E-MAIL", uid:"email"},
    {name:"STATUS", uid:"status"},
    {name:"ADMIN", uid:"admin"},

]

console.log("Data Users", dataUsers);
  return (
    <div className="flex items-center justify-center flex-col space-y-3 ">
      <div className="w-4/5 flex items-center justify-center flex-col">
        <div className="flex space-x-2 w-auto  ml-4 mt-8 ">
          <Button
            className="bg-foreground text-background"
            size="sm"
            onClick={() => blockUsers(selectedUsers)}>
            <div className="w-3">
              <svg
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="100"
                width="100%">
                <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
              </svg>
            </div>
            <div>Block</div>
          </Button>
          <Button
            size="sm"
            variant="flat"
            onClick={() => unblockUsers(selectedUsers)}>
            <div className="w-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="100"
                width="100%">
                <path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144l0 48-16 0c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-240 0 0-48z" />
              </svg>
            </div>
          </Button>
          <Button
            size="sm"
            variant="flat"
            onClick={() => deleteUsers(Array.from(selectedKeys))}>
            <div className="w-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                height="100"
                width="100%">
                <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
              </svg>
            </div>
          </Button>
          <Button
            className="ml-20"
            size="sm"
            variant="shadow"
            onClick={() => navigate("/")}>
            Log Out
          </Button>
        </div>
        {/* <div className="flex my-2 ml-6 w-auto">
          <span className="">
            Total {dataUsers.length} users - Welcome {email}
        
          </span>
        </div> */}
      </div>
      {/* Container for the Table */}
      <div className="w-1/2  sm:w-9/12 md:w-11/12 lg:w-full mb-10">
        <Table
          selectionMode="multiple"
          onSelectionChange={setSelectedKeys}
          aria-label="User Table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={dataUsers}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* </Card> */}
    </div>
  );
}
