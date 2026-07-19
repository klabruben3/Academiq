import { useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";
import type { ChatMessage } from "@/types";

import { IrisAvatar } from "./ui/IrisAvatar";
import { ChatBubble } from "./ui/ChatBubble";
import { TypingIndicator } from "./ui/TypingIndicator";
import { ChatInput } from "./ui/ChatInput";

import { Mono } from "@/components/ui/Mono";

export function WorkspaceConversation({
  messages,
  typing,
  onSend,
  onClose,
}: {
  messages: ChatMessage[];
  typing: boolean;
  onSend: (msg: string) => void;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center gap-4 px-6 py-4 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: "#7a7a6a" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f0ede6")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#7a7a6a")}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-3">
          <IrisAvatar size={32} />
          <div>
            <div
              className="text-[15px] font-semibold text-foreground"
              style={{ fontFamily: '"DM Serif Display", serif' }}
            >
              Iris
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "#9180aa",
                  boxShadow: "0 0 6px rgba(145,128,170,0.6)",
                }}
              />
              <Mono className="text-[10px]" style={{ color: "#5a5a4a" }}>
                Workspace context
              </Mono>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4"
      >
        {messages.map((m) => (
          <ChatBubble key={m.id} msg={m} />
        ))}
        {typing && <TypingIndicator />}
      </div>

      {/* Input */}
      <div className="px-6 pb-6 pt-3 shrink-0">
        <ChatInput onSend={onSend} placeholder="Ask about your workspace…" />
      </div>
    </div>
  );
}
