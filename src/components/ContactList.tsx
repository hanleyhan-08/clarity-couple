import { motion } from "framer-motion";
import { Search } from "lucide-react";
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
      <div className="w-16 bg-card border-r border-border flex flex-col items-center py-4 gap-3">
        {contacts.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              selectedId === c.id
                ? "gradient-primary text-primary-foreground ring-2 ring-primary/30"
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {c.avatar}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full md:w-72 bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground mb-3">Pilih Kontak Pasangan</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari kontak..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-muted rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((c, i) => (
          <motion.button
            key={c.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(c)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-l-2 ${
              selectedId === c.id
                ? "bg-primary/5 border-l-primary"
                : "border-l-transparent hover:bg-muted"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
                selectedId === c.id
                  ? "gradient-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {c.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
              <p className="text-xs text-muted-foreground">
                {c.status === "online" ? (
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success" />
                    Online
                  </span>
                ) : (
                  `Last seen ${c.lastSeen}`
                )}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
