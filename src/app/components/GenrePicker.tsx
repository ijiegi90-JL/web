
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Drama",
  "Documentary",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Thriller",
  "War",
  "Western",
];

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
};

export default function GenrePicker({ value, onChange }: Props) {
  const label = value.length === 0 ? "Genres" : `Genres (${value.length})`;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          {label}
          {value.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {value.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[520px] p-4" align="start">
        <div className="mb-2 text-sm font-semibold">Genres</div>
        <div className="mb-3 text-sm text-muted-foreground">
          See lists of movies by genre
        </div>

        <ToggleGroup
          type="multiple"
          value={value}
          onValueChange={(v) => onChange(v)}
          className="flex flex-wrap justify-start gap-2"
        >
          {GENRES.map((g) => (
            <ToggleGroupItem key={g} value={g} className="h-8 px-3 rounded-full">
              {g}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        {value.length > 0 && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {value.slice(0, 6).map((g) => (
                <Badge key={g} variant="secondary">
                  {g}
                </Badge>
              ))}
              {value.length > 6 && (
                <Badge variant="secondary">+{value.length - 6}</Badge>
              )}
            </div>

            <Button variant="ghost" onClick={() => onChange([])}>
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}