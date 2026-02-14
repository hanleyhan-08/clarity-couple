import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "@/components/LandingPage";
import QRModal from "@/components/QRModal";
import AppMain from "@/components/AppMain";

type Screen = "landing" | "app";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [qrOpen, setQrOpen] = useState(false);

  const handleStart = useCallback(() => {
    setQrOpen(true);
  }, []);

  const handleConnected = useCallback(() => {
    setQrOpen(false);
    setScreen("app");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {screen === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <LandingPage onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AppMain onBack={() => setScreen("landing")} />
          </motion.div>
        )}
      </AnimatePresence>

      <QRModal
        open={qrOpen}
        onConnected={handleConnected}
        onClose={() => setQrOpen(false)}
      />
    </div>
  );
};

export default Index;
