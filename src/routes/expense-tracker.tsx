import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/app-shell";

export const Route = createFileRoute("/expense-tracker")({
  head: () => ({
    meta: [
      { title: "Expense Tracker – BS23MFS" },
      { name: "description", content: "View your monthly wallet expenses by payment purpose." },
    ],
  }),
  component: ExpenseTracker,
});

const monthlyExpenses = [
  { purpose: "Groceries", amount: 8450, count: 12, color: "bg-[#33564B]" },
  { purpose: "Bills", amount: 5270, count: 4, color: "bg-[#6E9A85]" },
  { purpose: "Family support", amount: 5000, count: 3, color: "bg-[#D3A940]" },
  { purpose: "Dining", amount: 3280, count: 7, color: "bg-[#D58B62]" },
  { purpose: "Other", amount: 1950, count: 5, color: "bg-[#8B91A1]" },
];

const total = monthlyExpenses.reduce((sum, item) => sum + item.amount, 0);

function ExpenseTracker() {
  return (
    <Screen title="Expense Tracker">
      <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
        <p className="text-sm opacity-80">Total expenses · October</p>
        <p className="mt-1 text-3xl font-extrabold">৳ {total.toLocaleString("en-US")}.00</p>
        <p className="mt-2 text-sm opacity-80">31 payments this month</p>
      </div>

      <section>
        <h2 className="text-base font-bold text-foreground">Spending by purpose</h2>
        <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-muted" aria-label="Monthly expenses by purpose">
          {monthlyExpenses.map((item) => (
            <span key={item.purpose} className={item.color} style={{ width: `${(item.amount / total) * 100}%` }} />
          ))}
        </div>
        <ul className="mt-3 divide-y divide-border">
          {monthlyExpenses.map((item) => (
            <li key={item.purpose} className="flex items-center gap-3 py-3">
              <span className={`h-3 w-3 shrink-0 rounded-full ${item.color}`} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{item.purpose}</p>
                <p className="text-sm text-muted-foreground">{item.count} payments</p>
              </div>
              <p className="font-bold text-foreground">৳ {item.amount.toLocaleString("en-US")}</p>
            </li>
          ))}
        </ul>
      </section>
      <p className="text-center text-xs text-muted-foreground">Sample monthly expense summary</p>
    </Screen>
  );
}
