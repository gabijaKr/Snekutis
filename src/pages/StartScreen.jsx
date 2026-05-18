import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

export default function StartScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-28 h-28 sm:w-36 sm:h-36 mx-auto mb-6 rounded-3xl bg-primary shadow-2xl flex items-center justify-center"
        >
          <span className="text-5xl sm:text-6xl">💬</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-5xl font-black text-foreground mb-10 tracking-tight"
        >
          Šnekutis
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <Link to="/board">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-full bg-primary text-primary-foreground text-xl sm:text-2xl font-black shadow-2xl hover:shadow-3xl transition-shadow"
            >
              Pradėti ▶
            </motion.button>
          </Link>

          <Link to="/pin">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-muted-foreground/30 text-muted-foreground text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
            >
              <Settings className="w-4 h-4" />
              Tėvų režimas
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
