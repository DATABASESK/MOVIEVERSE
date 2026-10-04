"use client"

import { useWatchContext } from "@/context/Watch";

import Option from "./Option"
import Server from "./Server";

const MainVideo = () => {
  const { watchInfo, MovieInfo, episode } = useWatchContext();

  return (
    <div className="w-full bg-[#22212c] rounded-md p-2 !pb-0 flex flex-col">

      <iframe
        src={watchInfo?.url}
        className="aspect-video"
        allowFullScreen
        loading="lazy"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={MovieInfo?.title || MovieInfo?.name || MovieInfo?.original_name || MovieInfo?.original_title}
      />
  src={watchInfo?.url}
  className="aspect-video w-full"
  allowFullScreen
  loading="lazy"
  frameBorder="0"
  sandbox="allow-scripts allow-same-origin"
  allow="fullscreen; autoplay; encrypted-media; picture-in-picture"
  title={
    MovieInfo?.title ||
    MovieInfo?.name ||
    MovieInfo?.original_name ||
    MovieInfo?.original_title
  }
/>

      <Option />
