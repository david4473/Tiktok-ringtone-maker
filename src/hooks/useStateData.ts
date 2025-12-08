"use client";

import { StateContext } from "@/utils/stateContext";
import { useContext } from "react";

export default function useStateDate() {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useStateData must be used within a StateContextProvider");
  }

  return context;
}
