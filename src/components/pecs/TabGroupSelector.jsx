import React from "react";
import { motion } from "framer-motion";
import { TAB_GROUPS } from "@/lib/pecsData";

export default function TabGroupSelector({ activeGroup, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {TAB_GROUPS.map((group) => {
        const isActive = activeGroup === group.id;
        return (
          <motion.button
            key={group.id}
            whileTap={{ scale: 0.93 }}
            onClick={() => onSelect(group.id)}
            className={`
              flex flex-col items-center justify-center gap-1
              w-28 h-24 sm:w-32 sm:h-28
              rounded-2xl shrink-0 transition-all
              border-2
              ${isActive
                ? `${group.color} border-transparent shadow-md`
                : `bg-card ${group.borderColor}`
              }
            `}
          >
            {group.image ? (
              <img
                src={group.image}
                alt={group.label}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                draggable={false}
              />
            ) : (
              <span className="text-3xl sm:text-4xl leading-none">{group.emoji}</span>
            )}
            <span className={`text-[11px] sm:text-xs font-bold leading-tight text-center px-2 w-full ${isActive ? "text-white" : "text-foreground"}`}>
              {group.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
