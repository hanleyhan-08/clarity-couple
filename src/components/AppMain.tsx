import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import ContactList from "@/components/ContactList";
import ChatPreview from "@/components/ChatPreview";
import ModeSelection from "@/components/ModeSelection";
import AnalysisResult from "@/components/AnalysisResult";
import { type Contact } from "@/data/dummyData";
import { ArrowLeft, PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface AppMainProps {
  onBack: () => void;
}

type View = "select" | "result";

const AppMain = ({ onBack }: AppMainProps) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [view, setView] = useState<View>("select");
  const [analysisMode, setAnalysisMode] = useState<string>("conflict");
  const [showContactList, setShowContactList] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const handleAnalyze = useCallback((mode: string) => {
    setAnalysisMode(mode);
    setView("result");
  }, []);

  const handleBackToMode = useCallback(() => {
    setView("select");
  }, []);

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="h-12 gradient-primary flex items-center px-4 gap-3 shrink-0">
        <button onClick={onBack} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-primary-foreground text-sm">Clarity Couple</span>
        <span className="text-[10px] bg-primary-foreground/20 text-primary-foreground rounded-full px-2 py-0.5 font-medium">Beta</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {view === "select" ? (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex">
              <ContactList selectedId={selectedContact?.id ?? null} onSelect={setSelectedContact} />
              <ChatPreview contact={selectedContact} />
              <ModeSelection onAnalyze={handleAnalyze} contactSelected={!!selectedContact} />
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex-1 flex">
              {/* Toggleable contact list */}
              <AnimatePresence>
                {showContactList && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden shrink-0"
                  >
                    <ContactList
                      selectedId={selectedContact?.id ?? null}
                      onSelect={(c) => { setSelectedContact(c); setView("select"); }}
                      collapsed={!sidebarExpanded}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle buttons */}
              <div className="flex flex-col bg-card border-r border-border shrink-0">
                <button
                  onClick={() => setShowContactList(!showContactList)}
                  className="w-6 flex-1 flex items-center justify-center hover:bg-muted transition-colors"
                  title={showContactList ? "Sembunyikan kontak" : "Tampilkan kontak"}
                >
                  {showContactList ? (
                    <PanelLeftClose className="w-3.5 h-3.5 text-muted-foreground" />
                  ) : (
                    <PanelLeftOpen className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </button>
                {showContactList && (
                  <button
                    onClick={() => setSidebarExpanded(!sidebarExpanded)}
                    className="w-6 h-8 flex items-center justify-center hover:bg-muted transition-colors border-t border-border"
                    title={sidebarExpanded ? "Kecilkan sidebar" : "Perbesar sidebar"}
                  >
                    <span className="text-[9px] text-muted-foreground font-medium">
                      {sidebarExpanded ? "◀" : "▶"}
                    </span>
                  </button>
                )}
              </div>

              {/* Resizable chat + analysis */}
              <ResizablePanelGroup direction="horizontal" className="flex-1">
                <ResizablePanel defaultSize={55} minSize={30}>
                  <ChatPreview contact={selectedContact} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={45} minSize={25} maxSize={65}>
                  <div className="h-full bg-card overflow-hidden">
                    {selectedContact && (
                      <AnalysisResult contact={selectedContact} onBack={handleBackToMode} mode={analysisMode} />
                    )}
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="h-8 bg-card border-t border-border flex items-center justify-center shrink-0">
        <p className="text-[10px] text-muted-foreground">Mockup visual • Tidak ada data yang tersimpan atau diproses</p>
      </div>
    </div>
  );
};

export default AppMain;
