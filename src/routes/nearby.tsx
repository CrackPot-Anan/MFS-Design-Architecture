import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-shell";

export const Route = createFileRoute("/nearby")({
  head: () => ({
    meta: [
      { title: "Nearby Cash Out & ATMs – BS23MFS" },
      { name: "description", content: "Find nearby cash out agents and ATMs on the map." },
    ],
  }),
  component: Nearby,
});

const places = [
  { name: "Hasan Telecom", sub: "Agent · Dhanmondi · 0.4 km", type: "agent" },
  { name: "City Bank ATM", sub: "ATM · Open 24h · 0.6 km", type: "atm" },
  { name: "Sarker Store", sub: "Agent · Mirpur · 1.1 km", type: "agent" },
  { name: "BRAC Bank ATM", sub: "ATM · Open 24h · 1.4 km", type: "atm" },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Agents", value: "agent" },
  { label: "ATMs", value: "atm" },
];

function Nearby() {
  const [filter, setFilter] = useState("all");
  const list = places.filter((p) => filter === "all" || p.type === filter);

  return (
    <div className="min-h-screen bg-background pb-10">
      <AppHeader title="Nearby Cash Out & ATMs" />
      <div className="space-y-5 px-4 pt-5">
        <div className="relative h-44 overflow-hidden rounded-xl border border-border bg-card p-1">
          <div className="grid h-full grid-cols-3 grid-rows-2 gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded bg-secondary" />
            ))}
          </div>
          <span className="absolute left-[20%] top-[30%] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            A
          </span>
          <span className="absolute left-[58%] top-[16%] flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-xs font-bold text-gold-foreground">
            M
          </span>
          <span className="absolute left-[28%] top-[68%] flex h-8 w-8 items-center justify-center rounded-lg bg-gold text-xs font-bold text-gold-foreground">
            M
          </span>
          <span className="absolute left-[80%] top-[62%] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            A
          </span>
          <span className="absolute left-[48%] top-[45%] h-4 w-4 rounded-full bg-foreground" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full py-3 text-sm font-semibold transition-colors ${
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {list.map((p) => (
            <li
              key={p.name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {p.name.charAt(0)}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.sub}</p>
              </div>
              <button className="rounded-lg bg-gold px-4 py-2 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold/90">
                Go
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
