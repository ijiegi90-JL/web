const TMDB_BASE = "https://api.themoviedb.org/3";

function getToken() {
  const token = process.env.TMDB_TOKEN
  if (!token) throw new Error("TMDB_TOKEN is missing in .env");
  return token;
}

export async function tmdbFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${TMDB_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },

    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB error ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}
