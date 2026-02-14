import { motion } from "framer-motion";
import { Copy, Check, ArrowLeft, AlertTriangle, Target, RefreshCw, MessageSquare, Users, Brain } from "lucide-react";
import { dummyAnalysis, chatMessages as chatMsgs, type Contact } from "@/data/dummyData";
import { useState } from "react";

interface AnalysisResultProps {
  contact: Contact;
  onBack: () => void;
  mode: string;
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

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Tersalin!" : "Copy"}
    </button>
  );
};

const AnalysisResult = ({ contact, onBack, mode }: AnalysisResultProps) => {
  const analysis = dummyAnalysis[contact.id];

  if (!analysis) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Brain className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-medium">Tidak ada data analisis</p>
          <button onClick={onBack} className="mt-4 text-sm text-primary hover:underline flex items-center gap-1 mx-auto">
            <ArrowLeft className="w-3 h-3" /> Kembali
          </button>
        </div>
      </div>
    );
  }

  const { quickReply, conflictAnalysis: ca, patternDetection: pd } = analysis;
  const chatCount = chatMsgs[contact.id]?.length || 0;
  const sectionDelay = 0.1;

  const scoreColor = ca.score <= 40 ? "bg-success" : ca.score <= 65 ? "bg-warning" : "bg-destructive";
  const scoreBg = ca.score <= 40 ? "bg-success/10 border-success/20" : ca.score <= 65 ? "bg-warning/10 border-warning/20" : "bg-destructive/10 border-destructive/20";
  const scoreLabel = ca.score <= 40 ? "🟢 Sehat" : ca.score <= 65 ? "🟡 Tegang" : "🔴 Tinggi";

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke mode
      </button>

      {/* Quick Reply Mode */}
      {mode === "quick-reply" && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div>
            <h3 className="text-base font-bold text-foreground">💬 3 Opsi Balasan Sekarang</h3>
            <p className="text-xs text-muted-foreground">Berdasarkan {chatCount} chat terakhir</p>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-primary flex items-center gap-1">🧊 Versi Tenang</span>
              <CopyButton text={quickReply.calm.text} />
            </div>
            <p className="text-sm text-foreground italic mb-2">"{quickReply.calm.text}"</p>
            <p className="text-xs text-success">✅ Kenapa ini cocok: {quickReply.calm.reason}</p>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-warning flex items-center gap-1">💪 Versi Tegas tapi Sehat</span>
              <CopyButton text={quickReply.firm.text} />
            </div>
            <p className="text-sm text-foreground italic mb-2">"{quickReply.firm.text}"</p>
            <p className="text-xs text-success">✅ Kenapa ini cocok: {quickReply.firm.reason}</p>
          </div>

          <div className="bg-card rounded-xl p-4 border border-border shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-primary flex items-center gap-1">💚 Versi Empatik</span>
              <CopyButton text={quickReply.empathetic.text} />
            </div>
            <p className="text-sm text-foreground italic mb-2">"{quickReply.empathetic.text}"</p>
            <p className="text-xs text-success">✅ Kenapa ini cocok: {quickReply.empathetic.reason}</p>
          </div>

          <div className="bg-warning/10 border border-warning/20 rounded-xl p-3">
            <p className="text-xs text-foreground">
              ⚠️ <span className="font-medium">Catatan:</span> Pilih balasan yang paling sesuai dengan perasaan kamu saat ini. Tidak ada jawaban yang "paling benar" — yang penting jujur dan konstruktif.
            </p>
          </div>
        </motion.div>
      )}

      {(mode === "conflict" || mode === "pattern" || mode === "question") && (
        <>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 0 }} className={`rounded-xl p-5 border ${scoreBg}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Conflict Score</h3>
              <span className="text-2xl font-bold text-foreground">{ca.score}/100</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
              <motion.div initial={{ width: 0 }} animate={{ width: `${ca.score}%` }} transition={{ duration: 1, ease: "easeOut" }} className={`h-full rounded-full ${scoreColor}`} />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{scoreLabel}</span>
              <span>Risiko: {ca.score <= 40 ? "Rendah" : ca.score <= 65 ? "Medium" : "Tinggi"}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 1 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> Ringkasan Konflik</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{ca.summary}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 2 }}>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Perspektif Dua Sisi</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-card rounded-xl p-4 border border-border shadow-card">
                <p className="text-xs font-semibold text-primary mb-2">💭 Kamu</p>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Merasa:</p>
                <ul className="space-y-1 mb-3">
                  {ca.perspectives.you.feels.map((f) => (
                    <li key={f} className="text-xs text-foreground flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> {f}</li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground font-medium">Maksud:</p>
                <p className="text-xs text-foreground mt-0.5">{ca.perspectives.you.means}</p>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border shadow-card">
                <p className="text-xs font-semibold text-accent mb-2">💬 Pasangan</p>
                <p className="text-xs text-muted-foreground mb-1 font-medium">Merasa:</p>
                <ul className="space-y-1 mb-3">
                  {ca.perspectives.partner.feels.map((f) => (
                    <li key={f} className="text-xs text-foreground flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent" /> {f}</li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground font-medium">Maksud:</p>
                <p className="text-xs text-foreground mt-0.5">{ca.perspectives.partner.means}</p>
              </div>
            </div>
            <div className="bg-destructive/5 border border-destructive/10 rounded-xl p-4">
              <p className="text-xs font-semibold text-destructive mb-1">❌ Titik Salah Tafsir:</p>
              <p className="text-xs text-foreground">{ca.perspectives.misunderstanding}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 3 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2"><RefreshCw className="w-4 h-4 text-primary" /> Pola yang Terdeteksi</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Defensiveness</span><span className="font-medium text-foreground">{ca.patterns.defensiveness}%</span></div>
                <ScoreBar value={ca.patterns.defensiveness} color="gradient-primary" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Avoidance</span><span className="font-medium text-foreground">{ca.patterns.avoidance}%</span></div>
                <ScoreBar value={ca.patterns.avoidance} color="gradient-accent" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Escalation Trigger</span><span className="font-medium text-foreground">{ca.patterns.escalation}%</span></div>
                <ScoreBar value={ca.patterns.escalation} color="bg-warning" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground mb-2">🔄 Topik Berulang:</p>
              <div className="flex flex-wrap gap-1.5">
                {ca.patterns.repeatedTopics.map((t) => (
                  <span key={t} className="text-xs bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-medium">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 4 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> Akar Masalah</h3>
            <ul className="space-y-2">
              {ca.rootCause.map((cause, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold shrink-0 mt-0.5">{i + 1}</span>
                  {cause}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 5 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">✨ Saran Komunikasi Lebih Baik</h3>
            <div className="space-y-3">
              <div className="bg-destructive/5 rounded-lg p-3 border border-destructive/10">
                <p className="text-xs font-medium text-destructive mb-1">❌ Sebelum:</p>
                <p className="text-sm text-foreground italic">"{ca.betterResponse.original}"</p>
              </div>
              <div className="bg-success/5 rounded-lg p-3 border border-success/10">
                <p className="text-xs font-medium text-success mb-1">✅ Sesudah:</p>
                <p className="text-sm text-foreground">"{ca.betterResponse.improved}"</p>
              </div>
            </div>
            <div className="mt-3"><CopyButton text={ca.betterResponse.improved} /></div>
          </motion.div>

          {mode === "pattern" && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 6 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-3">📊 Detail Pola</h3>
              <p className="text-xs font-medium text-primary mb-1">{pd.mainPattern}</p>
              <p className="text-xs text-muted-foreground mb-3">{pd.frequency}</p>
              <p className="text-xs font-medium text-foreground mb-1">Siklus:</p>
              <p className="text-xs text-muted-foreground mb-3">{pd.cycle}</p>
              <p className="text-xs font-medium text-foreground mb-1">Trigger:</p>
              <ul className="space-y-1 mb-3">
                {pd.triggers.map((t) => (
                  <li key={t} className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-warning" /> {t}</li>
                ))}
              </ul>
              <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                <p className="text-xs text-foreground">💡 <span className="font-medium">Rekomendasi:</span> {pd.recommendation}</p>
              </div>
            </motion.div>
          )}
        </>
      )}

      <p className="text-[10px] text-muted-foreground text-center pb-4">
        Hasil analisis dihasilkan oleh AI dan bersifat indikatif, bukan diagnosis profesional.
      </p>
    </div>
  );
};

export default AnalysisResult;
