"use client";

import { TikTokPost } from "@/lib/types";
import React, { createContext, useCallback, useMemo, useState } from "react";

interface StateContextProps {
  data: TikTokPost | null;
  handleSetData: (value: TikTokPost | null) => void;
}

const StateContext = createContext<StateContextProps | null>(null);

const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<TikTokPost | null>(null);

  const handleSetData = useCallback((value: TikTokPost | null) => {
    setData(value);
  }, []);

  const contextValue = useMemo(
    () => ({ data, handleSetData }),
    [data, handleSetData]
  );

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
