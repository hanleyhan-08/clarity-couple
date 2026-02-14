import { motion } from "framer-motion";
import { Search, MoreVertical } from "lucide-react";
import { contacts, type Contact } from "@/data/dummyData";
import { useState } from "react";

interface ContactListProps {
  selectedId: string | null;
  onSelect: (contact: Contact) => void;
  collapsed?: boolean;
}

const ContactList = ({ selectedId, onSelect, collapsed = false }: ContactListProps) => {
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  if (collapsed) {
    return (
      <div className="w-16 bg-card border-r border-border flex flex-col items-center pt-4 gap-2">
        {contacts.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className={`w-10 h-10 rounded-full shrink-0 overflow-hidden transition-all ${selectedId === c.id
                ? "ring-2 ring-primary ring-offset-1"
                : "hover:ring-2 hover:ring-muted-foreground/30"
              }`}
          >
            <img
              src={c.avatar}
              alt={c.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center', 'bg-muted', 'text-muted-foreground', 'text-xs', 'font-semibold');
                (e.target as HTMLImageElement).parentElement!.textContent = c.initials;
              }}
            />
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full md:w-[340px] bg-card border-r border-border flex flex-col h-full">
      {/* WhatsApp-style header - fixed height to align with chat header */}
      <div className="gradient-primary px-4 h-[52px] flex items-center justify-between shrink-0">
        <h2 className="text-base font-semibold text-primary-foreground">Chats</h2>
        <div className="flex items-center gap-3 text-primary-foreground/80">
          <Search className="w-5 h-5 cursor-pointer hover:text-primary-foreground transition-colors" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:text-primary-foreground transition-colors" />
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 bg-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari atau mulai chat baru"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-muted rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => onSelect(c)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b border-border/50 ${selectedId === c.id
                ? "bg-primary/5"
                : "hover:bg-muted/50"
              }`}
          >
            {/* Avatar */}
            <div className={`w-12 h-12 rounded-full shrink-0 overflow-hidden ${selectedId === c.id
                ? "ring-2 ring-primary ring-offset-1"
                : ""
              }`}>
              <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                <span className={`text-[11px] ${c.unread > 0 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {c.time}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-xs text-muted-foreground truncate pr-2">
                  {c.lastMessage}
                </p>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full gradient-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
