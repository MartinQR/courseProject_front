import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Card } from "@nextui-org/react";
import useWindowSize from "../../Hooks.jsx/UseWindowSize.js";
import { div } from "framer-motion/client";

export default function Dashboard() {
  const size = useWindowSize();

  return (
    <div className="gray-background w-full min-h-screen  px-3 py-3 flex items-center flex-col">
      {size.width >= 768 ? (
        <div className="grid grid-cols-5  gap-2 w-full auto-rows-[6rem]">
          <div className="bg-orange-600 border-radius2 flex items-center justify-center ">
            1
          </div>
          <div className="bg-amber-400 border-radius2 flex items-center justify-center">
            2
          </div>
          <div className="row-span-2 bg-neutral-100 border-radius2 flex items-center justify-center ">
            3
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center p-4">
            4
          </div>
          <div className="bg-neutral-100 border-radius2 flex items-center justify-center flex-col p-4">
            5
          </div>

          <div className="col-span-2 col-start-4 flex space-x-1 ">
            {/* Inicia Div 8 */}
            <div className="w-1/6 ">
              <Card
                className="h-full flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius3 "
                size="md">
                .
              </Card>
            </div>
            <div className="w-2/6">
              <Card
                className="h-full  flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius2"
                size="md">
                /
              </Card>
            </div>
            <div className="w-3/6">
              <Card
                className="h-full  flex items-center justify-center font-semibold text-4xl bg-neutral-900 text-white border-radius3"
                size="md">
                formo
              </Card>
            </div>
            {/* Termina Div 9 */}
          </div>
          <div className="bg-neutral-100 row-start-2 col-start-1 border-radius2 flex items-center justify-center p-4">
            6
          </div>

          <div className="bg-neutral-100 row-start-2 col-start-2 border-radius2 flex items-center justify-center p-4">
            {" "}
            7
          </div>
        </div>
      ) : (
        "Menor a 768"
      )}
    </div>
  );
}
