import { NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ movieId: string }> }
) {
  const { movieId } = await ctx.params; 

  const token = process.env.TMDB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { key: null, error: "TMDB_TOKEN missing" },
      { status: 500 }
    );
  }

  const url = `${TMDB_BASE}/movie/${movieId}/videos?language=en-US`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { key: null, error:` TMDB ${res.status}: ${text}` },
      { status: res.status }
    );
  }

  const data = await res.json();

  const youtube = (data.results ?? []).filter(
    (v: any) => v.site === "YouTube"
  );

  const best =
    youtube.find((v: any) => v.type === "Trailer" && v.official) ||
    youtube.find((v: any) => v.type === "Trailer") ||
    youtube[0];

  return NextResponse.json({ key: best?.key ?? null });
}