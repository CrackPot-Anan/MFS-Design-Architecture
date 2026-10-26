import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Zap,
  Flame,
  Droplet,
  Wifi,
  GraduationCap,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";
import { AppHeader } from "@/components/app-shell";

export const Route = createFileRoute("/pay-bill")({
  head: () => ({
    meta: [
      { title: "Pay Bill – BS23MFS" },
      { name: "description", content: "Pay electricity, gas, water and other bills." },
    ],
  }),
  component: PayBill,
});

const frequent = [
  { letter: "E", number: "Desc1631434234", name: "Abrar Anan Raiyan" },
  { letter: "G", number: "Dot83425435", name: "Abrar Anan Raiyan" },
];

const categories = [
  { label: "Electricity", icon: Zap },
  { label: "Gas", icon: Flame },
  { label: "Water", icon: Droplet },
  { label: "Internet", icon: Wifi },
  { label: "Education", icon: GraduationCap },
  { label: "Others", icon: MoreHorizontal },
];

const billers = [
  { id: "desco", name: "Desco", subtitle: "Electricity", icon: Zap },
  { id: "titas", name: "Titas Gas", subtitle: "Gas", icon: Flame },
  { id: "wasa", name: "Wasa", subtitle: "Water", icon: Droplet },
  { id: "dotinternet", name: "Dot Internet", subtitle: "Internet", icon: Wifi },
];

function PayBill() {
  return (
    <div className="min-h-screen bg-[#F4F6F5] pb-10">
      <AppHeader title="Pay Bill" />
      <div className="space-y-6 px-4 pt-5">
        <section>
          <h2 className="text-[17px] font-bold text-[#1D2B26]">Frequently paid</h2>
          <ul className="mt-3 space-y-3">
            {frequent.map((f) => (
              <li
                key={f.number}
                className="flex items-center gap-3 rounded-2xl border border-[#DFE5E2] bg-card p-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#33564B] font-bold text-primary-foreground">
                  {f.letter}
                </span>
                <div>
                  <p className="font-semibold text-[#1D2B26]">{f.number}</p>
                  <p className="text-sm text-[#5A6A64]">{f.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[#1D2B26]">All categories</h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const to = (cat as { to?: string }).to;
              const inner = (
                <>
                  <Icon className="h-6 w-6 stroke-[1.8] text-[#33564B]" />
                  <span className="text-sm text-[#1D2B26]">{cat.label}</span>
                </>
              );
              const cls =
                "flex min-h-[84px] flex-col items-center justify-center gap-2 rounded-2xl border border-[#DFE5E2] bg-card py-5";
              return to ? (
                <Link key={cat.label} to={to} className={cls}>
                  {inner}
                </Link>
              ) : (
                <button key={cat.label} type="button" className={cls} aria-label={cat.label}>
                  {inner}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[#1D2B26]">Billers</h2>
          <div className="mt-3 space-y-2">
            {billers.map(({ id, name, subtitle, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className="flex w-full items-center gap-3 rounded-2xl border border-[#DFE5E2] bg-card p-3 text-left"
                aria-label={`${name} ${subtitle}`}
                // TODO: wire to biller payment flow; reuse existing category/frequent navigation
                onClick={() => {}}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#33564B]">
                  <Icon className="h-5 w-5 stroke-[1.8] text-white" />
                </span>
                <div className="flex-1">
                  <p className="font-bold text-[#1D2B26]">{name}</p>
                  <p className="text-sm text-[#5A6A64]">{subtitle}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-[#5A6A64]" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
