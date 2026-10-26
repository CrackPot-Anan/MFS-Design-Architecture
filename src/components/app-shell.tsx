import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function AppHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 bg-primary px-4 py-5 text-primary-foreground">
      <button
        onClick={() => router.history.back()}
        aria-label="Go back"
        className="-ml-1 rounded-full p-1 transition-colors hover:bg-deep"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-bold tracking-tight">{title}</h1>
    </header>
  );
}

export function Avatar({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground ${className}`}
    >
      {label}
    </span>
  );
}

export function GoldButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl bg-gold py-4 text-center text-lg font-bold text-gold-foreground transition-colors hover:bg-gold/90 disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export function Screen({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background pb-10">
      <AppHeader title={title} />
      <div className="space-y-6 px-4 pt-5">{children}</div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
    />
  );
}
