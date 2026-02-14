import { motion } from "framer-motion";
import { chatMessages, type Contact } from "@/data/dummyData";
import { Search, MoreVertical, Smile, Paperclip, Mic } from "lucide-react";

interface ChatPreviewProps {
  contact: Contact | null;
}

const ChatPreview = ({ contact }: ChatPreviewProps) => {
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

  const messages = chatMessages[contact.id] || [];

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      {/* WhatsApp-style chat header */}
      <div className="gradient-primary px-4 h-[52px] flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-semibold text-primary-foreground overflow-hidden">
          {contact.avatar && contact.avatar.startsWith("http") ? (
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
          <Search className="w-5 h-5 cursor-pointer hover:text-primary-foreground" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:text-primary-foreground" />
        </div>
      </div>

      {/* Messages with WhatsApp wallpaper - scrollable */}
      <div className="flex-1 overflow-y-auto wa-chat-bg px-4 py-3 space-y-1.5 min-h-0">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-3 py-1.5 shadow-sm relative ${
                msg.fromMe
                  ? "bg-bubble-me rounded-tr-none"
                  : "bg-bubble-partner rounded-tl-none"
              }`}
            >
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
        ))}
      </div>

      {/* WhatsApp-style input - fixed at bottom */}
      <div className="px-2 py-2 bg-card border-t border-border flex items-center gap-2 shrink-0">
        <Smile className="w-6 h-6 text-muted-foreground cursor-pointer" />
        <Paperclip className="w-6 h-6 text-muted-foreground cursor-pointer" />
        <div className="flex-1 bg-muted rounded-full px-4 py-2">
          <p className="text-sm text-muted-foreground">Ketik pesan</p>
        </div>
        <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center cursor-pointer">
          <Mic className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
