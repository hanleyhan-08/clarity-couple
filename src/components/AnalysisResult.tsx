import { motion } from "framer-motion";
import { Copy, Check, ArrowLeft, AlertTriangle, Target, RefreshCw, MessageSquare, Users, Brain, Send, Loader2, User, Bot } from "lucide-react";
import { dummyAnalysis, chatMessages, type Contact } from "@/data/dummyData";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { config } from "@/config";
import { useUUID } from "@/context/UUIDProvider";

interface AnalysisResultProps {
  contact: Contact;
  onBack: () => void;
  mode: string;
  data?: any;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground transition-colors"
      title="Salin teks"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};

const ScoreBar = ({ value, color }: { value: number, color: string }) => (
  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`h-full rounded-full ${color.startsWith("bg-") ? color : ""}`}
      style={!color.startsWith("bg-") ? { background: `var(--${color})` } : {}}
    />
  </div>
);

// Sub-component for Chat Mode
const ChatMode = ({ contact }: { contact: any }) => {
  const { userUUID } = useUUID();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const STORAGE_KEY = `chat_analysis_${contact.id}_${userUUID}`;

  const MarkdownContent = ({ children }: { children: string }) => (
    <div className="prose prose-sm dark:prose-invert max-w-none text-foreground prose-p:leading-relaxed prose-p:my-0">
      <ReactMarkdown>
        {children}
      </ReactMarkdown>
    </div>
  );

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const loadHistory = async () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check expiry (24h)
      const now = new Date().getTime();
      if (now - parsed.timestamp < 24 * 60 * 60 * 1000) {
        setMessages(parsed.messages);
        return;
      }
    }

    // If no valid history, generate initial questions
    await generateInitialQuestions();
  };

  const saveHistory = (newMessages: any[]) => {
    setMessages(newMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      timestamp: new Date().getTime(),
      messages: newMessages
    }));
  };

  const generateInitialQuestions = async () => {
    setInitialLoading(true);
    try {
      const res = await fetch(`${config.apiBaseUrl}/analysis/key-questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_uuid: userUUID, contact_id: contact.id })
      });

      if (!res.ok) throw new Error("Failed to generate questions");

      const data = await res.json();

      // Transform new structure (questions: string[], answers: {[q]: a}) -> [{id, question, answer}]
      let transformedQuestions = [];

      if (Array.isArray(data.questions)) {
        // New format: { questions: ["q1", "q2"], answers: {"q1": "a1"} }
        transformedQuestions = data.questions.map((q: string, idx: number) => ({
          id: idx + 1,
          question: q,
          // Access answer from dict using question text as key
          answer: data.answers ? data.answers[q] : "Maaf, jawaban tidak tersedia."
        }));
      } else if (data.questions && Array.isArray(data.questions) && typeof data.questions[0] === 'object') {
        // Fallback to old format if backend reverts
        transformedQuestions = data.questions;
      }

      const initialMsg = {
        id: Date.now(),
        role: "ai",
        content: `Halo! Saya telah menganalisis percakapan kamu dengan ${contact.name}. Berikut adalah 10 pertanyaan yang mungkin relevan untuk kita bahas mendalam:`,
        options: transformedQuestions
      };

      saveHistory([initialMsg]);
    } catch (e) {
      console.error(e);
      const errorMsg = {
        id: Date.now(),
        role: "ai",
        content: "Maaf, saya mengalami kendala saat menganalisis. Kamu bisa langsung bertanya apa saja kepadaku."
      };
      saveHistory([errorMsg]);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSend = async (text: string, isOption: boolean = false) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), role: "user", content: text };
    const newHistory = [...messages, userMsg];
    saveHistory(newHistory);
    setInput("");
    setLoading(true);

    try {
      // Logic: Check if we have the answer in the last AI message's options
      const lastAiMsg = messages[messages.length - 1];
      let answer = null;

      if (isOption && lastAiMsg?.options) {
        const selected = lastAiMsg.options.find((o: any) => o.question === text);
        if (selected) answer = selected.answer;
      }

      if (!answer) {
        const res = await fetch(`${config.apiBaseUrl}/analysis/question`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_uuid: userUUID,
            contact_id: contact.id,
            question: text
          })
        });
        const data = await res.json();
        answer = data.answer;
      }

      const aiMsg = { id: Date.now() + 1, role: "ai", content: answer };
      saveHistory([...newHistory, aiMsg]);

    } catch (e) {
      console.error(e);
      const errorMsg = {
        id: Date.now() + 1,
        role: "ai",
        content: "Maaf, terjadi kesalahan saat memproses pertanyaanmu."
      };
      saveHistory([...newHistory, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <div>
          <p className="font-semibold text-foreground">Sedang merumuskan pertanyaan...</p>
          <p className="text-sm text-muted-foreground">AI sedang membaca pola konflik kalian</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 p-2 custom-scrollbar">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {msg.role === "ai" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>

            <div className={`max-w-[85%] space-y-2`}>
              <div className={`p-4 rounded-2xl text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border border-border rounded-tl-sm shadow-sm"}`}>
                {msg.role === "user" ? <p>{msg.content}</p> : <MarkdownContent>{msg.content}</MarkdownContent>}
              </div>

              {msg.options && (
                <div className="space-y-2 pl-2">
                  <p className="text-xs font-semibold text-muted-foreground">Pilih pertanyaan yang relevan:</p>
                  <div className="flex flex-col gap-2">
                    {msg.options.map((opt: any) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSend(opt.question, true)}
                        className="text-left text-sm p-3 bg-muted/50 hover:bg-primary/5 border border-transparent hover:border-primary/20 rounded-xl transition-all active:scale-[0.99]"
                      >
                        {opt.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-card border border-border p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span className="text-sm text-muted-foreground">Mengetik jawaban...</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2 pt-4 border-t border-border">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          placeholder="Tanyakan sesuatu..."
          disabled={loading}
          className="flex-1 bg-muted px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          onClick={() => handleSend(input)}
          disabled={loading || !input.trim()}
          className="bg-primary text-primary-foreground w-11 h-11 rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const AnalysisResult = ({ contact, onBack, mode, data }: AnalysisResultProps) => {
  // Use data from API if available, otherwise fallback to dummy (for demo purposes)
  const analysis = data || dummyAnalysis[contact.id];

  if (!analysis && mode !== "question") { // Allow question mode to render without initial analysis data
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

  const { contact: c, quickReply: qrDict, conflictAnalysis: ca, patternDetection: pd } = analysis || {};

  // Handle both nested structure (dummyData) and flat structure (API)
  // API returns { calm: {...}, firm: {...}, empathetic: {...} } directly
  // Dummy data returns { quickReply: { calm: ... } }
  const quickReply = qrDict || (analysis?.calm ? analysis : null);

  const chatCount = chatMessages[contact.id]?.length || 0;
  const sectionDelay = 0.1;

  // Safe access for score to prevent crash in 'question' mode
  const score = ca?.score || 0;
  const scoreColor = score <= 40 ? "bg-success" : score <= 65 ? "bg-warning" : "bg-destructive";
  const scoreBg = score <= 40 ? "bg-success/10 border-success/20" : score <= 65 ? "bg-warning/10 border-warning/20" : "bg-destructive/10 border-destructive/20";
  const scoreLabel = score <= 40 ? "🟢 Sehat" : score <= 65 ? "🟡 Tegang" : "🔴 Tinggi";

  const MarkdownContent = ({ children }: { children: string }) => (
    <div className="prose prose-sm dark:prose-invert max-w-none text-foreground prose-p:leading-relaxed prose-p:my-0">
      <ReactMarkdown>
        {children}
      </ReactMarkdown>
    </div>
  );

  return (
    <div className="h-full flex flex-col p-4 md:p-5">
      <div className="flex-none mb-3">
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke mode
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden relative">
        {mode === "question" ? (
          <ChatMode contact={contact} />
        ) : (
          <div className="h-full overflow-y-auto space-y-4 custom-scrollbar pr-1 pb-2">
            {/* Quick Reply Mode */}
            {mode === "quick-reply" && quickReply && (
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
                  <div className="text-xs text-success flex gap-1 items-start">
                    <span>✅</span>
                    <div>
                      <span className="font-semibold">Kenapa ini cocok:</span>
                      <MarkdownContent>{quickReply.calm.reason}</MarkdownContent>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-4 border border-border shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-warning flex items-center gap-1">💪 Versi Tegas tapi Sehat</span>
                    <CopyButton text={quickReply.firm.text} />
                  </div>
                  <p className="text-sm text-foreground italic mb-2">"{quickReply.firm.text}"</p>
                  <div className="text-xs text-success flex gap-1 items-start">
                    <span>✅</span>
                    <div>
                      <span className="font-semibold">Kenapa ini cocok:</span>
                      <MarkdownContent>{quickReply.firm.reason}</MarkdownContent>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-4 border border-border shadow-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-primary flex items-center gap-1">💚 Versi Empatik</span>
                    <CopyButton text={quickReply.empathetic.text} />
                  </div>
                  <p className="text-sm text-foreground italic mb-2">"{quickReply.empathetic.text}"</p>
                  <div className="text-xs text-success flex gap-1 items-start">
                    <span>✅</span>
                    <div>
                      <span className="font-semibold">Kenapa ini cocok:</span>
                      <MarkdownContent>{quickReply.empathetic.reason}</MarkdownContent>
                    </div>
                  </div>
                </div>

                <div className="bg-warning/10 border border-warning/20 rounded-xl p-3">
                  <p className="text-xs text-foreground">
                    ⚠️ <span className="font-medium">Catatan:</span> Pilih balasan yang paling sesuai dengan perasaan kamu saat ini. Tidak ada jawaban yang "paling benar" — yang penting jujur dan konstruktif.
                  </p>
                </div>
              </motion.div>
            )}

            {(mode === "conflict" || mode === "pattern") && ca && (
              <>
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 0 }} className={`rounded-xl p-5 border ${scoreBg}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Conflict Score</h3>
                    <span className="text-2xl font-bold text-foreground">{score}/100</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1, ease: "easeOut" }} className={`h-full rounded-full ${scoreColor}`} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{scoreLabel}</span>
                    <span>Risiko: {score <= 40 ? "Rendah" : score <= 65 ? "Medium" : "Tinggi"}</span>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 1 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> Ringkasan Konflik</h3>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    <MarkdownContent>{ca.summary}</MarkdownContent>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 2 }}>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Perspektif Dua Sisi</h3>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-card rounded-xl p-4 border border-border shadow-card">
                      <p className="text-xs font-semibold text-primary mb-2">💭 Kamu</p>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">Merasa:</p>
                      <ul className="space-y-1 mb-3">
                        {ca.perspectives.you.feels.map((f: string) => (
                          <li key={f} className="text-xs text-foreground flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-primary" /> {f}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground font-medium">Maksud:</p>
                      <div className="text-xs text-foreground mt-0.5">
                        <MarkdownContent>{ca.perspectives.you.means}</MarkdownContent>
                      </div>
                    </div>
                    <div className="bg-card rounded-xl p-4 border border-border shadow-card">
                      <p className="text-xs font-semibold text-accent mb-2">💬 Pasangan</p>
                      <p className="text-xs text-muted-foreground mb-1 font-medium">Merasa:</p>
                      <ul className="space-y-1 mb-3">
                        {ca.perspectives.partner.feels.map((f: string) => (
                          <li key={f} className="text-xs text-foreground flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-accent" /> {f}</li>
                        ))}
                      </ul>
                      <p className="text-xs text-muted-foreground font-medium">Maksud:</p>
                      <div className="text-xs text-foreground mt-0.5">
                        <MarkdownContent>{ca.perspectives.partner.means}</MarkdownContent>
                      </div>
                    </div>
                  </div>
                  <div className="bg-destructive/5 border border-destructive/10 rounded-xl p-4">
                    <p className="text-xs font-semibold text-destructive mb-1">❌ Titik Salah Tafsir:</p>
                    <div className="text-xs text-foreground">
                      <MarkdownContent>{ca.perspectives.misunderstanding}</MarkdownContent>
                    </div>
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
                      {ca.patterns.repeatedTopics.map((t: string) => (
                        <span key={t} className="text-xs bg-primary/10 text-primary rounded-full px-2.5 py-0.5 font-medium">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 4 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> Akar Masalah</h3>
                  <ul className="space-y-2">
                    {ca.rootCause.map((cause: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold shrink-0 mt-0.5">{i + 1}</span>
                        <MarkdownContent>{cause}</MarkdownContent>
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
                      <div className="text-sm text-foreground">
                        <MarkdownContent>{ca.betterResponse.improved}</MarkdownContent>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3"><CopyButton text={ca.betterResponse.improved} /></div>
                </motion.div>

                {mode === "pattern" && pd && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: sectionDelay * 6 }} className="bg-card rounded-xl p-5 border border-border shadow-card">
                    <h3 className="text-sm font-semibold text-foreground mb-3">📊 Detail Pola</h3>
                    <div className="mb-3">
                      <p className="text-xs font-medium text-primary mb-1">Pola Utama:</p>
                      <MarkdownContent>{pd.mainPattern}</MarkdownContent>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{pd.frequency}</p>
                    <div className="mb-3">
                      <p className="text-xs font-medium text-foreground mb-1">Siklus:</p>
                      <MarkdownContent>{pd.cycle}</MarkdownContent>
                    </div>
                    <p className="text-xs font-medium text-foreground mb-1">Trigger:</p>
                    <ul className="space-y-1 mb-3">
                      {pd.triggers.map((t: string) => (
                        <li key={t} className="text-xs text-muted-foreground flex items-center gap-1.5 font-normal">
                          <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                          <MarkdownContent>{t}</MarkdownContent>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                      <p className="text-xs text-foreground">💡 <span className="font-medium">Rekomendasi:</span></p>
                      <div className="text-xs text-foreground mt-1 text-normal">
                        <MarkdownContent>{pd.recommendation}</MarkdownContent>
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex-none pt-2 mt-auto">
        <p className="text-[10px] text-muted-foreground text-center">
          Hasil analisis dihasilkan oleh AI dan bersifat indikatif, bukan diagnosis profesional.
        </p>
      </div>
    </div>
  );
};



export default AnalysisResult;
