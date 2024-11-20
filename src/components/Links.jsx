import copy from "copy-to-clipboard";
import { useState } from "react";

function Links({ shortenURL, oldURL }) {
  const [isCopied, setIsCopied] = useState("copy");

  const handleCopy = () => {
    copy(shortenURL);
    setIsCopied("copied!");
    setTimeout(() => {
      setIsCopied("copy");
    }, 3000);
  };
  return (
    <article className="relative flex w-full flex-col justify-between gap-6 break-all rounded-lg bg-white px-6 py-4 shadow-sm  md:flex-row md:items-center md:text-left">
      <p>{oldURL.substring(0, 25)}...</p>
      <div className=" flex flex-col gap-4 md:flex-row md:items-center ">
        <p className="font-medium text-cyan-300">{shortenURL}</p>

        <button
          onClick={handleCopy}
          className={`rounded-md bg-cyan-400 py-2 px-4 font-bold capitalize text-white transition-all duration-300 ease-in-out hover:bg-cyan-300 hover:shadow-sm ${
            isCopied === "copied!"
              ? "bg-cyan-900 hover:bg-cyan-900 md:w-[11ch]"
              : "md:w-auto"
          }`}
        >
          {isCopied}
        </button>
      </div>
    </article>
  );
}

export default Links;
