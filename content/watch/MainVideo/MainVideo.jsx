"use client";

import { useEffect, useMemo, useRef } from "react";
import { useWatchContext } from "@/context/Watch";
import { useWatchSettingContext } from "@/context/WatchSetting";

const TheaterOverlay = () => {
  const { watchInfo, MovieInfo } = useWatchContext();
  const { watchSetting, setWatchSetting } =
    useWatchSettingContext();

  const theaterRef = useRef(null);

  const movieUrl = useMemo(
    () => watchInfo?.url || "",
    [watchInfo?.url]
  );

  const theaterUrl = useMemo(() => {
    const base =
      "/theater/theater-v22-auto-seat.html";

    if (!movieUrl) return base;

    return `${base}?movieUrl=${encodeURIComponent(
      movieUrl
    )}`;
  }, [movieUrl]);

  /*
   * Stop any HTML5 video/audio that belongs to
   * our own page.
   */
  useEffect(() => {
    if (!watchSetting?.theater) return;

    document
      .querySelectorAll("video, audio")
      .forEach((media) => {
        try {
          media.pause();
        } catch {}
      });

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [watchSetting?.theater]);

  /*
   * Ask the original movie iframe to pause.
   *
   * This is supported by the theater/player bridge
   * when the provider accepts postMessage commands.
   */
  useEffect(() => {
    if (!watchSetting?.theater) return;

    const iframe = document.querySelector(
      'iframe[title="Movie player"]'
    );

    if (!iframe?.contentWindow) return;

    try {
      iframe.contentWindow.postMessage(
        {
          type: "pause",
          action: "pause",
        },
        "*"
      );
    } catch {}
  }, [watchSetting?.theater]);

  if (!watchSetting?.theater) {
    return null;
  }

  const movieTitle =
    MovieInfo?.title ||
    MovieInfo?.name ||
    MovieInfo?.original_name ||
    MovieInfo?.original_title ||
    "Movie";

  const closeTheater = () => {
    /*
     * Tell the theater movie to pause before
     * removing the theater iframe.
     */
    try {
      theaterRef.current?.contentWindow?.postMessage(
        {
          type: "pause",
          action: "pause",
        },
        "*"
      );
    } catch {}

    setWatchSetting((prev) => ({
      ...prev,
      theater: false,
    }));
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black">

      <iframe
        ref={theaterRef}
        src={theaterUrl}
        title={`${movieTitle} 3D Theater`}
        className="w-full h-full border-0"
        allowFullScreen
        loading="eager"
        frameBorder="0"
        sandbox="allow-scripts allow-same-origin"
        allow="fullscreen; autoplay; encrypted-media; picture-in-picture; accelerometer; gyroscope"
      />

      <button
        type="button"
        onClick={closeTheater}
        aria-label="Exit 3D Theater"
        className="
          absolute
          top-3
          right-3
          z-[10000]
          h-10
          min-w-10
          rounded-full
          bg-black/70
          px-3
          text-white/90
          backdrop-blur-md
          border
          border-white/15
          hover:bg-black/90
          transition
        "
      >
        ✕
      </button>
    </div>
  );
};

export default TheaterOverlay;
