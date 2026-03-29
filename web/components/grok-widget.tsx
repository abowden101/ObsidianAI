"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TiltFrame } from "@/components/tilt-frame";
import { publicConfig } from "@/lib/public-config";

const API_BASE = publicConfig.chatApi;

export function GrokWidget() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    {
      role: "assistant",
      text: "I’m ObsidianAI’s Grok-powered assistant. Ask about zero-trust architecture, firewall rules, or Orlando hospitality operations.",
    },
  ]);
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
      const res = await fetch(`${API_BASE}/chat`, {
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
      const msg =
        e instanceof Error
          ? e.message
          : "Network error — check API/CORS or email team@obsidianai.org.";
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: `Couldn’t complete that request (${msg}). Confirm the backend is up and this site’s origin is allowed by the API.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  return (
    <TiltFrame
      intensity={4}
      className="relative rounded-xl [transform-style:preserve-3d]"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 hidden h-28 w-28 rounded-full border border-cyan-500/20 sm:block animate-pulse-ring" />
      <Card
        id="grok"
        className="glass-panel glow-cyan relative overflow-hidden border-cyan-500/25"
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(34,211,238,0.06)_50%,transparent_60%)] bg-[length:200%_100%] animate-shimmer" />
        <CardHeader className="relative border-b border-zinc-800/80 bg-gradient-to-r from-cyan-950/50 via-transparent to-violet-950/20">
          <div
            className="pointer-events-none absolute right-8 top-6 hidden gap-2 sm:flex"
            aria-hidden
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-cyan-400/70 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="h-5 w-5 text-cyan-400" />
            </motion.span>
            <CardTitle className="text-lg text-zinc-50">Live Grok</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Real-time inference via xAI Grok through ObsidianAI&apos;s API (
            <span className="font-mono text-[11px] text-zinc-500">{API_BASE}</span>
            ).
          </CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-4 p-4 sm:p-6">
          <div className="h-[min(380px,55vh)] space-y-3 overflow-y-auto rounded-lg border border-zinc-800/80 bg-black/45 p-4 font-mono text-sm shadow-inner backdrop-blur-sm">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={`${i}-${msg.role}-${msg.text.slice(0, 20)}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={
                    msg.role === "user"
                      ? "ml-8 rounded-lg border border-cyan-900/50 bg-cyan-950/35 p-3 text-cyan-50 shadow-lg shadow-cyan-950/20"
                      : "mr-8 rounded-lg border border-zinc-700/80 bg-zinc-900/55 p-3 text-zinc-200"
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
                Reasoning…
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className="min-h-11 flex-1 rounded-md border border-zinc-700 bg-zinc-950/90 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/40"
              placeholder="Ask about zero-trust, SIEM, or property ops…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), void send())
              }
            />
            <Button
              type="button"
              onClick={() => void send()}
              disabled={loading}
              className="shrink-0"
            >
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
    </TiltFrame>
  );
}
