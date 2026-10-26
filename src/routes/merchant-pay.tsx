import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ScanLine } from "lucide-react";
import { Avatar, Field, GoldButton, Screen, TextInput } from "@/components/app-shell";

export const Route = createFileRoute("/merchant-pay")({
  head: () => ({
    meta: [
      { title: "Merchant Pay – BS23MFS" },
      { name: "description", content: "Pay merchants by code or QR and earn points." },
    ],
  }),
  component: MerchantPay,
});

const frequent = ["Shwapno", "Apon", "Unimart", "Lotto", "La Bamba"];
const suggested = [
  { name: "Pizza Corner", sub: "Gulshan · Restaurant" },
  { name: "City Pharmacy", sub: "Banani · Health" },
];

function MerchantPay() {
  const [code, setCode] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <Screen title="Merchant Pay">
      <Field label="Merchant code">
        <TextInput value={code} onChange={setCode} placeholder="Enter code or scan QR" />
      </Field>

      <button
        type="button"
        className="-mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary/5 py-3 font-semibold text-primary transition-colors hover:bg-primary/10"
      >
        <ScanLine className="h-5 w-5" />
        Scan QR
      </button>

      <section>
        <h2 className="text-base font-bold text-foreground">Frequent merchants</h2>
        <div className="mt-3 flex gap-5 overflow-x-auto pb-1">
          {frequent.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Avatar label={name.charAt(0)} className="h-12 w-12 bg-primary/15 text-primary" />
              <span className="text-xs text-foreground">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Suggested</h2>
          <Link to="/nearby" className="text-sm font-semibold text-primary">
            View nearby
          </Link>
        </div>
        <ul className="mt-3 space-y-3">
          {suggested.map((s) => (
            <li
              key={s.name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <Avatar label={s.name.charAt(0)} />
              <div>
                <p className="font-semibold text-foreground">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.sub}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Field label="Amount (৳)">
        <TextInput type="number" value={amount} onChange={setAmount} placeholder="0" />
      </Field>

      <p className="rounded-xl bg-gold/20 px-4 py-3 text-sm text-gold-foreground">
        You will earn points on this payment
      </p>

      <GoldButton>Pay Now</GoldButton>
    </Screen>
  );
}
