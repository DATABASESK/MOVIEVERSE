"use client";

import Card from "@/components/Cards/Card/Card";
import { getRecentTamilMovies } from "@/lib/MoviesFunctions";
import { useEffect, useState } from "react";

const RecentTamil = () => {
  const [page, setPage] = useState(1);
  const [tamilMovies, setTamilMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await getRecentTamilMovies(page);

      if (data.length > 0) {
        setTamilMovies((prev) => [...prev, ...data]); // Append new movies
      }

      setLoading(false);
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 mt-32 max-[1270px]:mt-10">
      <h1 className="text-[#ffffffbd] font-medium text-2xl font-['poppins']">
        | Recently Released Tamil Movies
      </h1>

      <div className="mt-8 grid grid-auto-fit gap-3">
        {tamilMovies.length > 0 ? (
          tamilMovies.map((item, index) => <Card data={item} key={index} />)
        ) : (
          !loading && <p className="text-gray-400">No movies found.</p>
        )}

        {loading &&
          Array(20)
            .fill(0)
            .map((_, index) => <Card key={index} loading />)}
      </div>

      <div className="mt-8 w-full flex justify-center">
        {!loading && (
          <div
            className="bg-[#22212c] hover:bg-[#2d2c3e] cursor-pointer w-full max-w-96 text-center py-2 rounded-lg text-slate-200"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTamil;
