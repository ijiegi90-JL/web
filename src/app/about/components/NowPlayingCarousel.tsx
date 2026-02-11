"use client";

import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Movie } from "@/lib/utils";
import { getMovieTrailer } from "@/lib/getMovieTrailer";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CarouselMovieContent from "./Carousel";
import TrailerModal from "./TrailerModal";

export default function NowPlayingCarousel({ movies }: { movies: Movie[] }) {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [open, setOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleWatchTrailer = async (movieId: number) => {
    setLoading(true);
    setVideoId(null);
    setOpen(true);
    try {
      const key = await getMovieTrailer(movieId);
      setVideoId(key);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[autoplay.current]}
        className="w-full"
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie.id}>
              <CarouselMovieContent
                movie={movie}
                onWatchTrailer={() => handleWatchTrailer(movie.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-3 bg-black/50 text-white hover:bg-black/70" />
        <CarouselNext className="right-3 bg-black/50 text-white hover:bg-black/70" />
      </Carousel>

      <TrailerModal
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) setVideoId(null);
        }}
        videoId={videoId}
      />

      {open && loading && (
        <div className="fixed inset-0 z-[60] grid place-items-center pointer-events-none">
          <div className="rounded-md bg-black/70 px-4 py-2 text-sm text-white">
            Loading trailer...
          </div>
        </div>
      )}
    </div>
  );
}