import React, { useState, useEffect } from "react";
import loadingGif from "../assets/loading-logo.gif";

const Loading = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.substring(0, index + 1));
        index++;
      } else {
        index = 0;
        setDisplayedText("");
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="justify-center items-center min-h-screen flex flex-col">
      <img src={loadingGif} alt="Loading..." className="w-20" />
      <span className="mt-3 text-2xl text-blue-500 font-semibold">
        Loading{displayedText}
      </span>
    </div>
  );
};

export default Loading;
