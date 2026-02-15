import { motion, Variants } from "framer-motion";
import { MessageCircle, Shield, Zap, Heart, Lock, Brain, ArrowRight, Star, Sparkles, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUUID } from "@/context/UUIDProvider";
import aiAvatar from "@/assets/my****.png";

interface LandingPageProps {
  onStart: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
};

const features = [
  { icon: MessageCircle, title: "Analisis Chat Mendalam", desc: "Upload percakapan WhatsApp untuk dianalisis AI secara detail." },
  { icon: Shield, title: "100% Private & Aman", desc: "Data tidak disimpan di server, hanya diproses di sesi browser kamu." },
  { icon: Brain, title: "Wawasan Psikologis", desc: "Dapatkan insight pola komunikasi dan emosi tersembunyi." },
  { icon: Heart, title: "Mediator Netral", desc: "AI yang tidak memihak, membantu melihat perspektif kedua sisi." },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
  const navigate = useNavigate();
  const { userUUID, generateUUID } = useUUID();

  const handleStart = () => {
    if (!userUUID) {
      generateUUID();
    }
    navigate("/chat");
    if (onStart) onStart();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden relative bg-background">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="blob bg-primary/20 w-[500px] h-[500px] rounded-full top-[-100px] left-[-100px]" />
        <div className="blob bg-accent/20 w-[400px] h-[400px] rounded-full bottom-[-50px] right-[-50px] animation-delay-2000" />
        <div className="blob bg-purple-500/10 w-[300px] h-[300px] rounded-full top-[40%] left-[60%] animation-delay-4000" />
      </div>

      {/* Navbar (Simple Glass) */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300">
        <div className="absolute inset-0 bg-background/60 backdrop-blur-md border-b border-white/10" />
        <div className="container mx-auto px-6 py-4 relative flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">Clarity<span className="text-primary">Couple</span></span>
          </div>
          <button onClick={handleStart} className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
            Coba Gratis
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="container mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 text-sm text-primary font-medium mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                </span>
                AI Relationship Expert v1.0
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
                Pahami Konflik, <br className="hidden lg:block" />
                <span className="text-gradient-premium">Perbaiki Koneksi.</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Bingung kenapa dia marah? Merasa tidak didengar?
                <br />
                Biarkan <b>Clarity AI</b> (Mediator Hubungan) menganalisis chat kalian untuk menemukan akar masalah dan solusi konkret.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleStart}
                  className="group relative px-8 py-4 rounded-full gradient-primary text-white font-bold text-lg shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
                >
                  Mulai Analisis Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground/50 overflow-hidden">
                        <div className={`w-full h-full bg-gradient-to-br from-gray-200 to-gray-300`} />
                      </div>
                    ))}
                  </div>
                  <span>Digunakan 500+ Pasangan</span>
                </div>
              </motion.div>
            </div>

            {/* Right Visual (Phone Mockup) */}
            <motion.div variants={itemVariants} className="flex-1 relative z-10 w-full max-w-[400px] lg:max-w-md">
              <div className="relative">
                {/* Decor elements behind phone */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

                {/* Glass Card Container for Phone */}
                <div className="glass-panel rounded-[3rem] p-4 relative transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  <div className="bg-background rounded-[2.5rem] overflow-hidden border border-border/50 shadow-inner h-[550px] flex flex-col relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black/5 rounded-b-xl z-20" />

                    {/* Chat Header */}
                    <div className="px-6 py-5 bg-background/80 backdrop-blur-md border-b border-border/50 flex items-center gap-4 z-10 sticky top-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm relative">
                        {/* Partner Avatar - Brigida */}
                        <img src={aiAvatar} alt="Brigida Putri" className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg leading-tight">Brigida Putri</h3>
                        <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          Online
                        </p>
                      </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 bg-slate-50/50 p-4 space-y-4 overflow-hidden relative">
                      {/* Pattern background overlay */}
                      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                      <div className="flex justify-end">
                        <div className="bg-primary/10 rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-[85%]">
                          <p className="text-sm text-foreground leading-relaxed">
                            Aku gak bermaksud nyuekin kamu, Brig. Aku kerja buat masa depan kita juga.
                          </p>
                          <span className="text-[10px] text-primary/60 mt-1 block text-right">19:30 ✓✓</span>
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[85%] border border-border/50">
                          <p className="text-sm text-foreground leading-relaxed">
                            Masa depan apa kalau sekarang kamu gak ada waktu? Kamu cuma mikirin diri sendiri.
                          </p>
                          <span className="text-[10px] text-muted-foreground mt-1 block">19:31</span>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-primary/10 rounded-2xl rounded-tr-none px-4 py-3 shadow-sm max-w-[85%]">
                          <p className="text-sm text-foreground leading-relaxed">
                            Kamu selalu ngomong gitu. Aku capek debat hal yang sama terus.
                          </p>
                          <span className="text-[10px] text-primary/60 mt-1 block text-right">19:32 ✓✓</span>
                        </div>
                      </div>

                      {/* Typing Indicator */}
                      <div className="flex items-center gap-1 px-4 py-2 bg-white/50 rounded-full w-fit">
                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></div>
                      </div>
                    </div>

                    {/* Chat Input Fake */}
                    <div className="p-4 bg-background border-t border-border/50">
                      <div className="h-12 bg-muted/50 rounded-full border border-border/50 flex items-center px-4 justify-between text-muted-foreground text-sm">
                        <span>Ketik pesan...</span>
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background/50 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kenapa Clarity Couple?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Kami menggabungkan psikologi hubungan dengan AI canggih untuk memberikan perspektif yang jernih.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel-hover glass-panel p-6 rounded-2xl group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40 bg-background/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-70">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Clarity<span className="text-primary">Couple</span></span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Dibuat dengan ❤️ untuk hubungan yang lebih sehat.
          </p>
          <p className="text-xs text-muted-foreground/50">
            &copy; 2026 Clarity Couple. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
