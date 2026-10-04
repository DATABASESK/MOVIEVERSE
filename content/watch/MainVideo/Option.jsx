import { LuExpand } from "react-icons/lu";
import { FaForward, FaLightbulb } from "react-icons/fa6";
import { FaBackward } from "react-icons/fa";
import { BiCollapse } from "react-icons/bi";
import { useWatchSettingContext } from "@/context/WatchSetting";
import { useWatchContext } from "@/context/Watch";

const Option = () => {
  const { setWatchSetting, watchSetting } = useWatchSettingContext();
  const { setEpisode, setSeason, MovieInfo, episode, season, stopVideo } = useWatchContext();

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!watchSetting.fullscreen) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }
    setWatchSetting(prev => ({ ...prev, fullscreen: !prev.fullscreen }));
  };

  // Get total episodes and total seasons (assuming MovieInfo has them)
  const totalEpisodes = MovieInfo?.seasons?.[season - 1]?.episode_count || 1; // Default to 1
  const totalSeasons = MovieInfo?.seasons?.length || 1; // Default to 1

  return (
    <div className="flex justify-between bg-[#22212c] px-2 py-2 text-slate-200 text-sm max-[880px]:flex-col max-[880px]:gap-5">
      <div className="flex gap-5 max-[880px]:flex-wrap">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setWatchSetting(prev => ({ ...prev, isExpanded: !prev.isExpanded }))}
        >
          <span>{watchSetting.isExpanded ? <BiCollapse /> : <LuExpand />}</span>
          {watchSetting.isExpanded ? "Collapse" : "Expand"}
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setWatchSetting(prev => ({ ...prev, light: !prev.light }))}
        >
          <span><FaLightbulb /></span>
          Light
          <span className="text-[#e26bbd]">{watchSetting.light ? "On" : "Off"}</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setWatchSetting(prev => ({ ...prev, autoPlay: !prev.autoPlay }))}
        >
          Auto Play
          <span className="text-[#e26bbd]">{watchSetting.autoPlay ? "Off" : "On"}</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setWatchSetting(prev => ({ ...prev, autoNext: !prev.autoNext }))}
        >
          Auto Next
          <span className="text-[#e26bbd]">{watchSetting.autoNext ? "On" : "Off"}</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleFullscreen}
        >
          Fullscreen
          <span className="text-[#e26bbd]">{watchSetting.fullscreen ? "On" : "Off"}</span>
        </div>
      </div>

      <div className="flex gap-3">
        {/* Previous Episode */}
        <div
          className={`flex items-center gap-2 cursor-pointer ${episode <= 1 ? "opacity-50 pointer-events-none" : ""}`}
          onClick={() => {
            if (MovieInfo?.type === "tv" && episode > 1) {
              stopVideo();
              setEpisode(prev => prev - 1);
            }
          }}
        >
          <span><FaBackward /></span> Prev
        </div>

        {/* Next Episode */}
        <div
          className={`flex items-center gap-2 cursor-pointer ${episode >= totalEpisodes ? "opacity-50 pointer-events-none" : ""}`}
          onClick={() => {
            if (MovieInfo?.type === "tv" && episode < totalEpisodes) {
              stopVideo();
              setEpisode(prev => prev + 1);
            }
          }}
        >
          Next <span><FaForward /></span>
        </div>

        {/* Next Season */}
        <div
          className={`flex items-center gap-2 cursor-pointer ${season >= totalSeasons ? "opacity-50 pointer-events-none" : ""}`}
          onClick={() => {
            if (MovieInfo?.type === "tv" && season < totalSeasons) {
              stopVideo();
              setSeason(prev => prev + 1);
              setEpisode(1); // Reset to first episode of new season
            }
          }}
        >
          Next Season <span><FaForward /></span>
        </div>
      </div>
    </div>
  );
};

export default Option;
