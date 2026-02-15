"use client";

import { TikTokPost } from "@/lib/types";
import React, { createContext, useCallback, useMemo, useState } from "react";

interface StateContextProps {
  data: TikTokPost | null;
  handleSetData: (value: TikTokPost | null) => void;
  submitted: boolean;
  handleSubmitted: (value: boolean) => void;
}

const StateContext = createContext<StateContextProps | null>(null);

const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<TikTokPost | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSetData = useCallback((value: TikTokPost | null) => {
    setData(value);
  }, []);

  const handleSubmitted = useCallback((value: boolean) => {
    setSubmitted(value);
  }, []);

  const contextValue = useMemo(
    () => ({ data, handleSetData, handleSubmitted, submitted }),
    [data, handleSetData, handleSubmitted, submitted],
  );

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
