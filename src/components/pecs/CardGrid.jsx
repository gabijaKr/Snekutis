import React from "react";
import { motion } from "framer-motion";
import PecsCard from "./PecsCard";
import { getCardsByCategory } from "@/lib/pecsData";

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
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04 }}
        >
          <PecsCard card={card} onTap={onCardTap} tevuRezimas={tevuRezimas} />
        </motion.div>
      ))}
    </motion.div>
  );
}