import { motion } from "framer-motion";
import { chatMessages, type Contact } from "@/data/dummyData";

interface ChatPreviewProps {
  contact: Contact | null;
}

const ChatPreview = ({ contact }: ChatPreviewProps) => {
  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium">Pilih kontak</p>
          <p className="text-sm">untuk melihat percakapan</p>
        </div>
      </div>
    );
  }

  const messages = chatMessages[contact.id] || [];

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-border flex items-center gap-3 bg-card">
        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
          {contact.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{contact.name}</p>
          <p className="text-xs text-muted-foreground">
            {contact.status === "online" ? "Online" : `Last seen ${contact.lastSeen}`}
          </p>
        </div>
        <div className="ml-auto">
          <select className="text-xs bg-muted rounded-md px-2 py-1 text-muted-foreground border border-border focus:outline-none">
            <option>200 pesan terakhir</option>
            <option>7 hari terakhir</option>
            <option>30 hari terakhir</option>
          </select>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.sender === "user"
                  ? "gradient-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-[10px] mt-1 ${
                  msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChatPreview;
