import React from "react";
import { motion } from "framer-motion";
import { getCategoriesByGroup } from "@/lib/pecsData";

export default function SubCategoryTabs({ groupId, activeCategory, onSelect }) {
  const cats = getCategoriesByGroup(groupId);

  if (cats.length <= 1) return null;

  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground mb-2 px-1">
        Pasirink grupę:
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {cats.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              whileTap={{ scale: 0.93 }}
              onClick={() => onSelect(cat.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full
                font-medium text-sm whitespace-nowrap transition-all
                border shrink-0
                ${isActive
                  ? `${cat.color} text-white border-transparent`
                  : `bg-muted border-transparent text-muted-foreground`
                }
              `}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
