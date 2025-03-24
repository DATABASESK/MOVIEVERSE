"use client";

import Card from "@/components/Cards/Card/Card";

import { getTopKidsTVSeriesGlobal } from "@/lib/TVfunctions"; // ✅ Ensure this is correct

import { useEffect, useState } from "react";

const TopKidsTVSeries = () => {
  const [page, setPage] = useState(1);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSeries = async () => {
      setLoading(true);
      const data = await getTopKidsTVSeriesGlobal(page);

      if (data.length > 0) {
        setSeries((prev) => [...prev, ...data]); // Append new series
      }

      setLoading(false);
    };

    fetchSeries();
  }, [page]);

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 mt-32 max-[1270px]:mt-10">
      <h1 className="text-[#ffffffbd] font-medium text-2xl font-['poppins']">
        | Top Kids TV Shows
      </h1>

      <div className="mt-8 grid grid-auto-fit gap-3">
        {series.length > 0 ? (
          series.map((item, index) => <Card data={item} key={index} />)
        ) : (
          !loading && <p className="text-gray-400">No series found.</p>
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

export default TopKidsTVSeries;
