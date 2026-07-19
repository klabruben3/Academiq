"use client";

import { Academiq, LoadingScreen } from "@/components/layout";
import { useState } from "react";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);

  return <>{isAuth ? <Academiq /> : <LoadingScreen />}</>;
}
