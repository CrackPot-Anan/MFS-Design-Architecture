import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/app-shell";

export const Route = createFileRoute("/my-qr")({
  head: () => ({
    meta: [
      { title: "My QR – BS23MFS" },
      { name: "description", content: "Your personal BS23MFS QR code." },
    ],
  }),
  component: MyQr,
});

const SIZE = 29;

function makePattern(seed: number) {
  return Array.from({ length: SIZE }, (_, y) =>
    Array.from({ length: SIZE }, (_, x) => {
      let value = (seed ^ (x * 374761393) ^ (y * 668265263)) >>> 0;
      value = Math.imul(value ^ (value >>> 13), 1274126177);
      return ((value ^ (value >>> 16)) & 1) === 1;
    }),
  );
}

function MyQr() {
  const [pattern, setPattern] = useState<boolean[][] | null>(null);

  useEffect(() => {
    setPattern(makePattern(Math.floor(Math.random() * 0xffffffff)));
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F6F5] pb-20">
      <AppHeader title="My QR" />
      <main className="px-5 pt-8">
        <section className="rounded-3xl bg-white px-5 py-8 text-center shadow-sm">
          <p className="text-lg font-bold text-[#1D2B26]">Receive Money</p>
          <p className="mt-1 text-sm text-[#5A6A64]">Let someone scan your personal QR code</p>

          <div className="mx-auto mt-7 flex h-64 w-64 items-center justify-center rounded-2xl border border-[#DFE5E2] bg-white p-3">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label="Random QR code" className="h-full w-full">
              <rect width={SIZE} height={SIZE} fill="white" />
              {pattern?.map((row, y) => row.map((dark, x) => {
                const inFinder = (x < 8 && y < 8) || (x >= SIZE - 8 && y < 8) || (x < 8 && y >= SIZE - 8);
                if (inFinder) return null;
                return dark ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#1D2B26" /> : null;
              }))}
              {[[0, 0], [SIZE - 7, 0], [0, SIZE - 7]].map(([x, y]) => (
                <g key={`${x}-${y}`}>
                  <rect x={x} y={y} width="7" height="7" fill="#1D2B26" />
                  <rect x={Number(x) + 1} y={Number(y) + 1} width="5" height="5" fill="white" />
                  <rect x={Number(x) + 2} y={Number(y) + 2} width="3" height="3" fill="#1D2B26" />
                </g>
              ))}
            </svg>
          </div>

          <p className="mt-5 font-semibold text-[#1D2B26]">Abrar Anan</p>
          <p className="mt-1 text-sm text-[#5A6A64]">BS23MFS Wallet</p>
          <p className="mt-6 text-xs text-[#5A6A64]">This QR code is a random visual mockup.</p>
        </section>
      </main>
    </div>
  );
}
