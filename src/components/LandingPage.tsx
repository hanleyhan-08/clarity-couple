import { motion } from "framer-motion";
import { MessageCircle, Shield, Zap, Heart, Lock, Brain } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const features = [
  { icon: MessageCircle, title: "Analisis Chat", desc: "Upload percakapan WhatsApp untuk dianalisis AI" },
  { icon: Shield, title: "100% Private", desc: "Data tidak disimpan, hanya di session kamu" },
  { icon: Brain, title: "AI-Powered", desc: "Dapatkan insight mendalam dalam hitungan detik" },
  { icon: Heart, title: "Netral & Adil", desc: "AI mediator yang tidak memihak siapapun" },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="container mx-auto px-4 py-16 md:py-28 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm px-4 py-1.5 text-sm text-primary-foreground/90 mb-6 border border-primary-foreground/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground" />
              </span>
              Beta — Gratis untuk dicoba
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Pahami Konflik Hubungan dari{" "}
              <span className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-3 py-1">Chat Asli</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              AI mediator netral yang menganalisis percakapan WhatsApp kamu. Temukan akar masalah, pahami perspektif pasangan, dan perbaiki komunikasi.
            </motion.p>

            <motion.div variants={itemVariants}>
              <button
                onClick={onStart}
                className="inline-flex items-center gap-3 bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-primary-foreground/20"
              >
                <MessageCircle className="w-6 h-6" />
                Mulai Sekarang
              </button>
            </motion.div>

            {/* Floating phone mockup */}
            <motion.div
              variants={itemVariants}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="mt-12 mx-auto w-64 h-[400px] bg-primary-foreground/10 backdrop-blur-md rounded-[2.5rem] border border-primary-foreground/20 p-3 shadow-2xl"
            >
              <div className="bg-card rounded-[2rem] h-full overflow-hidden flex flex-col">
                {/* Phone header */}
                <div className="gradient-primary px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold text-primary-foreground">SP</div>
                  <div>
                    <p className="text-xs font-semibold text-primary-foreground">Sarah Putri</p>
                    <p className="text-[10px] text-primary-foreground/70">Online</p>
                  </div>
                </div>
                {/* Chat bubbles */}
                <div className="flex-1 wa-chat-bg p-3 space-y-2">
                  <div className="flex justify-start">
                    <div className="bg-bubble-partner rounded-xl rounded-bl-sm px-3 py-1.5 max-w-[80%] shadow-sm">
                      <p className="text-[10px] text-foreground">Kamu kok dingin banget sih?</p>
                      <p className="text-[8px] text-muted-foreground text-right">14:20</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-bubble-me rounded-xl rounded-br-sm px-3 py-1.5 max-w-[80%] shadow-sm">
                      <p className="text-[10px] text-foreground">Lagi banyak pikiran aja</p>
                      <p className="text-[8px] text-muted-foreground text-right">14:22 ✓✓</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-bubble-partner rounded-xl rounded-bl-sm px-3 py-1.5 max-w-[80%] shadow-sm">
                      <p className="text-[10px] text-foreground">Kok gak cerita ke aku?</p>
                      <p className="text-[8px] text-muted-foreground text-right">14:23</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-bubble-me rounded-xl rounded-br-sm px-3 py-1.5 max-w-[80%] shadow-sm">
                      <p className="text-[10px] text-foreground">Deadline besok, sayang</p>
                      <p className="text-[8px] text-muted-foreground text-right">14:25 ✓✓</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-6 mt-10 text-primary-foreground/70 text-sm">
              <span className="flex items-center gap-1.5"><Lock className="w-4 h-4" /> 100% Private</span>
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> No Login Required</span>
              <span className="flex items-center gap-1.5"><Brain className="w-4 h-4" /> AI-Powered Analysis</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={itemVariants}
                className="bg-background rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
              >
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-border bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Clarity Couple. All rights reserved.
          </p>
        </div>
      </footer >
    </div >
  );
};

export default LandingPage;
