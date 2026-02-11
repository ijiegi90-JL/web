"use client";

import * as React from "react";

type Align = "start" | "center" | "end";

type Ctx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

const PopoverContext = React.createContext<Ctx | null>(null);

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  // click outside -> close
  React.useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!open) return;
      const t = e.target as Node;

      const inTrigger = triggerRef.current?.contains(t);
      const inContent = contentRef.current?.contains(t);

      if (!inTrigger && !inContent) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef, contentRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({
  children,
  asChild,
}: {
  children: React.ReactElement<any>;
  asChild?: boolean;
}) {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error("PopoverTrigger must be inside Popover");

  const child = React.Children.only(children);

  const prevOnClick = (child.props as any)?.onClick as
    | ((e: any) => void)
    | undefined;

  const mergedProps = {
    ref: (node: HTMLElement | null) => {
      ctx.triggerRef.current = node;
      const childRef = (child as any).ref;
      if (typeof childRef === "function") childRef(node);
      else if (childRef && typeof childRef === "object") childRef.current = node;
    },
    onClick: (e: any) => {
      prevOnClick?.(e);
      ctx.setOpen(!ctx.open);
    },
  };

  if (asChild) return React.cloneElement(child, mergedProps);


  return (
    <button type="button" {...mergedProps}>
      {children}
    </button>
  );
}

export function PopoverContent({
  children,
  className = "",
  align = "center",
  sideOffset = 8,
}: {
  children: React.ReactNode;
  className?: string;
  align?: Align;
  sideOffset?: number;
}) {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) throw new Error("PopoverContent must be inside Popover");
  if (!ctx.open) return null;

  const base =
    "absolute z-50 mt-2 rounded-xl border border-white/10 bg-black/80 text-white shadow-xl backdrop-blur";

  const alignClass =
    align === "start"
      ? "left-0"
      : align === "end"
      ? "right-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <div
      ref={(node) => {
        ctx.contentRef.current = node;
      }}
      style={{ marginTop: sideOffset }}
      className={`${base} ${alignClass} ${className}`}
    >
      {children}
    </div>
  );
}