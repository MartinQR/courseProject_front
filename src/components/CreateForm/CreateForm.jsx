import "../../index.css";
import { useState, useEffect } from "react";
import { Card, Button, Input, Select, SelectItem } from "@nextui-org/react";
import AddInput from "../Input/AddInput"; 


export default function CreateForm() {
  const [formData, setFormData] = useState();
  const [newInput,setNewInput] = useState()

 

  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3 flex items-center flex-col">
      <Card className="w-full h-24 my-3 rounded-3xl bg-neutral-500 flex justify-center items-center">
        {" "}
        Form Title
      </Card>

      <Card className="bg-neutral-100 w-3/5  p-5">
 
       <AddInput></AddInput>
      </Card>
    </div>
  );
}
