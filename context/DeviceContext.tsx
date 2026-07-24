"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
export type Device = "desktop" | "mobile" | "tablet";

const QueryContext = createContext<Device | undefined>(undefined);

// This is the provider                                                                                                                                                                                                         By Ruben
export function MediaQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [device, setDevice] = useState<Device>("mobile");

  useEffect(() => {
    const tabletQuery = window.matchMedia(
      "(min-width: 641px) and (max-width: 1000px)"
    );
    const mobileQuery = window.matchMedia("(max-width: 640px)");

    const handleQuery = () => {
      if (mobileQuery.matches) {
        setDevice("mobile");
      } else if (tabletQuery.matches) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    handleQuery();

    tabletQuery.addEventListener("change", handleQuery);
    mobileQuery.addEventListener("change", handleQuery);
    

    return () => {
      tabletQuery.removeEventListener("change", handleQuery);
      mobileQuery.removeEventListener("change", handleQuery);
    };
  }, []);

  return (
    <QueryContext.Provider value={device}>{children}</QueryContext.Provider>
  );
}

// Consumer
export function useMediaQuery() {
  const device = useContext(QueryContext);
  if (!device) {
    throw new Error(
      "useMediaQuery can only be used in a QueryContext Provider"
    );
  }

  return device;
}
