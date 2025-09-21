import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CurrentContentProvider } from "./contexts/currentContentContext.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router/routeTree.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CurrentContentProvider>
      <RouterProvider router={router} />
    </CurrentContentProvider>
  </StrictMode>
);
