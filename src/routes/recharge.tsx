import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppHeader, Field, GoldButton } from "@/components/app-shell";

export const Route = createFileRoute("/recharge")({
  head: () => ({
    meta: [
      { title: "Mobile Recharge – BS23MFS" },
      { name: "description", content: "Recharge any mobile number and earn points." },
    ],
  }),
  component: Recharge,
});

const contacts = ["Self", "Mom", "Rahim", "Tanvir"];
const operators = ["GP", "Robi", "Banglalink", "Airtel"];
const amounts = ["50", "100", "200", "300"];

const offers = [
  { icon: "1", title: "1.5 GB + 50 min", sub: "Valid 7 days", popular: true },
  { icon: "8", title: "800 MB + 100 SMS", sub: "Valid 3 days", popular: false },
];

function Recharge() {
  const [number, setNumber] = useState("");
  const [operator, setOperator] = useState("GP");
  const [amount, setAmount] = useState("100");
  const points = Number(amount || 0) / 10;

  return (
    <div className="min-h-screen bg-background pb-10">
      <AppHeader title="Mobile Recharge" />
      <div className="space-y-6 px-4 pt-5">
        <section>
          <h2 className="text-base font-bold text-foreground">Frequently recharged</h2>
          <div className="mt-3 flex gap-6">
            {contacts.map((name) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 font-bold text-primary">
                  {name.charAt(0)}
                </span>
                <span className="text-xs text-foreground">{name}</span>
              </div>
            ))}
          </div>
        </section>

        <Field label="Mobile number">
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="01XXXXXXXXX"
            className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </Field>

        <div className="grid grid-cols-4 gap-3">
          {operators.map((op) => (
            <button
              key={op}
              onClick={() => setOperator(op)}
              className={`rounded-xl py-3 text-sm font-semibold transition-colors ${
                operator === op
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3">
          {amounts.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={`rounded-xl py-3 text-sm font-semibold transition-colors ${
                amount === a
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground hover:bg-accent"
              }`}
            >
              ৳{a}
            </button>
          ))}
        </div>

        <section>
          <h2 className="text-base font-bold text-foreground">Offers for ৳{amount}</h2>
          <ul className="mt-3 space-y-3">
            {offers.map((o) => (
              <li
                key={o.title}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                  {o.icon}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{o.title}</p>
                  <p className="text-sm text-muted-foreground">{o.sub}</p>
                </div>
                {o.popular && (
                  <span className="text-xs font-semibold text-primary">Popular</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <p className="rounded-xl bg-gold/20 px-4 py-3 text-sm text-gold-foreground">
          You will earn <span className="font-bold">{points} points</span> on this recharge
          (1 point per ৳10)
        </p>

        <GoldButton>Recharge ৳{amount}</GoldButton>
      </div>
    </div>
  );
}
