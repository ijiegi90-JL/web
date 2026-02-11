"use client";

import Image from "next/image";
import type { Movie } from "@/lib/utils";
import { TMDB_IMG_ORIGINAL } from "@/lib/utils";

type Props = {
  movie: Movie;
  onWatchTrailer: () => void;
};

export default function CarouselMovieContent({ movie, onWatchTrailer }: Props) {
  const title = movie.title ?? movie.name ?? "Untitled";


  const bg = movie.backdrop_path
    ? `${TMDB_IMG_ORIGINAL}${movie.backdrop_path}`
    : null;

  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";

  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl">
      {bg ? (
        <Image
          src={bg}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-black/40" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />

      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
        <p className="text-sm uppercase tracking-widest opacity-80">
          Now Playing
        </p>

        <h1 className="text-4xl font-bold mt-2">{title}</h1>

        <p className="mt-2 text-sm opacity-80">{rating} / 10</p>

        <p className="mt-3 max-w-xl line-clamp-4 opacity-90">
          {movie.overview ?? "No overview available."}
        </p>

        <button
          onClick={onWatchTrailer}
          className="mt-6 w-fit px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition"
        >
          Watch Trailer
        </button>
      </div>
    </div>
  );
}