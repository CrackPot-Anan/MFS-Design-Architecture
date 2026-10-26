import { createFileRoute, Link } from "@tanstack/react-router";
import { Gamepad2, Car, Candy, Swords, BookOpen, ChevronRight } from "lucide-react";
import { AppHeader } from "@/components/app-shell";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "Games – BS23MFS" },
      { name: "description", content: "Play games and earn points." },
    ],
  }),
  component: Games,
});

const games = [
  { id: "quizlet", name: "Quizlet", description: "Quiz Battle", icon: BookOpen, pointsPerAttempt: 10 },
  { id: "car-crush", name: "Car Crush", description: "Match & Crush", icon: Car, pointsPerAttempt: 15 },
  { id: "candy-hunt", name: "Candy Hunt", description: "Sweet Match", icon: Candy, pointsPerAttempt: 12 },
  { id: "ninja-naruto", name: "NinjaNaruto", description: "Ninja Rush", icon: Swords, pointsPerAttempt: 20 },
  { id: "brick-buster", name: "Brick Buster", description: "Smash & Score", icon: Gamepad2, pointsPerAttempt: 18 },
];

function Games() {
  return (
    <div className="min-h-screen bg-background pb-10">
      <AppHeader title="Games" />
      <div className="space-y-4 px-4 pt-5">
        <p className="text-sm text-muted-foreground">Play games and earn points per attempt</p>
        <div className="space-y-2">
          {games.map(({ id, name, description, icon: Icon, pointsPerAttempt }) => (
            <button
              key={id}
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left"
              aria-label={`${name} - ${pointsPerAttempt} points per attempt`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary">
                <Icon className="h-5 w-5 stroke-[1.8] text-primary-foreground" />
              </span>
              <div className="flex-1">
                <p className="font-bold text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground">
                  {description} • {pointsPerAttempt} pts/attempt
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
