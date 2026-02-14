import { useState } from "react";
import { motion } from "framer-motion";
import { analysisMode, sampleQuestions } from "@/data/dummyData";
import { ArrowRight, Loader2 } from "lucide-react";

interface ModeSelectionProps {
  onAnalyze: () => void;
  contactSelected: boolean;
}

const ModeSelection = ({ onAnalyze, contactSelected }: ModeSelectionProps) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAnalyze();
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
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
    <div className="w-full md:w-80 bg-card border-l border-border p-4 overflow-y-auto">
      <h3 className="text-sm font-semibold text-foreground mb-4">Pilih Mode Analisis</h3>

      <div className="space-y-3 mb-6">
        {analysisMode.map((mode) => (
          <motion.button
            key={mode.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMode(mode.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedMode === mode.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/30 hover:bg-muted/50"
            }`}
          >
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
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-4"
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Tanyakan sesuatu tentang percakapan ini..."
            className="w-full bg-muted rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/30 border border-border"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setQuestion(q)}
                className="text-xs bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full px-3 py-1 transition-colors border border-border"
              >
                {q}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!contactSelected || !selectedMode}
        className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
          contactSelected && selectedMode
            ? "gradient-primary text-primary-foreground hover:opacity-90 shadow-lg"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {selectedMode === "question" ? "Analisis" : "Mulai Analisis"}
        <ArrowRight className="w-4 h-4" />
      </button>

      {!contactSelected && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Pilih kontak terlebih dahulu
        </p>
      )}
    </div>
  );
};

export default ModeSelection;
