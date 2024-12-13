import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import Root from "./Root";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </NextUIProvider>
  </StrictMode>
);