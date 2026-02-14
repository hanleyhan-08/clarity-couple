import { motion } from "framer-motion";
import { Copy, Check, ArrowLeft, AlertTriangle, Target, RefreshCw, MessageSquare, Users, Brain } from "lucide-react";
import { analysisResults, type Contact } from "@/data/dummyData";
import { useState } from "react";

interface AnalysisResultProps {
  contact: Contact;
  onBack: () => void;
}

const ScoreBar = ({ value, color }: { value: number; color: string }) => (
  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`h-full rounded-full ${color}`}
    />
  </div>
);

const AnalysisResult = ({ contact, onBack }: AnalysisResultProps) => {
  const [copied, setCopied] = useState(false);
  const result = analysisResults[contact.id];

  if (!result) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Brain className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Tidak ada data analisis</p>
          <p className="text-sm">untuk kontak ini</p>
          <button onClick={onBack} className="mt-4 text-sm text-primary hover:underline flex items-center gap-1 mx-auto">
            <ArrowLeft className="w-3 h-3" /> Kembali
          </button>
        </div>
      </div>
    );
  }

  const scoreColor =
    result.conflictScore <= 40 ? "bg-success" :
    result.conflictScore <= 65 ? "bg-warning" : "bg-destructive";

  const scoreBg =
    result.conflictScore <= 40 ? "bg-success/10 border-success/20" :
    result.conflictScore <= 65 ? "bg-warning/10 border-warning/20" : "bg-destructive/10 border-destructive/20";

  const handleCopy = () => {
    navigator.clipboard.writeText(result.rewrite.suggestion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sectionDelay = 0.1;

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
      {/* Back button */}
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke mode
      </button>

      {/* Conflict Score */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionDelay * 0 }}
        className={`rounded-xl p-5 border ${scoreBg}`}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Conflict Score
          </h3>
          <span className="text-2xl font-bold text-foreground">{result.conflictScore}/100</span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.conflictScore}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full rounded-full ${scoreColor}`}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{result.level === "Ringan" ? "🟢" : result.level === "Tegang" ? "🟡" : "🔴"} {result.level}</span>
          <span>Risiko: {result.conflictScore <= 40 ? "Rendah" : result.conflictScore <= 65 ? "Medium" : "Tinggi"}</span>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionDelay * 1 }}
        className="bg-card rounded-xl p-5 border border-border shadow-card"
      >
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          Ringkasan Konflik
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
      </motion.div>

      {/* Dual Perspective */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionDelay * 2 }}
      >
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Perspektif Dua Sisi
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-card rounded-xl p-4 border border-border shadow-card">
            <p className="text-xs font-semibold text-primary mb-2">💭 Kamu</p>
            <p className="text-xs text-muted-foreground mb-2 font-medium">Merasa:</p>
            <ul className="space-y-1 mb-3">
              {result.userPerspective.feelings.map((f) => (
                <li key={f} className="text-xs text-foreground flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-primary" /> {f}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground font-medium">Maksud:</p>
            <p className="text-xs text-foreground mt-0.5">{result.userPerspective.intention}</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border shadow-card">
            <p className="text-xs font-semibold text-accent mb-2">💬 Pasangan</p>
            <p className="text-xs text-muted-foreground mb-2 font-medium">Merasa:</p>
            <ul className="space-y-1 mb-3">
              {result.partnerPerspective.feelings.map((f) => (
                <li key={f} className="text-xs text-foreground flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-accent" /> {f}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground font-medium">Maksud:</p>
            <p className="text-xs text-foreground mt-0.5">{result.partnerPerspective.intention}</p>
          </div>
        </div>
        <div className="bg-destructive/5 border border-destructive/10 rounded-xl p-4">
          <p className="text-xs font-semibold text-destructive mb-1">❌ Titik Salah Tafsir:</p>
          <p className="text-xs text-foreground">{result.misinterpretation}</p>
        </div>
      </motion.div>

      {/* Pattern Detection */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionDelay * 3 }}
        className="bg-card rounded-xl p-5 border border-border shadow-card"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-primary" />
          Pola yang Terdeteksi
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Defensiveness</span>
              <span className="font-medium text-foreground">{result.patterns.defensiveness}%</span>
            </div>
            <ScoreBar value={result.patterns.defensiveness} color="gradient-primary" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Avoidance</span>
              <span className="font-medium text-foreground">{result.patterns.avoidance}%</span>
            </div>
            <ScoreBar value={result.patterns.avoidance} color="gradient-accent" />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Escalation Trigger</span>
              <span className="font-medium text-foreground">{result.patterns.escalation}%</span>
            </div>
            <ScoreBar value={result.patterns.escalation} color="bg-warning" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">🔄 Topik Berulang:</p>
          <div className="flex flex-wrap gap-1.5">
            {result.patterns.recurringTopics.map((t) => (
              <span key={t} className="text-xs bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Root Cause */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionDelay * 4 }}
        className="bg-card rounded-xl p-5 border border-border shadow-card"
      >
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Akar Masalah
        </h3>
        <ul className="space-y-2">
          {result.rootCauses.map((cause, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {cause}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Communication Rewrite */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionDelay * 5 }}
        className="bg-card rounded-xl p-5 border border-border shadow-card"
      >
        <h3 className="text-sm font-semibold text-foreground mb-3">✨ Saran Komunikasi Lebih Baik</h3>
        <div className="space-y-3">
          <div className="bg-destructive/5 rounded-lg p-3 border border-destructive/10">
            <p className="text-xs font-medium text-destructive mb-1">❌ Sebelum:</p>
            <p className="text-sm text-foreground italic">"{result.rewrite.original}"</p>
          </div>
          <div className="bg-success/5 rounded-lg p-3 border border-success/10">
            <p className="text-xs font-medium text-success mb-1">✅ Sesudah:</p>
            <p className="text-sm text-foreground">"{result.rewrite.suggestion}"</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="mt-3 w-full py-2 rounded-lg text-xs font-medium border border-border bg-muted hover:bg-primary/5 text-foreground transition-all flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Tersalin!" : "Copy Saran"}
        </button>
      </motion.div>

      {/* Disclaimer */}
      <p className="text-[10px] text-muted-foreground text-center pb-4">
        Hasil analisis dihasilkan oleh AI dan bersifat indikatif, bukan diagnosis profesional.
      </p>
    </div>
  );
};

export default AnalysisResult;
