import React, { useEffect, useRef, useState } from "react";
import { useApp } from "../app/context/GlobalContext";

function EditVideo() {
  const videoRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const { isMusicReady } = useApp();

  useEffect(() => {
    if (!isMusicReady) return;

    const timer = setTimeout(() => {
      setShowVideo(true);
      videoRef.current?.play();
    }, 22000);

    return () => clearTimeout(timer);
  }, [isMusicReady]);

  return (
    <div
      className={`fixed inset-0 w-screen h-screen overflow-hidden z-[999] transition-opacity duration-300 ${
        showVideo ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <video
        ref={videoRef}
        src="/video/theme.mp4"
        className="w-full h-full object-cover"
        muted
        playsInline
        controls={false}
        preload="auto"
        onEnded={() => setShowVideo(false)}
      />
    </div>
  );
}

export default EditVideo;
