"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const toneModes = [
  { id: "white", label: "White" },
  { id: "dark", label: "Dark" },
  { id: "orange", label: "Orange" },
] as const;

export type ToneMode = (typeof toneModes)[number]["id"];

const toneModeStorageKey = "tiktok-ringtone-maker-color-mode";

type ThemeContextValue = {
  toneMode: ToneMode;
  setToneMode: (mode: ToneMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function isToneMode(value: string | null): value is ToneMode {
  return toneModes.some((mode) => mode.id === value);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [toneMode, setToneMode] = useState<ToneMode>(() => {
    if (typeof window === "undefined") {
      return "white";
    }

    const storedMode = window.localStorage.getItem(toneModeStorageKey);
    return isToneMode(storedMode) ? storedMode : "white";
  });

  useEffect(() => {
    document.documentElement.dataset.toneMode = toneMode;

    if (typeof window !== "undefined") {
      window.localStorage.setItem(toneModeStorageKey, toneMode);
    }
  }, [toneMode]);

  const value = useMemo(() => ({ toneMode, setToneMode }), [toneMode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useToneMode() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useToneMode must be used inside ThemeProvider");
  }

  return context;
}
