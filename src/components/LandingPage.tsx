import { motion } from "framer-motion";
import heroImage from "@/assets/hero-illustration.png";
import { MessageCircle, Shield, Zap, Heart } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

const features = [
  { icon: MessageCircle, title: "Analisis Chat", desc: "Upload percakapan WhatsApp untuk dianalisis AI" },
  { icon: Shield, title: "100% Private", desc: "Data tidak disimpan, hanya di session kamu" },
  { icon: Zap, title: "Insight Instan", desc: "Dapatkan analisis mendalam dalam hitungan detik" },
  { icon: Heart, title: "Netral & Adil", desc: "AI mediator yang tidak memihak siapapun" },
];

const LandingPage = ({ onStart }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm px-4 py-1.5 text-sm text-primary-foreground/90 mb-6 border border-primary-foreground/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                Beta — Gratis untuk dicoba
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
                Pahami Konflik Hubungan dari{" "}
                <span className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-2 py-0.5">
                  Chat Asli
                </span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg">
                AI mediator netral yang menganalisis percakapan WhatsApp kamu. Temukan akar masalah, pahami perspektif pasangan, dan perbaiki komunikasi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onStart}
                  className="gradient-primary text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-primary-foreground/10 backdrop-blur-sm bg-primary-foreground/20"
                  style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)" }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Hubungkan WhatsApp
                  </span>
                </button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-primary-foreground/60 text-sm">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> 100% Private
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> No Login
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4" /> Session Only
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-primary-foreground/5 rounded-3xl blur-2xl" />
                <img
                  src={heroImage}
                  alt="Clarity Couple - AI Mediator untuk Pasangan"
                  className="relative rounded-2xl shadow-2xl w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
              >
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-border bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Ini adalah mockup visual. Tidak ada data yang tersimpan atau diproses. Untuk versi lengkap, tunggu peluncuran resmi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
