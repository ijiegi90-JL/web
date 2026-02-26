"use client";

import YouTube from "react-youtube";
import { Dialog, DialogContent, DialogTitle } 
from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoId: string | null;
};

export default function TrailerModal({ open, onOpenChange, videoId }: Props) {
  return (
<Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
    <DialogTitle className="sr-only">Trailer</DialogTitle>

    {videoId ? (
      <YouTube videoId={videoId} opts={{ width: "100%", height: "520", playerVars: { autoplay: 1 } }} />
    ) : (
     <div className="p-6 text-white">...</div>
    )}
  </DialogContent>
</Dialog>
  );
}
