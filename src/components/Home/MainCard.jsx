import { Card, Button } from "@nextui-org/react";
import "../../index.css";
import imgPhone from "../../assets/undraw_mobile_ux_re_59hr.svg";
import { useNavigate } from "react-router-dom";

export default function MainCard() {

  const navigate = useNavigate();
  return (
    <>
      <Card className="w-full h-96 my-4 bg-neutral-500  border-radius border-radius-m flex flex-col sm:flex-row space-y-2">
      <div className=" w-full sm:w-1/2 h-full flex items-center justify-center overflow-hidden">
  <img src={imgPhone} alt="Phone" className="w-auto h-screen  object-contain sm:object-cover" />
</div>
        <div className="w-full sm:w-1/2 h-full  flex items-center justify-center flex-col gap-y-4 px-3 text-center sm:text-left sm:px-8 ">
          <div className="text-base sm:text-2xl font-semibold">
            Tools to create seamless online forms with Formo.
          </div>
          <div className="text-sm sm:text-base">
            Formo gives users the tools to create online forms that are simple,
            efficient, and customizable for any need.
          </div>
          <div className=" mb-3">
            <Button color="primary" onClick={()=>{navigate("/create-form")}}>START BUILDING!</Button>
          </div>
        </div>
      </Card>
    </>
  );
}
