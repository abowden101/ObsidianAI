"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DEFAULT_API =
  process.env.NEXT_PUBLIC_CHAT_API ?? "https://obsidianai-evtu.onrender.com";

export function GrokWidget() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>(
    [
      {
        role: "assistant",
        text: "I’m ObsidianAI’s Grok-powered assistant. Ask about zero-trust architecture, firewall rules, or Orlando hospitality operations.",
      },
    ]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setInput("");
    setError(null);
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setLoading(true);
    try {
      const res = await fetch(`${DEFAULT_API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = data.detail;
        let msg = "Request failed. Try again shortly.";
        if (typeof detail === "string") msg = detail;
        else if (Array.isArray(detail) && detail[0]?.msg) msg = detail[0].msg;
        throw new Error(msg);
      }
      const reply = typeof data.reply === "string" ? data.reply : "No reply.";
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error.");
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Could not reach the Grok backend. Confirm CORS and API availability, or email team@obsidianai.org.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  return (
    <Card
      id="grok"
      className="overflow-hidden border-cyan-500/20 bg-zinc-950/80 shadow-[0_0_60px_-20px_rgba(34,211,238,0.35)]"
    >
      <CardHeader className="border-b border-zinc-800/80 bg-gradient-to-r from-cyan-950/40 to-transparent">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-cyan-400" />
          <CardTitle className="text-lg text-zinc-50">Live Grok</CardTitle>
        </div>
        <CardDescription className="text-zinc-400">
          Connected to xAI Grok via ObsidianAI API ({DEFAULT_API}). Rate-limited for production safety.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 sm:p-6">
        <div className="h-[min(380px,55vh)] space-y-3 overflow-y-auto rounded-lg border border-zinc-800/80 bg-black/40 p-4 font-mono text-sm">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={
                  msg.role === "user"
                    ? "ml-8 rounded-lg border border-cyan-900/50 bg-cyan-950/30 p-3 text-cyan-50"
                    : "mr-8 rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 text-zinc-200"
                }
              >
                <span className="mb-1 block text-[10px] uppercase tracking-wider text-zinc-500">
                  {msg.role === "user" ? "You" : "Grok"}
                </span>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {loading && (
            <div className="flex items-center gap-2 text-zinc-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking…
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-amber-400/90" role="alert">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            className="min-h-11 flex-1 rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
            placeholder="Ask about zero-trust, SIEM, or property ops…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          />
          <Button type="button" onClick={send} disabled={loading} className="shrink-0">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
