import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import ContactList from "@/components/ContactList";
import ChatWithContact from "@/pages/ChatWithContact";
import ModeSelection from "@/components/ModeSelection";
import AnalysisResult from "@/components/AnalysisResult";
import { type Contact, contacts } from "@/data/dummyData";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

interface AppMainProps {
  onBack: () => void;
}

type View = "select" | "result";

const AppMain = ({ onBack }: AppMainProps) => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [view, setView] = useState<View>("select");
  const [analysisMode, setAnalysisMode] = useState<string>("conflict");

  // Sync URL param with state
  useEffect(() => {
    if (contactId) {
      const found = contacts.find(c => c.id === contactId);
      if (found) {
        setSelectedContact(found);
      }
    } else {
      setSelectedContact(null);
    }
  }, [contactId]);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    setView("select");
    navigate(`/chat/${contact.id}`);
  };

  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleAnalyze = useCallback((mode: string, data: any) => {
    setAnalysisMode(mode);
    setAnalysisData(data);
    setView("result");
  }, []);

  const handleBackToMode = useCallback(() => {
    setView("select");
    setAnalysisData(null);
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
        {/* Contact list - always visible */}
        <div className="overflow-hidden shrink-0 h-full bg-card">
          <ContactList
            selectedId={selectedContact?.id ?? null}
            onSelect={handleContactSelect}
            collapsed={false}
          />
        </div>

        {/* Resizable chat + analysis */}
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={75} minSize={30}>
            <div className="h-full flex flex-col overflow-hidden">
              <ChatWithContact
                key={selectedContact?.id || "empty"}
                contact={selectedContact}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={25} maxSize={65}>
            <div className="h-full bg-card overflow-hidden">
              <AnimatePresence mode="wait">
                {view === "select" ? (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full"
                  >
                    <ModeSelection
                      onAnalyze={handleAnalyze}
                      contactSelected={!!selectedContact}
                      contact={selectedContact}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full"
                  >
                    {selectedContact && (
                      <AnalysisResult
                        contact={selectedContact}
                        onBack={handleBackToMode}
                        mode={analysisMode}
                        data={analysisData}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Footer */}
      <div className="h-8 bg-card border-t border-border flex items-center justify-center shrink-0">
        <p className="text-[10px] text-muted-foreground">Mockup visual • Tidak ada data yang tersimpan atau diproses</p>
      </div>
    </div>
  );
};

export default AppMain;
