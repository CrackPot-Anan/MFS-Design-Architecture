import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditCard,
  Send,
  ReceiptText,
  Plus,
  Star,
  Gift,
  Gamepad2,
  Target,
  Banknote,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BS23MFS – Home" },
      { name: "description", content: "Your BS23MFS wallet: balance, quick actions and recent activity." },
    ],
  }),
  component: Index,
});

const tiles = [
  { label: "Merchant Pay", icon: CreditCard, to: "/merchant-pay" },
  { label: "Send Money", icon: Send, to: "/send-money" },
  { label: "Pay Bill", icon: ReceiptText, to: "/pay-bill" },
  { label: "Add Money", icon: Plus },
  { label: "Cash Out", icon: Banknote, to: "/cash-out" },
  { label: "My Points", icon: Star, to: "/points" },
  { label: "Redeem", icon: Gift, to: "/points" },
  { label: "Games", icon: Gamepad2, to: "/games" },
  { label: "Spin & Win", icon: Target, to: "/spin" },
];

const activity = [
  { name: "Merchant Payment", date: "Today, 10:42 AM", amount: "- ৳250", positive: false },
  { name: "Add Money", date: "Yesterday", amount: "+ ৳2,000", positive: true },
  { name: "Electricity Bill", date: "Oct 22", amount: "- ৳1,180", positive: false },
];

function Index() {
  return (
    <div className="min-h-screen bg-background pb-10">
      <header className="sticky top-0 z-10 bg-primary px-4 py-5 text-primary-foreground">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm opacity-80">Welcome back</p>
            <p className="text-xl font-bold">Abrar Anand</p>
          </div>
          <p className="text-lg font-extrabold tracking-tight">
            BS23<span className="text-gold">MFS</span>
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-deep p-4">
          <div>
            <p className="text-sm opacity-80">Available Balance</p>
            <p className="mt-1 text-3xl font-extrabold">৳ 12,480.00</p>
          </div>
          <span className="rounded-full bg-gold px-4 py-2 text-sm font-bold text-gold-foreground">
            2,450 pts
          </span>
        </div>
      </header>

      <div className="grid grid-cols-4 gap-y-6 px-4 py-6">
        {tiles.map(({ label, icon: Icon, to }) => {
          const inner = (
            <>
              <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-card">
                <Icon className="h-6 w-6 text-primary" />
              </span>
              <span className="text-center text-[11px] font-medium leading-tight text-foreground">
                {label}
              </span>
            </>
          );
          const cls = "flex flex-col items-center gap-2";
          return to ? (
            <Link key={label} to={to} className={cls}>
              {inner}
            </Link>
          ) : (
            <button key={label} className={cls}>
              {inner}
            </button>
          );
        })}
      </div>

      <section className="px-4">
        <h2 className="text-lg font-bold text-foreground">Recent Activity</h2>
        <ul className="mt-2 divide-y divide-border">
          {activity.map((a) => (
            <li key={a.name} className="flex items-center justify-between py-4">
              <div>
                <p className="font-semibold text-foreground">{a.name}</p>
                <p className="text-sm text-muted-foreground">{a.date}</p>
              </div>
              <p className={`font-bold ${a.positive ? "text-primary" : "text-foreground"}`}>
                {a.amount}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
