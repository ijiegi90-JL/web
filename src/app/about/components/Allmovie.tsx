import Link from "next/link";
import MovieCard from "./MovieCard";
import { tmdbFetch } from "@/lib/tmdb";
import { Movie } from "@/lib/utils";

type ListResponse = { results: Movie[] };

async function fetchCategory(category: string) {
  return tmdbFetch<ListResponse>(`/movie/${category}?language=en-US&page=1`);
}

function Section({
  title,
  href,
  movies,
}: {
  title: string;
  href: string;
  movies: Movie[];
}) {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold">{title}</h2>
        <Link href={href} className="text-sm text-white/70 hover:text-white">
          See more →
        </Link>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
}

export default async function Allmovie() {
  const [upcoming, popular, topRated] = await Promise.all([
    fetchCategory("upcoming"),
    fetchCategory("popular"),
    fetchCategory("top_rated"),
  ]);

  return (
    <div>
      <Section title="Upcoming" href="/category/upcoming" movies={upcoming.results.slice(0, 12)} />
      <Section title="Popular" href="/category/popular" movies={popular.results.slice(0, 12)} />
      <Section title="Top Rated" href="/category/top_rated" movies={topRated.results.slice(0, 12)} />
    </div>
  );
}
