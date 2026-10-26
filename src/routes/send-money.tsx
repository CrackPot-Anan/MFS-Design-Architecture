import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Avatar, Field, GoldButton, Screen, TextInput } from "@/components/app-shell";

export const Route = createFileRoute("/send-money")({
  head: () => ({
    meta: [
      { title: "Send Money – BS23MFS" },
      { name: "description", content: "Send money to any number with BS23MFS." },
    ],
  }),
  component: SendMoney,
});

const frequent = ["Rahim", "Mom", "Nusrat", "Tanvir"];
const suggested = [
  { name: "Karim Uddin", number: "01712 ••• 456" },
  { name: "Shirin Akter", number: "01911 ••• 208" },
];
const quick = ["500", "1000", "2000"];
const currentBalance = 12480;
const purposes = ["Family support", "Rent", "Bills", "Groceries", "Dining", "Other"];

function SendMoney() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  return (
    <Screen title="Send Money">
      <Field label="Receiver number">
        <TextInput value={number} onChange={setNumber} placeholder="01XXXXXXXXX" />
      </Field>

      <section>
        <h2 className="text-base font-bold text-foreground">Frequently sent to</h2>
        <div className="mt-3 flex gap-6">
          {frequent.map((name) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <Avatar label={name.charAt(0)} className="h-12 w-12 bg-primary/15 text-primary" />
              <span className="text-xs text-foreground">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-base font-bold text-foreground">Suggested</h2>
        <ul className="mt-3 space-y-3">
          {suggested.map((s) => (
            <li
              key={s.name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <Avatar label={s.name.charAt(0)} />
              <div>
                <p className="font-semibold text-foreground">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.number}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <Field label="Amount (৳)">
        <TextInput type="number" value={amount} onChange={setAmount} placeholder="0" />
      </Field>
      <Field label="Purpose of payment">
        <TextInput value={purpose} onChange={setPurpose} placeholder="e.g. Rent, family support" />
      </Field>
      <div className="-mt-4 flex flex-wrap gap-2" aria-label="Common payment purposes">
        {purposes.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPurpose(item)}
            aria-pressed={purpose === item}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${purpose === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:bg-accent"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="-mt-4 flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3">
        <span className="text-sm text-muted-foreground">Available balance</span>
        <span className="font-bold text-foreground">৳ {currentBalance.toLocaleString("en-US")}.00</span>
      </div>
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

      <GoldButton>Continue</GoldButton>
    </Screen>
  );
}
