"use client";

import { useEffect, useMemo } from "react";
import { useWatchContext } from "@/context/Watch";
import { useWatchSettingContext } from "@/context/WatchSetting";

const TheaterOverlay = () => {
  const {
    watchInfo,
    MovieInfo,
  } = useWatchContext();

  const {
    watchSetting,
    setWatchSetting,
  } = useWatchSettingContext();

  /*
   * This is the URL of the server currently selected
   * in your normal movie player.
   */
  const movieUrl = useMemo(() => {
    return watchInfo?.url || "";
  }, [watchInfo?.url]);

  /*
   * Send the current movie/server URL to the theater.
   */
  const theaterUrl = useMemo(() => {
    const baseUrl =
      "/theater/theater-v22-auto-seat.html";

    if (!movieUrl) {
      return baseUrl;
    }

    return `${baseUrl}?movieUrl=${encodeURIComponent(
      movieUrl
    )}`;
  }, [movieUrl]);

  /*
   * Prevent the page behind the theater from scrolling.
   */
  useEffect(() => {
    if (!watchSetting?.theater) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
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
    setWatchSetting((prev) => ({
      ...prev,
      theater: false,
    }));
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black">

      <iframe
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
        aria-label="Exit 3D Theater"
        onClick={closeTheater}
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
