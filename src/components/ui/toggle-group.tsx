"use client";

import * as React from "react";

type Ctx = {
  value: string[];
  onChange: (next: string[]) => void;
  type: "single" | "multiple";
};

const ToggleCtx = React.createContext<Ctx | null>(null);

export function ToggleGroup({
  type = "multiple",
  value,
  onValueChange,
  className = "",
  children,
}: {
  type?: "single" | "multiple";
  value: string[];
  onValueChange: (v: string[]) => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ToggleCtx.Provider value={{ value, onChange: onValueChange, type }}>
      <div className={className}>{children}</div>
    </ToggleCtx.Provider>
  );
}

export function ToggleGroupItem({
  value,
  className = "",
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(ToggleCtx);
  if (!ctx) throw new Error("ToggleGroupItem must be used within ToggleGroup");

  const active = ctx.value.includes(value);

  const toggle = () => {
    if (ctx.type === "single") {
      ctx.onChange(active ? [] : [value]);
      return;
    }
    if (active) ctx.onChange(ctx.value.filter((v) => v !== value));
    else ctx.onChange([...ctx.value, value]);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`border border-white/15 text-sm px-3 py-2 rounded-full transition ${
        active ? "bg-white text-black" : "bg-transparent text-white hover:bg-white/10"
      } ${className}`}
    >
      {children}
    </button>
  );
}