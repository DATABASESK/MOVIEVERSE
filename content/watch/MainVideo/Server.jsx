import React, { useEffect } from "react";
import { useWatchContext } from "@/context/Watch";

const Server = () => {
  const { MovieId, setWatchInfo, watchInfo, MovieInfo, episode, season } = useWatchContext();

  // Load URLs from environment variables
  const MovieVideoPlayers = {
    //Server1: `${process.env.NEXT_PUBLIC_PIKASHOW}${MovieInfo?.imdb_id}?d=pikachu.app&sinku`,
    //Server2: `${process.env.NEXT_PUBLIC_VIDLINK}${MovieId}`,
   
   // server0: `https://www.2embed.cc/embed/${MovieId} `,
   // server1: `https://vidapi.xyz/embed/movie/${MovieId}`,
    Server3: `${process.env.NEXT_PUBLIC_VIDSRCDEV}${MovieId}`,
    Server4: `${process.env.NEXT_PUBLIC_VIDSRC_CC}${MovieId}`,
    Server5: `${process.env.NEXT_PUBLIC_VIDSRC_IN}${MovieId}`,
    Server6: `${process.env.NEXT_PUBLIC_VIDSRC_PRO}${MovieId}`,
    Server7: `${process.env.NEXT_PUBLIC_AUTOEMBED}${MovieId}`,
    Server8: `${process.env.NEXT_PUBLIC_MOVIESAPI}${MovieId}`,
    Server9: `${process.env.NEXT_PUBLIC_111MOVIES}${MovieId}`,
    Server10: `${process.env.NEXT_PUBLIC_RGSHOWS}${MovieId}`,
    Server11: `${process.env.NEXT_PUBLIC_MULTIEMBED}${MovieId}&tmdb=1`,
    Serverx: `https://ply4.com/movie/?id=${MovieId}`,
    Serverxx: `https://vidsrc.cc/v2/embed/movie/${MovieId}?autoPlay=true`,
  };

  const TVVideoPlayers = {

     animie:  `https://2anime.xyz/embed/${MovieInfo}-episode-${episode}`,
    onepiece: `https://2anime.xyz/embed/one-piece-episode-1`,
    Server0: `https://vidapi.xyz/embed/tv/${MovieId}&s=${season}&e=${episode}`,
    Server1: `${process.env.NEXT_PUBLIC_TV_VIDSRC_PRO}${MovieId}/${season}/${episode}`,
    Server2: `${process.env.NEXT_PUBLIC_TV_VIDSRC_IN}${MovieId}/${season}/${episode}`,
    Server3: `${process.env.NEXT_PUBLIC_TV_VIDSRC_ME}${MovieId}/${season}/${episode}`,
    Server4: `${process.env.NEXT_PUBLIC_TV_AUTOEMBED}${MovieId}/${season}/${episode}`,
    Server5: `${process.env.NEXT_PUBLIC_TV_MOVIESAPI}${MovieId}/${season}/${episode}`,
    Server6: `${process.env.NEXT_PUBLIC_TV_111MOVIES}${MovieId}/${season}/${episode}`,
    Server7: `${process.env.NEXT_PUBLIC_TV_VIDLINK}${MovieId}/${season}/${episode}`,
    Server8: `${process.env.NEXT_PUBLIC_TV_RGSHOWS}${MovieId}&s=${season}&e=${episode}`,
    Server9: `${process.env.NEXT_PUBLIC_TV_SK}${MovieInfo?.imdb_id}?d=pikachu.app&?sinku&noseasons=${season}&noepisodes=${episode}`,
    serverx:`https://vidsrc.cc/v2/embed/tv/${MovieId}?autoPlay=true`,
  };

  const MovievideoPlayerEntry = Object.entries(MovieVideoPlayers);
  const TVVideoPlayerEntry = Object.entries(TVVideoPlayers);

  const changeServer = async (item) => {
    setWatchInfo({ loading: true });

    if (item) {
      setWatchInfo({
        url: item[1],
        iframe: true,
        loading: false,
      });
    }
  };

  useEffect(() => {
    const setDefault = () => {
      setWatchInfo({ loading: true });
      setWatchInfo({
        url: MovieInfo?.type === "tv" ? TVVideoPlayerEntry[0][1] : MovievideoPlayerEntry[0][1],
        iframe: true,
        loading: false,
      });
    };

    setDefault();
  }, [MovieInfo]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Plain White "Select an Server" Header */}
      <div className="server-header">
        Select a Server
      </div>

      {/* Server Selection Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {(MovieInfo?.type === "movie" ? MovievideoPlayerEntry : TVVideoPlayerEntry)?.map((item, index) => (
          <div
            key={item[0]}
            onClick={() => changeServer(item)}
            className={`server-button ${watchInfo?.url === item[1] ? "selected" : ""}`}
          >
            {item[0]}
          </div>
        ))}
      </div>

      {/* CSS Styling */}
      <style jsx>{`
        /* Plain White "Select a Server" Header */
        .server-header {
          color: white;
          font-size: 20px;
          font-weight: bold;
          text-align: center;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
          margin-bottom: 10px;
        }

        /* Glowing Gradient Buttons */
        .server-button {
          background: linear-gradient(45deg, #ff0080, #8000ff);
          box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
          color: #fff;
          padding: 10px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: bold;
          transition: all 0.3s ease;
          text-align: center;
          font-size: 16px;
          border: 2px solid rgba(255, 255, 255, 0.6);
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
        }

        /* Button Hover Effect */
        .server-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
        }

        /* Selected Button Effect */
        .server-button.selected {
          box-shadow: 0px 0px 15px 5px rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(255, 255, 255, 0.9);
        }
      `}</style>
    </div>
  );
};

export default Server;
