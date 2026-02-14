import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Smartphone, X } from "lucide-react";

interface QRModalProps {
  open: boolean;
  onConnected: () => void;
  onClose: () => void;
}

const QRModal = ({ open, onConnected, onClose }: QRModalProps) => {
  const [status, setStatus] = useState<"waiting" | "connecting" | "connected">("waiting");

  useEffect(() => {
    if (!open) {
      setStatus("waiting");
      return;
    }
    const t1 = setTimeout(() => setStatus("connecting"), 1500);
    const t2 = setTimeout(() => {
      setStatus("connected");
      setTimeout(onConnected, 600);
    }, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [open, onConnected]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card rounded-2xl shadow-xl max-w-md w-full p-8 relative border border-border"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Hubungkan WhatsApp</h2>
            <p className="text-sm text-muted-foreground mb-6">Scan QR code dengan WhatsApp di HP kamu</p>

            {/* QR Placeholder */}
            <div className="relative w-48 h-48 mx-auto mb-6 bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
              {status === "waiting" && (
                <div className="text-center">
                  <QrCode className="w-24 h-24 text-foreground/20 mx-auto" />
                  <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span className="animate-pulse-soft">Menunggu koneksi...</span>
                  </div>
                </div>
              )}
              {status === "connecting" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="mt-3 text-sm font-medium text-primary">Menghubungkan...</p>
                </motion.div>
              )}
              {status === "connected" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mx-auto">
                    <span className="text-success-foreground text-2xl">✓</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-success">Terhubung!</p>
                </motion.div>
              )}
            </div>

            <div className="bg-muted rounded-lg p-4 text-left text-sm text-muted-foreground space-y-2">
              <p className="font-medium text-foreground">Cara scan:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Buka WhatsApp di HP</li>
                <li>Tap ⋮ (menu) di kanan atas</li>
                <li>Pilih <span className="font-medium text-foreground">Linked Devices</span></li>
                <li>Scan QR code ini</li>
              </ol>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QRModal;
