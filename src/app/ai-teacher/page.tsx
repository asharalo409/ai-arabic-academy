
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Send,
  Sparkles,
  User,
  Loader2,
  Trash2,
  BookOpen,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AITeacherPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const question = input.trim();

    if (!question || loading) return;

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", text: question },
    ];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI service error");
      }

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          text: data.answer,
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong.";

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          text: "দুঃখিত! AI উত্তর দিতে পারেনি। সমস্যা: " + errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    if (loading) return;
    setMessages([]);
  }

  return (
    <main className="min-h-screen bg-[#080d19] text-white">

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#080d19]/95 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-emerald-400"
          >
            <ArrowLeft size={19} />
            Home
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-[#07130f]">
              <Brain size={22} />
            </div>

            <div>
              <h1 className="text-sm font-bold">
                AI Arabic Teacher
              </h1>
              <p className="text-[10px] text-emerald-400">
                GEMINI AI POWERED
              </p>
            </div>
          </div>

          <button
            onClick={clearChat}
            disabled={loading}
            aria-label="Clear chat"
            className="rounded-lg border border-white/10 p-2 text-slate-400 hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </header>

      <div className="container flex min-h-[calc(100vh-64px)] max-w-4xl flex-col py-6">

        <div className="mb-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 p-5">
          <div className="flex items-center gap-3">
            <Sparkles className="text-emerald-400" />
            <h2 className="font-bold">
              Your Personal Arabic Teacher
            </h2>
          </div>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Ask anything about Arabic grammar, vocabulary,
            Quranic Arabic, translation and pronunciation.
            You can communicate in বাংলা, English or العربية.
          </p>
        </div>

        <div className="flex-1 space-y-5 pb-6">

          {messages.length === 0 && (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-400/10 text-emerald-400">
                <BookOpen size={38} />
              </div>

              <h2 className="text-2xl font-bold">
                مرحباً بك!
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
                আসসালামু আলাইকুম! আমি তোমার AI Arabic Teacher।
                আরবি শেখার যেকোনো প্রশ্ন আমাকে করতে পারো।
              </p>

              <div className="mt-7 grid w-full gap-3 sm:grid-cols-2">

                {[
                  "আরবি ব্যাকরণ কীভাবে শিখব?",
                  "ما معنى كلمة العلم؟",
                  "Translate الحمد لله into Bengali",
                  "ما هو علم النحو؟",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 text-left text-sm text-slate-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/5"
                  >
                    {suggestion}
                  </button>
                ))}

              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              {message.role === "assistant" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-[#07130f]">
                  <Brain size={19} />
                </div>
              )}

              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl p-4 text-sm leading-8 ${
                  message.role === "user"
                    ? "bg-emerald-500 text-[#04130f]"
                    : "border border-white/10 bg-[#111c2e] text-slate-200"
                }`}
                dir="auto"
              >
                {message.text}
              </div>

              {message.role === "user" && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-700">
                  <User size={19} />
                </div>
              )}

            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-sm text-emerald-400">
              <Loader2 className="animate-spin" size={20} />
              AI Arabic Teacher is thinking...
            </div>
          )}

        </div>

        <div className="sticky bottom-0 border-t border-white/10 bg-[#080d19] pb-3 pt-5">

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex items-end gap-3 rounded-2xl border border-white/10 bg-[#111c2e] p-3 focus-within:border-emerald-400/50"
          >

            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Write your Arabic question... / বাংলায় প্রশ্ন করুন..."
              rows={2}
              maxLength={4000}
              className="max-h-36 min-h-[48px] flex-1 resize-y bg-transparent p-2 text-sm text-white outline-none placeholder:text-slate-500"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400 text-[#07130f] transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Send size={20} />
              )}
            </button>

          </form>

          <p className="mt-3 text-center text-[11px] text-slate-500">
            AI can make mistakes. Verify important educational information.
          </p>

        </div>

      </div>
    </main>
  );
}
