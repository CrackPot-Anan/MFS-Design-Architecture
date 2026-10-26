import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Avatar, Field, GoldButton, Screen, TextInput } from "@/components/app-shell";

export const Route = createFileRoute("/cash-out")({
  head: () => ({
    meta: [
      { title: "Cash Out – BS23MFS" },
      { name: "description", content: "Cash out from nearby agents with BS23MFS." },
    ],
  }),
  component: CashOut,
});

const agents = ["Rahman", "Mim", "Sabbir", "Lima"];
const nearby = [
  { name: "Hasan Telecom", sub: "Dhanmondi · 0.4 km" },
  { name: "Sarker Store", sub: "Mirpur · 1.1 km" },
];
const quick = ["500", "1000", "5000"];

function CashOut() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <Screen title="Cash Out">
      <Field label="Agent number">
        <TextInput value={number} onChange={setNumber} placeholder="01XXXXXXXXX" />
      </Field>

      <section>
        <h2 className="text-base font-bold text-foreground">Frequently used agents</h2>
        <div className="mt-3 flex gap-6">
          {agents.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Avatar label={name.charAt(0)} className="h-12 w-12 bg-primary/15 text-primary" />
              <span className="text-xs text-foreground">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Nearby agents</h2>
          <Link to="/nearby" className="text-sm font-semibold text-primary">
            View on map
          </Link>
        </div>
        <ul className="mt-3 space-y-3">
          {nearby.map((a) => (
            <li
              key={a.name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <Avatar label={a.name.charAt(0)} />
              <div>
                <p className="font-semibold text-foreground">{a.name}</p>
                <p className="text-sm text-muted-foreground">{a.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Field label="Amount (৳)">
        <TextInput type="number" value={amount} onChange={setAmount} placeholder="0" />
      </Field>
      <div className="grid grid-cols-3 gap-3">
        {quick.map((q) => (
          <button
            key={q}
            onClick={() => setAmount(q)}
            className="rounded-xl border border-border bg-card py-3 font-semibold text-foreground transition-colors hover:bg-accent"
          >
            ৳{q}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">Fee ৳9.25 per ৳500 (mock)</p>

      <GoldButton>Cash Out</GoldButton>
    </Screen>
  );
}
