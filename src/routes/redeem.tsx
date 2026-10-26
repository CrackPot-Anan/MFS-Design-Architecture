import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Gift } from "lucide-react";
import { Screen } from "@/components/app-shell";

export const Route = createFileRoute("/redeem")({
  head: () => ({
    meta: [
      { title: "Redeem Rewards – BS23MFS" },
      { name: "description", content: "Exchange BS23MFS points for partner rewards." },
    ],
  }),
  component: Redeem,
});

const rewards = [
  { id: "shwapno", partner: "Shwapno", reward: "৳50 off", points: 500 },
  { id: "unimart", partner: "Unimart", reward: "৳75 off", points: 600 },
  { id: "la-bamba", partner: "La Bamba", reward: "৳90 off", points: 700 },
  { id: "apon", partner: "Apon Family Mart", reward: "৳100 off", points: 800 },
  { id: "lotto", partner: "Lotto", reward: "৳150 off", points: 1000 },
];

function Redeem() {
  const [points, setPoints] = useState(2450);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [redeemedId, setRedeemedId] = useState<string | null>(null);
  const pending = rewards.find((reward) => reward.id === pendingId);

  function confirmRedeem() {
    if (!pending || pending.points > points) return;
    setPoints((current) => current - pending.points);
    setRedeemedId(pending.id);
    setPendingId(null);
  }

  return (
    <Screen title="Redeem Rewards">
      <div className="rounded-2xl bg-gold p-5 text-center text-gold-foreground">
        <p className="text-sm opacity-80">Available points</p>
        <p className="mt-1 text-4xl font-extrabold">{points.toLocaleString()}</p>
      </div>

      {pending && (
        <section className="rounded-2xl border border-primary/30 bg-primary/5 p-4" aria-live="polite">
          <h2 className="font-bold text-foreground">Confirm redemption</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Exchange {pending.points.toLocaleString()} points for {pending.reward} at {pending.partner}?
          </p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => setPendingId(null)} className="flex-1 rounded-xl border border-border bg-card py-3 text-sm font-semibold text-foreground">Cancel</button>
            <button type="button" onClick={confirmRedeem} className="flex-1 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">Confirm</button>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-base font-bold text-foreground">Partner rewards</h2>
        <p className="mt-1 text-sm text-muted-foreground">Choose a reward to review before redeeming.</p>
        <ul className="mt-3 space-y-3">
          {rewards.map((reward) => {
            const unavailable = reward.points > points;
            const redeemed = redeemedId === reward.id;
            return (
              <li key={reward.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {redeemed ? <Check className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{reward.partner}</p>
                  <p className="text-sm text-muted-foreground">{reward.reward} · {reward.points.toLocaleString()} pts</p>
                </div>
                <button
                  type="button"
                  disabled={unavailable || redeemed}
                  onClick={() => { setRedeemedId(null); setPendingId(reward.id); }}
                  className="rounded-lg bg-gold px-3 py-2 text-sm font-bold text-gold-foreground transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {redeemed ? "Redeemed" : unavailable ? "Not enough" : "Choose"}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </Screen>
  );
}
