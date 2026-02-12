"use client";
import useStateData from "@/hooks/useStateData";
import { TikTokPost } from "@/lib/types";
import { formAction } from "@/utils/form-action";
import { ArrowDownToLine, FileSearchCorner } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Form() {
  const [url, setUrl] = useState<string>("");

  const { handleSetData } = useStateData();

  async function handleForm(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (!url && !url.includes("tiktok.com")) return;

    const data: TikTokPost = await formAction(url);
    console.log(data);

    handleSetData(data);
  }

  return (
    <div className="sm:w-full w-[360px] sm:flex sm:items-center sm:justify-center">
      <form onSubmit={handleForm}>
        <div className="sm:flex block">
          <input
            name="url"
            type="text"
            placeholder="Paste Tiktok video URL here"
            className="sm:w-lg w-full p-2 border-2 rounded mr-2 border-cyan-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
          />
          <button className="flex w-full sm:w-auto mt-2.5 sm:mt-0 gap-0.5 justify-center items-center bg-cyan-500 rounded p-2 cursor-pointer hover:bg-cyan-600 active:bg-cyan-700 text-amber-50">
            <FileSearchCorner size={20} />
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
