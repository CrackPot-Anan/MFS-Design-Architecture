import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, CreditCard, Smartphone } from "lucide-react";
import { Screen } from "@/components/app-shell";

export const Route = createFileRoute("/add-money")({
  head: () => ({
    meta: [
      { title: "Add Money – BS23MFS" },
      { name: "description", content: "Choose a way to add money to your BS23MFS wallet." },
    ],
  }),
  component: AddMoney,
});

const methods = [
  { label: "Bank Account", detail: "Transfer from your bank", icon: Building2 },
  { label: "Visa / MasterCard", detail: "Use a debit or credit card", icon: CreditCard },
  { label: "MFS", detail: "Add money from another mobile wallet", icon: Smartphone },
];

function AddMoney() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Screen title="Add Money">
      <section>
        <h2 className="text-base font-bold text-foreground">Choose a method</h2>
        <div className="mt-3 space-y-3">
          {methods.map(({ label, detail, icon: Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => setSelected(label)}
              aria-pressed={selected === label}
              className={`flex w-full items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-colors ${selected === label ? "border-primary ring-1 ring-primary" : "border-border hover:bg-accent"}`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-foreground">{label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{detail}</span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </Screen>
  );
}
