import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Shield, RefreshCw, Phone, Clock } from "lucide-react";
import { ChatMessage } from "../types";

export default function SecurityChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello! I am your Secure MCR AI Security Consultant. \n\nHow can I help protect your home or business today? You can ask me about our **4K Camera Kits**, **prices**, **remote viewing configuration**, or **how to book a free site survey** across the UK!",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Format response helper to parse bold text
  const formatText = (text: string) => {
    return text.split("\n").map((line, idx) => {
      // Very simple inline markdown bold converter
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        parts.push(
          <strong key={match.index} className="text-blue-400 font-semibold">
            {match[1]}
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      // Render bullet points nicely
      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("-");
      
      return (
        <p key={idx} className={`leading-relaxed text-sm ${isBullet ? "pl-3 text-slate-300" : "text-slate-200"} mb-1`}>
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessageText = inputText;
    setInputText("");
    setErrorStatus(null);

    // 1. Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: userMessageText,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // 2. Format history for context-aware API calls
      // Keep only last 8 messages for token size and context safety
      const historyContext = messages
        .slice(-8)
        .filter((m) => m.id !== "welcome")
        .map((m) => ({
          role: m.role,
          text: m.text
        }));

      // 3. Make server-side secure call
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessageText,
          history: historyContext
        })
      });

      if (!response.ok) {
        throw new Error("Server communication failure.");
      }

      const data = await response.json();
      
      if (data.error) {
        setErrorStatus(data.error); // Show subtle backup notice
      }

      // 4. Add model message
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "model",
        text: data.reply,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);

    } catch (err) {
      console.error("Chat error:", err);
      // Degrade gracefully with a direct local backup assistant
      const botMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        role: "model",
        text: "I am having trouble reaching our live database, but I am fully equipped with our offline security manuals!\n\nTo speak directly to our Manchester security desk, please call **+44 7514 856229** or email **securemcr@gmail.com** for a free quotation. We can supply, fit, and program HD CCTV packages starting at **£499**.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none pointer-events-auto">
      {/* 1. Chat Widget Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="chat-toggle-btn"
          className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer border border-blue-400/20"
        >
          {/* Pulsing Outer Glow */}
          <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></span>
          <MessageSquare className="w-6 h-6 group-hover:rotate-6 transition-transform duration-300" />
          
          {/* Tooltip */}
          <span className="absolute right-16 bg-slate-900 border border-blue-500/20 text-blue-300 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            CCTV AI Expert Live
          </span>
        </button>
      )}

      {/* 2. Expanded Chat Box Window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="relative flex flex-col w-[360px] sm:w-[380px] h-[500px] bg-slate-950/95 border border-blue-500/35 rounded-2xl shadow-2xl shadow-blue-500/10 overflow-hidden backdrop-blur-xl animate-fade-in"
        >
          {/* Glow backdrop bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"></div>

          {/* Chat Window Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-slate-900/90 border-b border-blue-500/15">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-8 h-8 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                <Shield className="w-4.5 h-4.5 text-blue-400" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-slate-950 animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-100 tracking-wide">Secure MCR Consultant</h4>
                <span className="text-[10px] text-blue-400/80 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-blue-400/60" /> Online // Instant Quotation
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat History Panel */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 no-scrollbar bg-scanlines bg-slate-950/20">
            {messages.map((msg) => {
              const isBot = msg.role === "model";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
                >
                  {isBot && (
                    <div className="flex-shrink-0 w-7 h-7 bg-blue-900/40 border border-blue-500/30 rounded-md flex items-center justify-center mt-1 text-blue-400 font-mono text-[10px] font-bold">
                      MCR
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isBot
                        ? "bg-slate-900/95 border border-slate-800/80 text-slate-200 rounded-tl-sm shadow-sm"
                        : "bg-blue-600/90 text-white rounded-tr-sm font-medium shadow-md"
                    }`}
                  >
                    {formatText(msg.text)}
                    <span className="block mt-1.5 text-[9px] text-slate-400/50 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* AI Typing Loader Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="flex-shrink-0 w-7 h-7 bg-blue-900/40 border border-blue-500/30 rounded-md flex items-center justify-center mt-1 text-blue-400 font-mono text-[10px] font-bold">
                  MCR
                </div>
                <div className="bg-slate-900/95 border border-slate-800/80 text-slate-400 px-3.5 py-3 rounded-2xl text-xs rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span className="font-mono text-[10px] text-blue-400/70 tracking-wider">SECURE_MCR SCANNING...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Graceful Backup Info notification */}
          {errorStatus && (
            <div className="px-3 py-1 bg-blue-950/40 border-t border-b border-blue-500/10 text-[10px] text-blue-400/80 font-mono text-center flex items-center justify-center gap-1">
              <span>{errorStatus}</span>
            </div>
          )}

          {/* Message Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-slate-900 border-t border-blue-500/15 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for a quote or system info..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl active:scale-95 transition-all shadow-md flex items-center justify-center"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

          {/* Quick contact trigger panel */}
          <div className="px-4 py-2 bg-slate-950 border-t border-blue-500/10 flex justify-between items-center text-[10px] text-slate-400">
            <span className="font-mono">Direct Desk:</span>
            <a
              href="tel:+447514856229"
              className="text-blue-400 hover:underline flex items-center gap-1 font-mono font-medium"
            >
              <Phone className="w-3 h-3" /> +44 7514 856229
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
