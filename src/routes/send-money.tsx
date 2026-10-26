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

function SendMoney() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

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
