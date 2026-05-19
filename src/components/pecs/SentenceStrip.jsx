import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryById } from "@/lib/pecsData";

function SentenceCard({ card, onRemove, index }) {
  const category = getCategoryById(card.category);
  return (
    <motion.div
      layout="position"
      
      animate={{ opacity: 1 }}
      exit={{ scale: 0, opacity: 1 }}
      transition={{ type: "tween", duration: 0.15 }}
      className={`
        relative flex flex-col items-center justify-between
        w-16 h-20 sm:w-20 sm:h-24
        rounded-xl border-3 ${category?.borderColor || "border-border"}
        bg-card shadow-md shrink-0 p-1 pb-1
      `}
    >
      <button
        onClick={() => onRemove(index)}
        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md hover:scale-110 transition-transform z-10"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden rounded-lg">
        <img src={card.image} alt={card.label} className="w-full h-full object-contain" draggable={false} />
      </div>
      <span className="text-xs font-bold text-foreground leading-tight text-center w-full truncate mt-0.5">
        {card.label}
      </span>
    </motion.div>
  );
}

function formatuotiSakini(korteles) {
  if (korteles.length === 0) return "";
  const zodziai = korteles.map((c) => c.label.toLowerCase());
  zodziai[0] = zodziai[0].charAt(0).toUpperCase() + zodziai[0].slice(1);
  return zodziai.join(" ");
}

export default function SentenceStrip({ sentence, onRemoveCard, onClear, onSpeak }) {
  const rodomаsSakinys = formatuotiSakini(sentence);

  return (
    <div className="w-full bg-card rounded-2xl shadow-xl border-2 border-border p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-bold text-muted-foreground tracking-wide uppercase">
          Sakinys
        </span>
        <div className="flex-1" />
        {sentence.length > 0 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onSpeak}
              className="gap-1 rounded-full text-xs font-bold border-2 border-pecs-blue text-pecs-blue hover:bg-pecs-blue hover:text-white"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Klausyti
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClear}
              className="gap-1 rounded-full text-xs font-bold border-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Išvalyti
            </Button>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 min-h-[88px] sm:min-h-[104px] overflow-x-auto py-3 px-2">
        <AnimatePresence mode="sync">
          {sentence.length === 0 ? (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-muted-foreground text-sm sm:text-base font-medium italic w-full text-center"
            >
              Paspausk korteles, kad sukurtum sakinį ✨
            </motion.p>
          ) : (
            sentence.map((card, i) => (
              <SentenceCard key={card.id} card={card} index={i} onRemove={onRemoveCard} />
            ))
          )}
        </AnimatePresence>
      </div>

      {sentence.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center"
        >
          <p className="text-base sm:text-lg font-extrabold text-foreground tracking-wide">
            „{rodomаsSakinys}"
          </p>
        </motion.div>
      )}
    </div>
  );
}
