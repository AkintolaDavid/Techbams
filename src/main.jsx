import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      {" "}
      <App />
    </ChakraProvider>
  </StrictMode>
);
