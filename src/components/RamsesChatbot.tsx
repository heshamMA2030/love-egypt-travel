import React, { useState, useRef, useEffect } from 'react';
import { Tour, ChatMessage } from '../types';
import { useCurrency } from '../context/CurrencyContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Compass,
  ArrowRight,
  Maximize2,
  Minimize2,
  Sun,
  ShieldCheck,
  Check
} from 'lucide-react';

interface RamsesChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  tours: Tour[];
  onBookTour: (tour: Tour) => void;
}

export const RamsesChatbot: React.FC<RamsesChatbotProps> = ({
  isOpen,
  onClose,
  onOpen,
  tours,
  onBookTour,
}) => {
  const { formatPrice } = useCurrency();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Ahlan wa Sahlan! ☀️ I am Ramses, your 24/7 AI Travel Concierge at Love Egypt. 

Whether you're seeking world-class diving at Ras Mohammed, a sunset quad safari in Sinai's Echo Valley, or need advice on Mount Sinai packing & hotel pickups, I am here for you. How may I assist your Red Sea adventure?`,
      timestamp: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Best scuba dive spot for beginners?',
    'Family safari with kids?',
    'What to pack for Mount Sinai?',
    'Hotel pickup zones in Sharm?',
    'Cancelation & weather guarantee?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isTyping) return;

    const userMsgId = 'user-' + Date.now();
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Build history for API
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: 'asst-' + Date.now(),
        sender: 'assistant',
        text: data.text || 'I would love to help you explore Sharm! What kind of excursion are you interested in?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedTourId: data.recommendedTourId,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback local response
      const fallbackMsg: ChatMessage = {
        id: 'fallback-' + Date.now(),
        sender: 'assistant',
        text: `Ras Mohammed National Park and the White Island sandbank are our guests' top rated experience! We provide luxury yacht sailing, delicious chef seafood buffet, and complimentary door-to-door hotel transfers across Naama Bay, Nabq, and Hadaba.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedTourId: 'ras-mohammed-white-island',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const getTourById = (tourId?: string) => {
    if (!tourId) return null;
    return tours.find((t) => t.id === tourId);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
          {/* Unread Prompt Bubble */}
          <div 
            onClick={onOpen}
            className="hidden sm:flex items-center gap-2 mb-2 px-3 py-1.5 rounded-full bg-white text-[#082B48] text-xs font-bold shadow-xl border border-[#D4AF37]/40 cursor-pointer animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Need Sharm advice? Ask Ramses AI</span>
          </div>

          <button
            onClick={onOpen}
            className="group relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#082B48] via-[#0d3f68] to-[#082B48] text-[#F3E5AB] font-bold text-sm shadow-2xl border-2 border-[#D4AF37] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-[#082B48] shadow">
              <Sun className="w-5 h-5 text-[#082B48] animate-spin-slow" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#082B48]" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-black tracking-wide text-white">Ask Ramses</span>
              <span className="block text-[10px] text-amber-200/80 -mt-0.5">AI Travel Concierge</span>
            </div>
          </button>
        </div>
      )}

      {/* Floating or Docked Chatbot Modal */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden ${
            isExpanded
              ? 'inset-4 sm:inset-10 max-w-5xl mx-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[440px] h-[640px] max-h-[90vh]'
          }`}
        >
          {/* Header */}
          <div className="bg-[#082B48] text-white p-4 flex items-center justify-between border-b border-[#D4AF37]/30 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-[#082B48] shadow">
                <Sun className="w-6 h-6 text-[#082B48]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#082B48]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-black text-sm text-white">
                    Ramses • Sharm Concierge
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#D4AF37]/20 text-amber-200 border border-[#D4AF37]/40">
                    AI Guide
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Live Sinai Local Expert • Instant Booking
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-300">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:block p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                title={isExpanded ? 'Restore size' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FDFCF7]">
            {messages.map((msg) => {
              const recTour = getTourById(msg.recommendedTourId);

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#082B48] text-[#F3E5AB] rounded-br-none shadow-md font-medium'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1.5 ${
                        msg.sender === 'user' ? 'text-amber-200/70 text-right' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Interactive Recommended Tour Card inside chat! */}
                  {recTour && (
                    <div className="mt-3 w-full max-w-[92%] bg-white rounded-2xl p-3 border-2 border-[#D4AF37]/50 shadow-md flex flex-col sm:flex-row gap-3 items-center justify-between">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <img
                          src={recTour.image}
                          alt={recTour.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                            Recommended for you
                          </span>
                          <h4 className="font-serif font-bold text-xs text-[#082B48] truncate">
                            {recTour.title}
                          </h4>
                          <span className="font-serif font-black text-sm text-[#082B48]">
                            {formatPrice(recTour.priceUSD)}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onBookTour(recTour);
                        }}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#e5c044] hover:brightness-105 text-[#082B48] font-black text-xs shadow-md transition-all whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Book Directly</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2 bg-white rounded-xl border border-slate-200 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
                <span>Ramses is preparing local Sinai advice...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isTyping}
                className="px-2.5 py-1 rounded-full bg-white text-slate-700 hover:text-[#082B48] hover:border-[#D4AF37] border border-slate-200 text-[11px] font-medium whitespace-nowrap transition-all shadow-2xs shrink-0 cursor-pointer disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about diving, quad safaris, Sinai packing, or hotel zones..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
              className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:bg-white transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="p-2.5 rounded-xl bg-[#082B48] text-[#F3E5AB] hover:bg-[#051C30] disabled:opacity-40 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
