import { Link, useRouterState } from "@tanstack/react-router";
import { Home, QrCode, Nfc, User, Bot } from "lucide-react";

const items = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Bangla QR", icon: QrCode, to: "/" },
  { label: "NFC Pay", icon: Nfc, to: "/pay-bill" },
  { label: "My QR", icon: QrCode, to: "/my-qr" },
  { label: "Me", icon: User, to: "/" },
];

export function BottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 mx-auto max-w-md border-t border-[#DFE5E2] bg-card">
      <ul className="grid grid-cols-5">
        {items.map(({ label, icon: Icon, to }) => {
          const isActive = currentPath === to;
          return (
            <li key={label}>
              <Link
                to={to}
                className={`flex min-h-[64px] flex-col items-center justify-center gap-1 ${
                  isActive ? "text-[#33564B]" : "text-[#5A6A64]"
                }`}
                aria-label={label}
              >
                <Icon className="h-5 w-5 stroke-[1.8]" />
                <span className="text-[11px] font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="pointer-events-none fixed inset-x-0 bottom-[68px] mx-auto flex w-full max-w-md justify-end">
        <div className="flex w-1/5 justify-center">
          <Link
            to="/ai-chat"
            aria-label="AI Chat"
            className="pointer-events-auto flex -translate-y-3 flex-col items-center gap-1 rounded-full bg-[#33564B] p-3 text-white shadow-lg"
          >
            <Bot className="h-5 w-5 stroke-[1.8]" />
            <span className="text-[10px] font-semibold leading-none">AI Chat</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
