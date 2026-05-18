import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Check } from "lucide-react";
import { getCategoryById } from "@/lib/pecsData";

const STORAGE_KEY = "snekutis_korteles_override";

function gauti_img(kortele) {
  try {
    const pak = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return pak[kortele.id] || kortele.image;
  } catch { return kortele.image; }
}

function issaugoti_img(korteleId, dataUrl) {
  try {
    const pak = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    pak[korteleId] = dataUrl;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pak));
  } catch {}
}

export default function PecsCard({ card, onTap, size = "normal", tevuRezimas = false }) {
  const category = getCategoryById(card.category);
  const isSmall = size === "small";
  const [imgUrl, setImgUrl] = useState(() => gauti_img(card));
  const [issaugota, setIssaugota] = useState(false);
  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    const failas = e.target.files?.[0];
    if (!failas) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target.result;
      issaugoti_img(card.id, url);
      setImgUrl(url);
      setIssaugota(true);
      setTimeout(() => setIssaugota(false), 1500);
    };
    reader.readAsDataURL(failas);
    e.target.value = "";
  };

  if (tevuRezimas) {
    return (
      <div className="relative group">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div
          onClick={() => fileRef.current?.click()}
          className={`
            flex flex-col items-center justify-between cursor-pointer
            ${isSmall ? "w-20 h-24 sm:w-24 sm:h-28" : "w-24 h-28 sm:w-28 sm:h-32"}
            rounded-2xl border-4 ${issaugota ? "border-green-500" : category?.borderColor || "border-border"}
            bg-card shadow-lg select-none p-1 pb-1.5
            hover:border-pecs-blue transition-colors
          `}
        >
          <div className="flex-1 w-full flex items-center justify-center overflow-hidden rounded-xl relative">
            <img src={imgUrl} alt={card.label} className="w-full h-full object-contain" draggable={false} />
            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {issaugota
                ? <Check className="w-6 h-6 text-green-400" />
                : <Pencil className="w-5 h-5 text-white" />
              }
            </div>
          </div>
          <span className={`${isSmall ? "text-[9px]" : "text-[10px]"} font-bold text-foreground leading-none text-center w-full px-1 mt-1 shrink-0`}>
            {card.label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => onTap(card)}
      className={`
        flex flex-col items-center justify-between
        ${isSmall ? "w-20 h-24 sm:w-24 sm:h-28" : "w-24 h-28 sm:w-28 sm:h-32"}
        rounded-2xl border-4 ${category?.borderColor || "border-border"}
        bg-card shadow-lg hover:shadow-xl
        transition-shadow cursor-pointer select-none p-1 pb-1.5
      `}
    >
      <div className="flex-1 w-full flex items-center justify-center overflow-hidden rounded-xl">
        <img src={imgUrl} alt={card.label} className="w-full h-full object-contain" draggable={false} />
      </div>
      <span className={`${isSmall ? "text-[9px]" : "text-[10px]"} font-bold text-foreground leading-none text-center w-full px-1 mt-1 shrink-0`}>
        {card.label}
      </span>
    </motion.button>
  );
}