import { tmdbFetch } from "./tmdb";

type VideosResponse = {
  results: Array<{
    id: string;
    key: string;
    name: string;
    site: "YouTube";
    type: "Trailer" | "Teaser" | "Clip";
    official: boolean;
  }>;
};

export async function getMovieTrailer(
  movieId: number
){const res = await fetch(`/api/trailer/${movieId}`);
if (!res.ok) return null;
const data=await res.json();
return data.key as string|null}

 