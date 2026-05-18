import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import PecsCard from "./PecsCard";
import { CARDS } from "@/lib/pecsData";

export default function AISiūlymai({ siūlymai, kraunama, klaida, onCardTap }) {
  const rasti_kortelę = (kortelės_id) => CARDS.find((c) => c.id === kortelės_id);
  const rodyti = kraunama || siūlymai.length > 0 || klaida;
  if (!rodyti) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="w-full bg-card rounded-2xl border-2 border-pecs-purple shadow-lg p-3"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-pecs-purple" />
        <span className="text-sm font-black text-pecs-purple uppercase tracking-wide">
          AI siūlo toliau
        </span>
        {kraunama && (
          <Loader2 className="w-4 h-4 text-pecs-purple animate-spin ml-auto" />
        )}
      </div>
      {klaida && (
        <p className="text-xs text-destructive font-medium">{klaida}</p>
      )}
      <div className="flex gap-3 overflow-x-auto pb-1">
        <AnimatePresence>
          {siūlymai.map((siūlymas, i) => {
            const kortelė = rasti_kortelę(siūlymas.kortelės_id);
            if (!kortelė) return null;
            return (
              <motion.div
                key={siūlymas.kortelės_id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="shrink-0"
              >
                <PecsCard card={kortelė} onTap={onCardTap} size="normal" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
