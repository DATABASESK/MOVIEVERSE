import { useWatchContext } from "@/context/Watch";
import { useWatchSettingContext } from "@/context/WatchSetting";

import VideoPlayerContainer from "./VideoPlayerContainer";
import TheaterExperience from "../TheaterExperience";

const VideoPlayer = ({ getInstance }) => {
  const { watchInfo, MovieInfo } = useWatchContext();
  const { watchSetting } = useWatchSettingContext();

  if (watchSetting?.theaterOpen) {
    return <TheaterExperience />;
  }

  return watchInfo?.iframe ? (
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
  ) : (
    <VideoPlayerContainer getInstance={getInstance} />
  );
};

export default VideoPlayer;
