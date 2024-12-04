import { useState, useEffect } from "react";
import { Card, CardBody, Button, ButtonGroup } from "@nextui-org/react";

export default function Header() {
  return (
    <div className="flex  gap-1">
      <div className="w-6 ">
        <Card
          className="h-12 flex items-center justify-center font-semibold text-2xl bg-neutral-900 text-white "
          size="md">
          .
        </Card>
      </div>
      <div>
        <Card
          className="h-12 w-12 flex items-center justify-center font-semibold text-xl bg-neutral-900 text-white"
          size="md">
          /
        </Card>
      </div>
      <div>
        <Card
          className="h-12 w-28 rounded-3xl flex items-center justify-center font-semibold text-2xl bg-neutral-900 text-white"
          size="md">
          formo     
        </Card>
      </div>
      <button
        // onClick={() => alert("Clic en el botón")}
        className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center bg-neutral-300">
        <div className="w-0.5 h-8 bg-white absolute bg-black"></div>{" "}
        <div className="w-8 h-0.5 bg-white absolute bg-black"></div>{" "}
      </button>

      {/* <div >
        <Card className="w-12 h-12 rounded-full flex items-center justify-center text-5xl" size="md">+</Card>
      </div> */}
    </div>
  );
}
