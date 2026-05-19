import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, X } from "lucide-react";
import PecsCard from "./PecsCard";
import { CARDS } from "@/lib/pecsData";

export default function AISiulymai({ siulymai, kraunama, klaida, onCardTap }) {
  const [uzdarytas, setUzdarytas] = useState(false);
  const rasti_kortele = (korteles_id) => CARDS.find((c) => c.id === korteles_id);
  const rodyti = kraunama || siulymai.length > 0 || klaida;

  // Kai atsiranda nauji siūlymai – automatiškai atidaryti juostą
  useEffect(() => {
    if (siulymai.length > 0) setUzdarytas(false);
  }, [siulymai]);

  if (!rodyti) return null;
  if (uzdarytas) return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => setUzdarytas(false)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border-2 border-pecs-purple text-pecs-purple text-xs font-bold self-start"
    >
      <Sparkles className="w-3 h-3" />
      AI siūlymai
    </motion.button>
  );

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
        <button
          onClick={() => setUzdarytas(true)}
          className={`${kraunama ? "" : "ml-auto"} w-6 h-6 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors`}
          aria-label="Uždaryti AI siūlymus"
        >
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>
      {klaida && (
        <p className="text-xs text-destructive font-medium">{klaida}</p>
      )}
      <div className="flex gap-3 overflow-x-auto pb-1">
        <AnimatePresence>
          {siulymai.map((siulymas, i) => {
            const kortele = rasti_kortele(siulymas.korteles_id);
            if (!kortele) return null;
            return (
              <motion.div
                key={siulymas.korteles_id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="shrink-0"
              >
                <PecsCard card={kortele} onTap={onCardTap} size="normal" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
