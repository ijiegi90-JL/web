import { tmdbFetch } from "@/lib/tmdb";
import { Movie } from "@/lib/utils";
import NowPlayingCarousel from "./NowPlayingCarousel";

type ListResponse = { results: Movie[] };

export default async function NowPlaying() {
  const data = await tmdbFetch<ListResponse>("/movie/now_playing?language=en-US&page=1");
  const movies = data.results?.slice(0, 10) ?? [];

  return (
    <div className="mt-6">
      <div className="font-semibold text-white mb-3">Now Playing</div>
      <NowPlayingCarousel movies={movies} />
    </div>
  );
}