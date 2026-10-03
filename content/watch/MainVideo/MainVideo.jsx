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

      <div className="h-full min-h-[124px] bg-[#484460] text-slate-100 flex rounded-md overflow-hidden mt-4 shadow-[3px_13px_29px_0px_#48455fbd] max-[880px]:flex-col">
        
        <Server />
      </div>

    </div>
  )
}

export default MainVideo
