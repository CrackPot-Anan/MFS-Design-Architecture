import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bot, Send, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/app-shell";

export const Route = createFileRoute("/ai-chat")({
  head: () => ({
    meta: [
      { title: "AI Assistant – BS23MFS" },
      { name: "description", content: "Ask questions about using your BS23MFS wallet." },
    ],
  }),
  component: AiChat,
});

type Message = { role: "assistant" | "user"; text: string; action?: "send-money" };

function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi! Ask me how to use BS23MFS, or tell me what you’d like to do." },
  ]);
  const [draft, setDraft] = useState("");
  const navigate = useNavigate();

  function sendMessage() {
    const question = draft.trim();
    if (!question) return;
    const wantsToSend = /send money|transfer/i.test(question);
    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      wantsToSend
        ? { role: "assistant", text: "I can open Send Money for you. Review the recipient and amount there before continuing.", action: "send-money" }
        : { role: "assistant", text: "You can use the tabs and actions in BS23MFS to manage your wallet. For example, My QR lets someone scan a code to receive money." },
    ]);
    setDraft("");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6F5] pb-16">
      <AppHeader title="AI Assistant" />
      <div className="mx-4 mt-4 flex items-center gap-3 rounded-2xl bg-[#33564B] p-4 text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><Sparkles className="h-5 w-5" /></span>
        <div><p className="font-bold">Wallet assistant</p><p className="text-xs text-white/75">Actions always need your approval</p></div>
      </div>

      <main className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === "user" ? "bg-[#33564B] text-white" : "border border-[#DFE5E2] bg-white text-[#1D2B26]"}`}>
              {message.role === "assistant" && <Bot className="mb-2 h-4 w-4 text-[#33564B]" />}
              <p className="text-sm leading-relaxed">{message.text}</p>
              {message.action && (
                <button
                  type="button"
                  onClick={() => navigate({ to: "/send-money" })}
                  className="mt-3 w-full rounded-lg bg-[#33564B] px-3 py-2 text-sm font-semibold text-white"
                >
                  Approve and open Send Money
                </button>
              )}
            </div>
          </div>
        ))}
      </main>

      <form className="mx-4 mb-3 flex gap-2 rounded-2xl border border-[#DFE5E2] bg-white p-2" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about your wallet..."
          aria-label="Message the AI assistant"
          className="min-w-0 flex-1 bg-transparent px-2 text-sm text-[#1D2B26] outline-none placeholder:text-[#829089]"
        />
        <button type="submit" aria-label="Send message" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#33564B] text-white">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
