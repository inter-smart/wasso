"use client";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    if (!isVideoReady) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isVideoReady]);

  if (!isLoading) return null;

  return (
    <div
      className="page-loader fixed inset-0 z-[99999] flex items-center justify-center bg-black"
      style={{ animation: "pageLoaderExit 1s cubic-bezier(0.76, 0, 0.24, 1) forwards" }}
    >
      <div
        className="relative z-10 page-loader-content"
        style={{ animation: "pageLoaderFadeIn 0.8s ease-out" }}
      >
        <video
          src="/videos/wasso-page-loader.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPlaying={() => setIsVideoReady(true)}
          className="max-w-[320px] object-contain"
        />
      </div>
    </div>
  );
}
