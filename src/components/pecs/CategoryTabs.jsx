import React from "react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/pecsData";

export default function CategoryTabs({ activeCategory, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 px-1 scrollbar-hide">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.93 }}
            onClick={() => onSelect(cat.id)}
            className={`
              flex items-center gap-1.5 px-4 py-2.5 rounded-full
              font-bold text-sm whitespace-nowrap transition-all
              border-2 shrink-0
              ${
                isActive
                  ? `${cat.color} text-white border-transparent shadow-lg`
                  : `bg-card ${cat.borderColor} text-foreground hover:shadow-md`
              }
            `}
          >
            <span className="text-lg">{cat.emoji}</span>
            <span>{cat.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}