import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import Root from "./Root";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <Root></Root>
    </NextUIProvider>
  </StrictMode>
);