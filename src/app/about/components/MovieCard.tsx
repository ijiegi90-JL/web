import Image from "next/image";
import { Movie, TMDB_IMG_W500 } from "@/lib/utils";

type Props = { movie: Movie };

export default function MovieCard({ movie }: Props) {
  const title = movie.title ?? movie.name ?? "Untitled";
  const poster = movie.poster_path ? `${TMDB_IMG_W500}${movie.poster_path}` : null;

  return (
    <div className="w-[200px] shrink-0">
      <div className="overflow-hidden rounded-xl border bg-black/20">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            width={200}
            height={300}
            className="h-[300px] w-full object-cover"
          />
        ) : (
          <div className="h-[300px] w-full grid place-items-center text-sm text-white/60">
            No poster
          </div>
        )}
      </div>

      <div className="mt-2 text-sm text-white line-clamp-1">{title}</div>
      <div className="text-xs text-white/70">{movie.vote_average.toFixed(1)}</div>
    </div>
  );
}
