import ScrollRestoration from "@/components/ScrollRestoration";
import Collection from "@/content/Home/Collection";
import Herosection from "@/content/Home/HeroSection/Herosection";
import Popular from "@/content/Home/Popular";
import TopRated from "@/content/Home/Season";
import Trending from "@/content/Home/Trending";
import WatchHistory from "@/content/Home/WatchHistory";
import Tamil from "@/content/Home/Tamil";
import Horror from "@/content/Home/Horror";
import Romantic from "@/content/Home/Romantic";
import RecentTamil from "@/content/Home/RecentTamil";
import TopNetflixSeries from "@/content/Home/TopNetflixSeries";
import FantasyMovies from "@/content/Home/FantasyMovies";
import MarvelMovies from "@/content/Home/MarvelMovies";
import TopKidsTVSeries from "@/content/Home/TopKidsTVSeries";

// ✅ Fetch functions from different files
import { 
  getTrendingMovies, 
  getTopRatedMovies, 
  getTamilTrendingMovies, 
  getHorrorMovies, 
  getRomanticMovies, 
  getRecentTamilMovies,
  getFantasyMovies, 
  getMcuMovies 
} from "@/lib/MoviesFunctions";

import { getTopNetflixSeriesGlobal } from "@/lib/TVfunctions";
import { getTopKidsTVSeriesGlobal } from "@/lib/TVfunctions";

const Home = async () => {
  const [
    trendingdata, 
    top_rateddata, 
    tamilMovies, 
    horrorMovies, 
    romanticMovies, 
    recentTamilMovies,
    topNetflixSeries, 
    fantasyMovies, 
    marvelMovies,
    topKidsTVSeries // ✅ Added this variable for kids TV shows
  ] = await Promise.all([
    getTrendingMovies(),
    getTopRatedMovies(),
    getTamilTrendingMovies(),
    getHorrorMovies(),
    getRomanticMovies(),
    getRecentTamilMovies(),
    getTopNetflixSeriesGlobal(), // ✅ Correctly fetching Netflix series
    getFantasyMovies(),
    getMcuMovies(),
    getTopKidsTVSeriesGlobal() // ✅ Fetching kids TV shows
  ]);

  return (
    <ScrollRestoration> 
      <Herosection data={trendingdata} />

      <div className="w-full flex flex-col items-center z-10 relative main-responsive space-y-16 mt-16">
        <Trending data={trendingdata} />
        <TopNetflixSeries data={topNetflixSeries} />
        <RecentTamil data={recentTamilMovies} />
        <MarvelMovies data={marvelMovies} />
        <WatchHistory />
        <FantasyMovies data={fantasyMovies} />
        <Collection />
        <Popular />
        <TopRated data={top_rateddata} />
        <Tamil data={tamilMovies} />
        <Horror data={horrorMovies} />
        <Romantic data={romanticMovies} />
        <TopKidsTVSeries data={topKidsTVSeries} /> {/* ✅ Added kids TV series here */}
      </div>

      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-full"></div>
    </ScrollRestoration>
  );
};

export default Home;
