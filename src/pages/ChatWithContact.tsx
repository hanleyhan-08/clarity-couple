import { motion, AnimatePresence } from "framer-motion";
import { type Contact, chatMessages } from "@/data/dummyData";
import { Search, MoreVertical, Smile, Paperclip, Send, X } from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useUUID } from "@/context/UUIDProvider";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { config } from "@/config";

interface ChatWithContactProps {
    contact: Contact | null;
}

interface Message {
    id: string | number;
    text: string;
    sender: "user" | "partner" | "ai";
    time: string;
    date?: string;
    read?: boolean;
    fromMe: boolean;
}

const ChatWithContact = ({ contact }: ChatWithContactProps) => {
    // 1. Direct Static Initialization
    // We use a key on the component in AppMain, so this component REMOUNTS on contact change.
    // This allows us to simply initialize state from the dummy data.
    const [messages, setMessages] = useState<Message[]>(() => {
        if (!contact) return [];
        return chatMessages[contact.id] || [];
    });

    const [inputMessage, setInputMessage] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Helper for date headers
    const getDateLabel = (dateStr?: string) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isToday(date)) return "Hari Ini";
        if (isYesterday(date)) return "Kemarin";
        return format(date, "dd/MM/yyyy", { locale: idLocale });
    };

    // Simple state reset if prop changes (redundant with key, but safe)
    useEffect(() => {
        if (contact) {
            setMessages(chatMessages[contact.id] || []);
        }
    }, [contact?.id]);


    // 3. Send Message (Mock - Local Only)
    const handleSend = () => {
        if (!inputMessage.trim() || !contact) return;

        const tempMsg: Message = {
            id: Date.now(),
            text: inputMessage,
            sender: "user",
            fromMe: true,
            time: format(new Date(), "HH:mm"),
            date: format(new Date(), "yyyy-MM-dd"),
            read: false
        };

        // Optimistic update
        setMessages(prev => [...prev, tempMsg]);
        setInputMessage("");

        // Simulate partner reply (optional demo feature)
        setTimeout(() => {
            // scrollToBottom() handled by layout effect
        }, 100);
    };

    useLayoutEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [messages, contact, isSearching]); // Added isSearching to scroll on search open/close

    if (!contact) {
        return (
            <div className="flex-1 flex items-center justify-center wa-chat-bg">
                <div className="text-center text-muted-foreground">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <Smile className="w-10 h-10 text-muted-foreground/40" />
                    </div>
                    <p className="text-lg font-medium">Pilih kontak</p>
                    <p className="text-sm">untuk melihat percakapan</p>
                </div>
            </div>
        );
    }

    // Filter messages based on search query
    const filteredMessages = messages.filter(msg =>
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col h-full bg-background">
            {/* Header */}
            <div className="gradient-primary px-4 h-[52px] flex items-center gap-3 shrink-0 relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {isSearching ? (
                        <motion.div
                            key="search-bar"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            className="absolute inset-0 bg-background flex items-center px-2 z-20 border-b border-border"
                        >
                            <div className="flex-1 relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    autoFocus
                                    className="pl-9 h-9 bg-muted border-none ring-0 focus-visible:ring-0"
                                    placeholder="Cari pesan..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button onClick={() => { setIsSearching(false); setSearchQuery(""); }} className="ml-2 p-2 hover:bg-muted rounded-full">
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="header-info"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 flex-1"
                        >
                            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-semibold text-primary-foreground overflow-hidden">
                                {contact.avatar ? (
                                    <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                                ) : (
                                    contact.initials
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-primary-foreground">{contact.name}</p>
                                <p className="text-[11px] text-primary-foreground/70">
                                    {contact.isOnline ? "online" : `last seen ${contact.lastSeen}`}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 text-primary-foreground/80">
                                <Search className="w-5 h-5 cursor-pointer hover:text-white transition-colors" onClick={() => setIsSearching(true)} />
                                <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Messages */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto wa-chat-bg px-4 py-3 min-h-0">
                <div className="space-y-1.5 pb-2">
                    {(isSearching ? filteredMessages : messages).map((msg, i, arr) => {
                        // Basic date header logic
                        let showDateHeader = false;
                        const prevMsg = arr[i - 1];
                        if (i === 0 || msg.date !== prevMsg?.date) {
                            showDateHeader = true;
                        }

                        // Highlight search term
                        const renderText = () => {
                            if (!searchQuery || !msg.text.toLowerCase().includes(searchQuery.toLowerCase())) return msg.text;

                            const parts = msg.text.split(new RegExp(`(${searchQuery})`, 'gi'));
                            return parts.map((part, idx) =>
                                part.toLowerCase() === searchQuery.toLowerCase()
                                    ? <span key={idx} className="bg-yellow-200 text-black px-0.5 rounded">{part}</span>
                                    : part
                            );
                        };

                        return (
                            <div key={msg.id || i}>
                                {showDateHeader && (
                                    <div className="flex justify-center my-4 sticky top-2 z-10">
                                        <span className="bg-[#EFEFEF]/90 dark:bg-zinc-800/90 text-[11px] text-muted-foreground px-3 py-1 rounded-lg shadow-sm backdrop-blur-[2px]">
                                            {getDateLabel(msg.date)}
                                        </span>
                                    </div>
                                )}
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`max-w-[75%] rounded-lg px-3 py-1.5 shadow-sm relative ${msg.fromMe ? "bg-bubble-me rounded-tr-none" : "bg-bubble-partner rounded-tl-none"}`}>
                                        <p className="text-[13px] text-foreground leading-relaxed">{renderText()}</p>
                                        <div className="flex items-center justify-end gap-1 mt-0.5">
                                            <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                                            {msg.fromMe && (
                                                <span className={`text-[10px] ${msg.read ? "text-accent" : "text-muted-foreground"}`}>
                                                    {msg.read ? "✓✓" : "✓"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                    {filteredMessages.length === 0 && isSearching && (
                        <div className="text-center py-10 text-muted-foreground text-sm">
                            Tidak ada pesan yang cocok dengan "{searchQuery}"
                        </div>
                    )}
                </div>
            </div>

            {/* Input */}
            <div className="px-2 py-2 bg-card border-t border-border flex items-center gap-2 shrink-0">
                <Smile className="w-6 h-6 text-muted-foreground cursor-pointer" />
                <Paperclip className="w-6 h-6 text-muted-foreground cursor-pointer" />

                <Input
                    className="flex-1 bg-muted rounded-full px-4 py-2 border-none focus-visible:ring-0"
                    placeholder="Ketik pesan"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />

                <div
                    onClick={handleSend}
                    className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                >
                    <Send className="w-5 h-5 text-primary-foreground" />
                </div>
            </div>
        </div>
    );
};

export default ChatWithContact;
