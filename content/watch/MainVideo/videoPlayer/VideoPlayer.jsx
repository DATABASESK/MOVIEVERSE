import { useWatchContext } from '@/context/Watch';
import VideoPlayerContainer from './VideoPlayerContainer';

const VideoPlayer = ({ getInstance }) => {
  const { watchInfo, MovieInfo } = useWatchContext()
  return watchInfo?.iframe ?
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
    : <VideoPlayerContainer getInstance={getInstance} />;
};

export default VideoPlayer;
