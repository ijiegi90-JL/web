import MovieCard from "@/app/about/components/MovieCard";
import { tmdbFetch } from "@/lib/tmdb";
import { Movie } from "@/lib/utils";

type ListResponse = { results: Movie[] };

const allowed = new Set(["popular", "upcoming", "top_rated", "now_playing"]);

export default async function MovieCategoryPage({
  params,
}: {
  params: { movieCategory: string };
}) {
  const category = params.movieCategory;

  if (!allowed.has(category)) {
    return (
      <div className="p-6 text-white">
        Category not found: <span className="text-white/70">{category}</span>
      </div>
    );
  }

  const data = await tmdbFetch<ListResponse>(`/movie/${category}?language=en-US&page=1`);
  const movies = data.results ?? [];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-white capitalize">{category.replace("_", " ")}</h1>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}

