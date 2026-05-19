import React from "react";
import { motion } from "framer-motion";
import PecsCard from "./PecsCard";
import { getCardsByCategory } from "@/lib/pecsData";

const STORAGE_KEY = "snekutis_korteles_override";

function gauti_paveikslelio_url(korteleId, originalImage) {
  try {
    const pakeitimai = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return pakeitimai[korteleId] || originalImage;
  } catch {
    return originalImage;
  }
}

export default function CardGrid({ categoryId, onCardTap, tevuRezimas = false }) {
  const cards = getCardsByCategory(categoryId);

  return (
    <motion.div
      key={categoryId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 justify-items-center"
    >
      {cards.map((card, i) => {
        const cardSuPaveiksleliu = {
          ...card,
          image: gauti_paveikslelio_url(card.id, card.image)
        };
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
          >
            <PecsCard card={cardSuPaveiksleliu} onTap={onCardTap} tevuRezimas={tevuRezimas} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}