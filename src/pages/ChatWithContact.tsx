import { motion } from "framer-motion";
import { type Contact, chatMessages } from "@/data/dummyData";
import { Search, MoreVertical, Smile, Paperclip, Send } from "lucide-react";
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
    const { userUUID } = useUUID();
    const [inputMessage, setInputMessage] = useState("");
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    // Helper for date headers
    const getDateLabel = (dateStr?: string) => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isToday(date)) return "Hari Ini";
        if (isYesterday(date)) return "Kemarin";
        return format(date, "dd/MM/yyyy", { locale: idLocale });
    };

    // 1. Fetch History from Backend
    const { data: backendHistory, isLoading } = useQuery({
        queryKey: ["chat", contact?.id],
        queryFn: async () => {
            if (!contact || !userUUID) return [];
            // Only fetch from backend for ID > 5 in real app, but here we can try fetching all 
            // or mix. For now, let's fetch backend if it exists.
            try {
                const res = await fetch(`${config.apiBaseUrl}/chat/${userUUID}/${contact.id}/history`);
                if (!res.ok) return [];
                const data = await res.json();
                return data.map((msg: any) => ({
                    id: msg.id,
                    text: msg.message,
                    sender: msg.sender === "user" ? "user" : "partner", // backend 'ai' mapped to partner for UI?
                    fromMe: msg.sender === "user",
                    time: format(new Date(msg.created_at), "HH:mm"),
                    date: format(new Date(msg.created_at), "yyyy-MM-dd"),
                    read: true
                }));
            } catch (e) {
                console.error("Failed to fetch history", e);
                return [];
            }
        },
        enabled: !!contact && !!userUUID
    });

    // 2. Merge Logic
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!contact) return;

        // Load from LocalStorage first
        const saved = localStorage.getItem(`chat_${contact.id}_${userUUID}`);
        let initialMessages: Message[] = [];

        if (saved) {
            try {
                initialMessages = JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse local history", e);
            }
        }

        // If no local, use dummy for contacts 1-5
        if (initialMessages.length === 0 && contact.id && parseInt(contact.id) <= 5) {
            initialMessages = chatMessages[contact.id] || [];
        }

        // If we have backend history, it takes precedence (or merges?)
        // For simplicity: If backend has data, we trust it as the source of truth for *synced* messages.
        // We might want to preserve "pending" messages from local if we had complex logic, but for now:
        // Use Backend if available, else Local/Dummy.

        if (backendHistory && backendHistory.length > 0) {
            setMessages(backendHistory);
            // Update local storage with fresh backend data
            localStorage.setItem(`chat_${contact.id}_${userUUID}`, JSON.stringify(backendHistory));
        } else {
            // If backend is empty (new session) but we have local/dummy, show that.
            if (messages.length === 0) {
                setMessages(initialMessages);
            }
        }
    }, [contact, backendHistory, userUUID]); // Removed messages dependency to avoid loops

    // Save to local storage whenever messages change
    useEffect(() => {
        if (contact && userUUID && messages.length > 0) {
            localStorage.setItem(`chat_${contact.id}_${userUUID}`, JSON.stringify(messages));
        }
    }, [messages, contact, userUUID]);


    // 3. Send Message Mutation
    const sendMessageMutation = useMutation({
        mutationFn: async (text: string) => {
            if (!userUUID || !contact) throw new Error("No user or contact");

            const res = await fetch(`${config.apiBaseUrl}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_uuid: userUUID,
                    contact_id: contact.id,
                    message: text
                })
            });

            if (!res.ok) throw new Error("Failed to send");
            return res.json();
        },
        onSuccess: (data) => {
            // Invalidate history to refetch
            queryClient.invalidateQueries({ queryKey: ["chat", contact?.id] });
        }
    });

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
        sendMessageMutation.mutate(inputMessage);
        setInputMessage("");
    };

    useLayoutEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [messages, contact]);

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

    return (
        <div className="flex-1 flex flex-col h-full bg-background">
            {/* Header */}
            <div className="gradient-primary px-4 h-[52px] flex items-center gap-3 shrink-0">
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
                    <Search className="w-5 h-5 cursor-pointer" />
                    <MoreVertical className="w-5 h-5 cursor-pointer" />
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto wa-chat-bg px-4 py-3 min-h-0">
                <div className="space-y-1.5 pb-2">
                    {messages.map((msg, i) => {
                        // Basic date header logic
                        let showDateHeader = false;
                        if (i === 0 || msg.date !== messages[i - 1].date) {
                            showDateHeader = true;
                        }

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
                                        <p className="text-[13px] text-foreground leading-relaxed">{msg.text}</p>
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
                    {sendMessageMutation.isPending && (
                        <div className="flex justify-start">
                            <div className="bg-bubble-partner rounded-lg px-3 py-1.5 shadow-sm">
                                <p className="text-[13px] italic text-muted-foreground">Mengetik...</p>
                            </div>
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
