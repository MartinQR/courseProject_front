import { Card, Button } from "@nextui-org/react";
import "../../index.css";
import imgPhone from "../../assets/undraw_mobile_ux_re_59hr.svg";

export default function MainCard() {
  return (
    <>
      <Card className="w-full h-96 my-4 bg-neutral-500 rounded-full border-radius flex flex-row">
      <div className="w-1/2 h-full flex items-center justify-center overflow-hidden">
  <img src={imgPhone} alt="Phone" className="w-auto h-screen object-cover" />
</div>
        <div className="w-1/2 h-full  flex items-center justify-center flex-col gap-y-4 px-8 ">
          <div className=" text-2xl font-semibold">
            Tools to create seamless online forms with Formo.
          </div>
          <div className="">
            Formo gives users the tools to create online forms that are simple,
            efficient, and customizable for any need.
          </div>
          <div className="">
            <Button color="primary">START BUILDING!</Button>
          </div>
        </div>
      </Card>
    </>
  );
}
