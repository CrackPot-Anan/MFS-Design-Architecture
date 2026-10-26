import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Zap, Flame, Droplet, Wifi, GraduationCap, MoreHorizontal, Check } from "lucide-react";
import { AppHeader } from "@/components/app-shell";

export const Route = createFileRoute("/pay-bill")({
  head: () => ({
    meta: [
      { title: "Pay Bill – BS23MFS" },
      { name: "description", content: "Choose a bill category and pay a provider with BS23MFS." },
    ],
  }),
  component: PayBill,
});

const categories = [
  { label: "Electricity", icon: Zap },
  { label: "Gas", icon: Flame },
  { label: "Water", icon: Droplet },
  { label: "Internet", icon: Wifi },
  { label: "Education", icon: GraduationCap },
  { label: "Others", icon: MoreHorizontal },
];

const billers = [
  { id: "desco", name: "DESCO", category: "Electricity", detail: "Electricity bill" },
  { id: "dpdc", name: "DPDC", category: "Electricity", detail: "Electricity bill" },
  { id: "titas", name: "Titas Gas", category: "Gas", detail: "Gas bill" },
  { id: "wasa", name: "Dhaka WASA", category: "Water", detail: "Water bill" },
  { id: "dotinternet", name: "Dot Internet", category: "Internet", detail: "Internet bill" },
  { id: "school", name: "School Fee", category: "Education", detail: "Education fee" },
  { id: "other", name: "Other biller", category: "Others", detail: "Other payment" },
];

const savedBills = [
  { name: "Home Electricity", billerId: "desco", account: "DESCO-10384291" },
  { name: "Home Gas", billerId: "titas", account: "TITAS-5520184" },
  { name: "Home Internet", billerId: "dotinternet", account: "DOT-0171200456" },
];

