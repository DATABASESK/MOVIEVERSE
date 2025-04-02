"use client"
import Image from "next/image";
import styles from "./TrendingCard.module.css";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { Totalgenres } from "@/utils/Genres";

const TrendingCard = ({ info }) => {
  // Ignore "person" media type
  if (info?.media_type === "person") return null;

  // Ensure media type is properly formatted
  const formattedMediaType = info?.media_type
    ? info.media_type.charAt(0).toUpperCase() + info.media_type.slice(1).toLowerCase()
    : "Movie";

  // Find Genre Name safely
  const genreName = info?.genre_ids?.length
    ? Totalgenres.find((g) => g.id === info.genre_ids[0])?.name || "Unknown"
    : "Unknown";

  return (
    <Link
      href={`/watch/${info?.id}?media_type=${info?.media_type || "movie"}`}
      className={`${styles?.cardImage} w-full aspect-[9/14] rounded-2xl relative overflow-hidden cursor-pointer group`}
    >
      {/* Handle missing images */}
      <Image
        src={info?.poster_path ? `https://image.tmdb.org/t/p/w500${info.poster_path}` : "/placeholder.jpg"}
        alt={info?.title || info?.name || "Trending"}
        width={200}
        height={280}
        quality={100}
        className="object-cover w-full h-full rounded-2xl hover:cursor-pointer"
      />

      {/* Rating Display */}
      {info?.vote_average !== undefined && (
        <div className={`${styles.rating} absolute top-0 left-0 bg-[#21212c] w-[60%] rounded-br-lg rounded-tl-md flex items-center justify-center gap-2 text-white h-10`}>
          <FaStar />
          <span>{info.vote_average.toFixed(1)}</span>
        </div>
      )}

      {/* Title and Genre */}
      <div className="absolute bottom-0 left-0 pl-[8px] pb-2 z-10 opacity-100 group-hover:opacity-0 transition">
        <h1 className="text-[#ffffffd1] font-medium text-md font-['poppins'] w-[186px] line-clamp-1 text-ellipsis overflow-hidden cursor-pointer">
          {info?.title || info?.name || "Untitled"}
        </h1>
        <span className="text-[#ffffffb0] text-sm">
          {formattedMediaType}, {genreName}
        </span>
      </div>
    </Link>
  );
};

export default TrendingCard;
