// hooks/useCurrentContent.ts
import { useContext } from "react";
import { CurrentContentContext } from "../contexts/currentContentContext";

export function useCurrentContent() {
  const context = useContext(CurrentContentContext);
  if (!context) {
    throw new Error(
      "useCurrentContent must be used within a CurrentContentProvider"
    );
  }
  return context;
}