function PayBill() {
  const [category, setCategory] = useState("Electricity");
  const [billerId, setBillerId] = useState("desco");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [review, setReview] = useState(false);
  const [paid, setPaid] = useState(false);

  const filteredBillers = billers.filter((biller) => biller.category === category);
  const selectedBiller = billers.find((biller) => biller.id === billerId);

  function chooseCategory(value: string) {
    setCategory(value);
    setBillerId(billers.find((biller) => biller.category === value)?.id ?? "");
    setReview(false);
    setPaid(false);
  }

  return (
    <div className="min-h-screen bg-[#F4F6F5] pb-20">
      <AppHeader title="Pay Bill" />
      <main className="space-y-6 px-4 pt-5">
        <section>
          <h2 className="text-[17px] font-bold text-[#1D2B26]">Previously saved bills</h2>
          <p className="mt-1 text-sm text-[#5A6A64]">Choose an account to fill in its biller details.</p>
          <div className="mt-3 space-y-2">
            {savedBills.map((bill) => (
              <button
                key={bill.account}
                type="button"
                onClick={() => {
                  const savedBiller = billers.find((item) => item.id === bill.billerId);
                  if (savedBiller) setCategory(savedBiller.category);
                  setBillerId(bill.billerId);
                  setAccount(bill.account);
                  setReview(false);
                  setPaid(false);
                }}
                className="flex w-full items-center gap-3 rounded-2xl border border-[#DFE5E2] bg-white p-3 text-left transition-colors hover:bg-[#F8FAF9]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#33564B] text-sm font-bold text-white">{bill.name.charAt(5)}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-[#1D2B26]">{bill.name}</span>
                  <span className="block truncate text-sm text-[#5A6A64]">{bill.account}</span>
                </span>
                <span className="text-sm font-semibold text-[#33564B]">Use</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[#1D2B26]">Choose bill category</h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {categories.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => chooseCategory(label)}
                aria-pressed={category === label}
                className={`flex min-h-[84px] flex-col items-center justify-center gap-2 rounded-2xl border bg-card py-4 ${category === label ? "border-[#33564B] ring-1 ring-[#33564B]" : "border-[#DFE5E2]"}`}
              >
                <Icon className="h-6 w-6 stroke-[1.8] text-[#33564B]" />
                <span className="text-sm text-[#1D2B26]">{label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[17px] font-bold text-[#1D2B26]">Select biller</h2>
          <div className="mt-3 space-y-2">
            {filteredBillers.map((biller) => (
              <button
                key={biller.id}
                type="button"
                onClick={() => { setBillerId(biller.id); setReview(false); setPaid(false); }}
                aria-pressed={billerId === biller.id}
                className={`flex w-full items-center gap-3 rounded-2xl border bg-card p-3 text-left ${billerId === biller.id ? "border-[#33564B] ring-1 ring-[#33564B]" : "border-[#DFE5E2]"}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#33564B] text-sm font-bold text-white">{biller.name.slice(0, 1)}</span>
                <span className="flex-1">
                  <span className="block font-bold text-[#1D2B26]">{biller.name}</span>
                  <span className="text-sm text-[#5A6A64]">{biller.detail}</span>
                </span>
                {billerId === biller.id && <Check className="h-5 w-5 text-[#33564B]" />}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <label className="block space-y-2">
            <span className="block text-sm font-medium text-[#1D2B26]">Consumer / account number</span>
            <input value={account} onChange={(event) => setAccount(event.target.value)} placeholder="Enter your bill account number" className="w-full rounded-xl border border-[#DFE5E2] bg-white px-4 py-3 text-[#1D2B26] outline-none placeholder:text-[#829089] focus:border-[#33564B]" />
          </label>
          <label className="block space-y-2">
            <span className="block text-sm font-medium text-[#1D2B26]">Amount (৳)</span>
            <input type="number" min="1" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Enter bill amount" className="w-full rounded-xl border border-[#DFE5E2] bg-white px-4 py-3 text-[#1D2B26] outline-none placeholder:text-[#829089] focus:border-[#33564B]" />
          </label>
          <label className="block space-y-2">
            <span className="block text-sm font-medium text-[#1D2B26]">Purpose (optional)</span>
            <input value={purpose} onChange={(event) => setPurpose(event.target.value)} placeholder="e.g. Home electricity" className="w-full rounded-xl border border-[#DFE5E2] bg-white px-4 py-3 text-[#1D2B26] outline-none placeholder:text-[#829089] focus:border-[#33564B]" />
          </label>
        </section>

        {review && selectedBiller && !paid && (
          <section className="rounded-2xl border border-[#DFE5E2] bg-white p-4" aria-live="polite">
            <h2 className="font-bold text-[#1D2B26]">Review bill payment</h2>
            <div className="mt-3 space-y-2 text-sm">
              <p className="flex justify-between gap-3"><span className="text-[#5A6A64]">Biller</span><span className="font-semibold text-[#1D2B26]">{selectedBiller.name}</span></p>
              <p className="flex justify-between gap-3"><span className="text-[#5A6A64]">Account</span><span className="font-semibold text-[#1D2B26]">{account}</span></p>
              {purpose && <p className="flex justify-between gap-3"><span className="text-[#5A6A64]">Purpose</span><span className="font-semibold text-[#1D2B26]">{purpose}</span></p>}
              <p className="flex justify-between gap-3 border-t border-[#DFE5E2] pt-2"><span className="text-[#5A6A64]">Total</span><span className="font-bold text-[#1D2B26]">৳ {Number(amount).toLocaleString("en-US")}</span></p>
            </div>
            <button type="button" onClick={() => setPaid(true)} className="mt-4 w-full rounded-xl bg-[#D3A940] py-3 font-bold text-[#1D2B26]">Confirm payment</button>
          </section>
        )}

        {paid ? (
          <div className="rounded-xl bg-[#33564B]/10 px-4 py-3 text-center font-semibold text-[#33564B]" role="status">Bill payment recorded in this demo.</div>
        ) : !review ? (
          <button
            type="button"
            disabled={!billerId || !account.trim() || !amount || Number(amount) <= 0}
            onClick={() => setReview(true)}
            className="w-full rounded-xl bg-[#D3A940] py-4 text-lg font-bold text-[#1D2B26] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Review Bill
          </button>
        ) : null}
        <p className="pb-3 text-center text-xs text-[#5A6A64]">Bill payments are shown as a frontend demo.</p>
      </main>
    </div>
  );
}
