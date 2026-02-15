import { useState } from "react";
import { motion } from "framer-motion";
import { analysisMode, sampleQuestions } from "@/data/dummyData";
import { ArrowRight, Loader2 } from "lucide-react";

import { useUUID } from "@/context/UUIDProvider";
import { type Contact } from "@/data/dummyData";
import { config } from "@/config";

interface ModeSelectionProps {
  onAnalyze: (mode: string, data: any) => void;
  contactSelected: boolean;
  contact?: Contact | null;
}

const ModeSelection = ({ onAnalyze, contactSelected, contact }: ModeSelectionProps) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const { userUUID } = useUUID();

  const handleAnalyze = async () => {
    if (!selectedMode || !contact || !userUUID) return;

    // For "question" mode (Chat), we don't need to call API here.
    // The ChatMode component will handle the initial fetching.
    if (selectedMode === "question") {
      onAnalyze(selectedMode, null);
      return;
    }

    setLoading(true);
    try {
      let endpoint = `${config.apiBaseUrl}/analysis/${selectedMode}`;
      let body: any = {
        user_uuid: userUUID,
        contact_id: contact.id
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error("Analysis failed");

      const data = await res.json();
      onAnalyze(selectedMode, data);
    } catch (e) {
      console.error("Analysis failed", e);
      // Optional: show error toast
      alert("Gagal melakukan analisis. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-card border-l border-border flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
          <p className="text-foreground font-medium">Menganalisis percakapan...</p>
          <p className="text-sm text-muted-foreground mt-1">🧠 AI sedang memproses</p>
          <div className="w-48 h-1.5 bg-muted rounded-full mt-4 mx-auto overflow-hidden">
            <motion.div
              className="h-full gradient-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-card border-l border-border p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-foreground mb-4">Pilih Mode Analisis</h3>

      <div className="space-y-3 mb-6">
        {analysisMode.map((mode) => (
          <motion.button
            key={mode.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMode(mode.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden ${selectedMode === mode.id
              ? "border-primary bg-primary/5 shadow-md"
              : "border-border hover:border-primary/30 hover:bg-muted/50"
              }`}
          >
            {"badge" in mode && mode.badge && (
              <span className="absolute top-2 right-2 text-[9px] font-bold bg-destructive text-destructive-foreground rounded-full px-2 py-0.5">
                {mode.badge}
              </span>
            )}
            <div className="flex items-start gap-3">
              <span className="text-xl">{mode.icon}</span>
              <div>
                <p className="text-sm font-medium text-foreground">{mode.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{mode.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {selectedMode === "question" && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-4">
          {/* Input removed, as we want to start a chat session instead */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-foreground">
            <p>Mode ini akan membuka sesi chat khusus dimana AI akan:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>Menganalisis konflik secara mendalam</li>
              <li>Menyiapkan 10 pertanyaan relevan untukmu</li>
              <li>Menjawab pertanyaanmu seputar hubungan ini</li>
            </ul>
          </div>
        </motion.div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!contactSelected || !selectedMode}
        className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${contactSelected && selectedMode
          ? "gradient-primary text-primary-foreground hover:opacity-90 shadow-lg"
          : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
      >
        {selectedMode === "quick-reply" ? "Dapatkan Balasan" : selectedMode === "question" ? "Mulai Chat" : "Mulai Analisis"}
        <ArrowRight className="w-4 h-4" />
      </button>

      {!contactSelected && (
        <p className="text-xs text-muted-foreground text-center mt-2">Pilih kontak terlebih dahulu</p>
      )}
    </div>
  );
};

export default ModeSelection;
