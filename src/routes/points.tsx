import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-shell";
import { FileCheck2, TreePine } from "lucide-react";

export const Route = createFileRoute("/points")({
  head: () => ({
    meta: [
      { title: "My Points – BS23MFS" },
      { name: "description", content: "Track earned points and redeem them at partner stores." },
    ],
  }),
  component: Points,
});

const gained = [
  { name: "Merchant Pay", amount: "৳250", pts: "+ 25 pts" },
  { name: "Electricity Bill", amount: "৳1,180", pts: "+ 118 pts" },
  { name: "Mobile Recharge", amount: "৳100", pts: "+ 10 pts" },
];

const partners = [
  { name: "Shwapno", offer: "500 pts = ৳50 off" },
  { name: "Apon Family Mart", offer: "800 pts = ৳100 off" },
  { name: "Unimart", offer: "600 pts = ৳75 off" },
  { name: "Lotto", offer: "1,000 pts = ৳150 off" },
  { name: "La Bamba", offer: "700 pts = ৳90 off" },
];

function Points() {
  return (
    <div className="min-h-screen bg-background pb-10">
      <AppHeader title="My Points" />
      <div className="space-y-6 px-4 pt-5">
        <div className="rounded-2xl bg-gold p-6 text-center text-gold-foreground">
          <p className="text-sm opacity-80">Total Points</p>
          <p className="mt-1 text-5xl font-extrabold">2,450</p>
          <p className="mt-2 text-xs opacity-80">
            1,530 from transactions · 920 from spins & bonus
          </p>
        </div>

        <section className="rounded-2xl border border-border bg-card p-4">
          <h2 className="font-bold text-foreground">Your paperless impact</h2>
          <p className="mt-1 text-sm text-muted-foreground">Your digital payments help reduce paper use.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-primary/5 p-3">
              <FileCheck2 className="h-5 w-5 text-primary" />
              <p className="mt-2 text-2xl font-extrabold text-foreground">128</p>
              <p className="text-xs text-muted-foreground">Paper bills saved</p>
            </div>
            <div className="rounded-xl bg-primary/5 p-3">
              <TreePine className="h-5 w-5 text-primary" />
              <p className="mt-2 text-2xl font-extrabold text-foreground">2</p>
              <p className="text-xs text-muted-foreground">Trees saved</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">Estimated demo impact from paperless bill payments.</p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">Points gained by transaction</h2>
          <ul className="mt-2 divide-y divide-border">
            {gained.map((g) => (
              <li key={g.name} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-foreground">{g.name}</p>
                  <p className="text-sm text-muted-foreground">{g.amount}</p>
                </div>
                <p className="font-bold text-primary">{g.pts}</p>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground">Redeem at partner stores</h2>
          <ul className="mt-3 space-y-3">
            {partners.map((p) => (
              <li
                key={p.name}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                  {p.name.charAt(0)}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <p className="text-sm text-muted-foreground">{p.offer}</p>
                </div>
                <Link to="/redeem" className="rounded-lg bg-gold px-4 py-2 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold/90">
                  Redeem
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
