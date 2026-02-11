"use client";
import useStateData from "@/hooks/useStateData";
import { TikTokPost } from "@/lib/types";
import { formAction } from "@/utils/form-action";
import { ArrowDownToLine } from "lucide-react";
import { FormEvent, useContext, useEffect, useState } from "react";

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
    <div>
      <form onSubmit={handleForm}>
        <div className="flex">
          <input
            name="url"
            type="text"
            placeholder="Paste Tiktok video URL here"
            className="w-lg p-2 border-2 rounded mr-2 border-cyan-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
          />
          <button className="inline-flex items-center bg-cyan-500 rounded p-2 cursor-pointer hover:bg-cyan-600 active:bg-cyan-700 text-amber-50">
            <ArrowDownToLine size={20} />
            Download
          </button>
        </div>
      </form>
    </div>
  );
}
