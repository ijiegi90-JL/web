import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Movie = {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
};

export const TMDB_IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";
export const TMDB_IMG_W500 = "https://image.tmdb.org/t/p/w500";