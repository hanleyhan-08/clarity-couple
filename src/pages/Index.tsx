import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LandingPage from "@/components/LandingPage";
import QRModal from "@/components/QRModal";


import { useNavigate } from "react-router-dom";

const Index = () => {
  const [qrOpen, setQrOpen] = useState(false);
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    setQrOpen(true);
  }, []);

  const handleConnected = useCallback(() => {
    setQrOpen(false);
    navigate("/chat");
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage onStart={handleStart} />
        </motion.div>
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
