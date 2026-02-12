"use client";

import Form from "@/components/form";
import CuteRingtoneMaker from "@/components/wavejs";
import useStateData from "@/hooks/useStateData";
import { Music } from "lucide-react";

export default function Home() {
  const data = useStateData().data;
  return (
    <div className="font-sans pt-8 items-center justify-items-center min-h-screen sm:p8 sm:pb-20 gap-16 bg-cyan-50">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/*Header*/}
        <div className="text-center w-full">
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center justify-center bg-cyan-200 p-3 rounded-full mr-2 shadow-sm ">
              <Music className="text-cyan-900 w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-cyan-900 tracking-wide drop-shadow-sm">
              Toneify
            </h1>
          </div>
          <p className="text-cyan-900/90 mt-2 font-medium mt-4">
            Turn Tiktok sounds into ringtones! ✨
          </p>
        </div>
        <Form />
        {data && <CuteRingtoneMaker />}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
