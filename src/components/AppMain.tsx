import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContactList from "@/components/ContactList";
import ChatPreview from "@/components/ChatPreview";
import ModeSelection from "@/components/ModeSelection";
import AnalysisResult from "@/components/AnalysisResult";
import { type Contact } from "@/data/dummyData";
import { ArrowLeft } from "lucide-react";

interface AppMainProps {
  onBack: () => void;
}

type View = "select" | "result";

const AppMain = ({ onBack }: AppMainProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [view, setView] = useState<View>("select");

  const handleAnalyze = useCallback(() => {
    setView("result");
  }, []);

  const handleBackToMode = useCallback(() => {
    setView("select");
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="h-14 bg-card border-b border-border flex items-center px-4 gap-3 shrink-0">
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-bold">C</span>
        </div>
        <span className="font-semibold text-foreground text-sm">Clarity Couple</span>
        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 font-medium">Beta</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {view === "select" ? (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex"
            >
              <ContactList
                selectedId={selectedContact?.id ?? null}
                onSelect={setSelectedContact}
              />
              <ChatPreview contact={selectedContact} />
              <ModeSelection
                onAnalyze={handleAnalyze}
                contactSelected={!!selectedContact}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex"
            >
              <ContactList
                selectedId={selectedContact?.id ?? null}
                onSelect={(c) => {
                  setSelectedContact(c);
                  setView("select");
                }}
                collapsed
              />
              <ChatPreview contact={selectedContact} />
              <div className="w-full md:w-[420px] border-l border-border bg-card shrink-0">
                {selectedContact && (
                  <AnalysisResult contact={selectedContact} onBack={handleBackToMode} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="h-8 bg-card border-t border-border flex items-center justify-center shrink-0">
        <p className="text-[10px] text-muted-foreground">
          Mockup visual • Tidak ada data yang tersimpan atau diproses
        </p>
      </div>
    </div>
  );
};

export default AppMain;
