import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppHeader, GoldButton } from "@/components/app-shell";

export const Route = createFileRoute("/spin")({
  head: () => ({
    meta: [
      { title: "Spin & Win – BS23MFS" },
      { name: "description", content: "Spin the wheel daily and win points." },
    ],
  }),
  component: Spin,
});

const segments = [
  { label: "50 pts", gold: false },
  { label: "10 pts", gold: true },
  { label: "Try again", gold: false },
  { label: "100 pts", gold: true },
  { label: "20 pts", gold: false },
  { label: "5 pts", gold: true },
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function Wheel({ rotation }: { rotation: number }) {
  const seg = 360 / segments.length;
  return (
    <svg
      viewBox="0 0 200 200"
      className="mx-auto h-64 w-64"
      style={{ transform: `rotate(${rotation}deg)`, transition: "transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)" }}
    >
      <circle cx="100" cy="100" r="98" fill="var(--color-deep)" />
      {segments.map((s, i) => {
        const a1 = i * seg;
        const a2 = (i + 1) * seg;
        const p1 = polar(100, 100, 92, a1);
        const p2 = polar(100, 100, 92, a2);
        const mid = a1 + seg / 2;
        return (
          <g key={s.label}>
            <path
              d={`M100,100 L${p1.x.toFixed(2)},${p1.y.toFixed(2)} A92,92 0 0 1 ${p2.x.toFixed(2)},${p2.y.toFixed(2)} Z`}
              fill={s.gold ? "var(--color-gold)" : "var(--color-primary)"}
              stroke="var(--color-deep)"
              strokeWidth="1"
            />
            <text
              x="100"
              y="34"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill={s.gold ? "var(--color-gold-foreground)" : "var(--color-primary-foreground)"}
              transform={`rotate(${mid} 100 100)`}
            >
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Spin() {
  const [rotation, setRotation] = useState(0);
  const [spun, setSpun] = useState(false);

  const spin = () => {
    if (spun) return;
    setSpun(true);
    setRotation((r) => r + 360 * 4 + Math.floor(Math.random() * 6) * 60 + 30);
  };

  return (
    <div className="min-h-screen bg-background pb-10">
      <AppHeader title="Spin & Win" />
      <div className="space-y-6 px-4 pt-6">
        <p className="text-center text-foreground">
          {spun ? "No free spins left today" : "You have 1 free spin today"}
        </p>

        <div className="relative">
          <div
            className="absolute -top-1 left-1/2 z-10 h-0 w-0 -translate-x-1/2"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "16px solid var(--color-deep)",
            }}
          />
          <Wheel rotation={rotation} />
        </div>

        <GoldButton onClick={spin} disabled={spun}>
          {spun ? "SPUN!" : "SPIN NOW"}
        </GoldButton>

        <p className="text-center text-sm text-muted-foreground">
          Win points and redeem them for rewards
        </p>
      </div>
    </div>
  );
}
