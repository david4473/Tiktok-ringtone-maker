"use client";
import useStateData from "@/hooks/useStateData";
import { TikTokPost } from "@/lib/types";
import { formAction } from "@/utils/form-action";
import { StateContext } from "@/utils/stateContext";
import { ArrowDownToLine } from "lucide-react";
import { FormEvent, useContext, useEffect, useState } from "react";

export default function Form() {
  const [url, setUrl] = useState<string>("");

  const context = useContext(StateContext);

  const { handleSetData } = useStateData();

  async function handleForm(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    if (!url && !url.includes("tiktok.com")) return;

    const data: TikTokPost = await formAction(url);
    handleSetData(data);
  }

  return (
    <div>
      <form onSubmit={handleForm}>
        <div>
          <input
            name="url"
            type="text"
            placeholder="Paste Tiktok video URL here"
            className="w-96 p-2 border-2 rounded mr-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUrl(e.target.value)
            }
          />
          <button className="inline-flex bg-amber-400 rounded p-2 cursor-pointer">
            <ArrowDownToLine />
            Download
          </button>
        </div>
      </form>
    </div>
  );
}
