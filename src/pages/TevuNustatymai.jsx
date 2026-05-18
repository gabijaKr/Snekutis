import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Pencil, Check, X, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CARDS, CATEGORIES } from "@/lib/pecsData";

// localStorage raktas
const STORAGE_KEY = "snekutis_korteles_override";

function nuskaityti_pakeitimus() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function issaugoti_pakeitimus(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function gauti_korteles_paveikslelio_url(kortele) {
  const pak = nuskaityti_pakeitimus();
  return pak[kortele.id] || kortele.image;
}

export default function TevuNustatatymai() {
  const navigate = useNavigate();
  const [pakeitimai, setPakeitimai] = useState(nuskaityti_pakeitimus());
  const [atidarytos_kategorijos, setAtidarytos] = useState({});
  const [issaugota, setIssaugota] = useState(null);
  const fileRef = useRef(null);
  const [redaguojama, setRedaguojama] = useState(null); // korteles id

  const pakeisti_paveikseli = (kortele, failas) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target.result;
      const nauji = { ...pakeitimai, [kortele.id]: url };
      setPakeitimai(nauji);
      issaugoti_pakeitimus(nauji);
      setIssaugota(kortele.id);
      setTimeout(() => setIssaugota(null), 1500);
    };
    reader.readAsDataURL(failas);
  };

  const atkurti_originala = (kortele) => {
    const nauji = { ...pakeitimai };
    delete nauji[kortele.id];
    setPakeitimai(nauji);
    issaugoti_pakeitimus(nauji);
  };

  const toggle_kategorija = (catId) => {
    setAtidarytos((p) => ({ ...p, [catId]: !p[catId] }));
  };

  // Grupuoti korteles pagal kategorija
  const kategorijos_su_kortelemis = CATEGORIES.map((cat) => ({
    ...cat,
    korteles: CARDS.filter((c) => c.category === cat.id),
  })).filter((c) => c.korteles.length > 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-lg font-black text-foreground">⚙️ Tėvų nustatymai</h1>
        </div>
      </header>

      <div className="flex-1 px-4 py-5 max-w-2xl mx-auto w-full flex flex-col gap-4">

        {/* Info */}
        <div className="bg-pecs-blue/10 border border-pecs-blue/30 rounded-2xl p-4 text-sm text-foreground">
          <p className="font-bold mb-1">Kaip pakeisti kortelės paveikslėlį?</p>
          <p className="text-muted-foreground">Spauskite ant kortelės paveikslėlio ir pasirinkite nuotrauką iš įrenginio. Pakeitimai išsaugomi automatiškai.</p>
        </div>

        {/* Kortelės pagal kategorijas */}
        {kategorijos_su_kortelemis.map((cat) => (
          <div key={cat.id} className="bg-card border-2 border-border rounded-2xl overflow-hidden">
            {/* Kategorijos antraštė */}
            <button
              onClick={() => toggle_kategorija(cat.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.emoji}</span>
                <span className="font-bold text-foreground">{cat.label}</span>
                <span className="text-xs text-muted-foreground">({cat.korteles.length})</span>
              </div>
              {atidarytos_kategorijos[cat.id]
                ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                : <ChevronDown className="w-4 h-4 text-muted-foreground" />
              }
            </button>

            {/* Kortelių tinklelis */}
            <AnimatePresence>
              {atidarytos_kategorijos[cat.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border p-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {cat.korteles.map((kortele) => {
                      const pakeista = !!pakeitimai[kortele.id];
                      const img_url = pakeitimai[kortele.id] || kortele.image;
                      const isHighlighted = issaugota === kortele.id;

                      return (
                        <div key={kortele.id} className="flex flex-col items-center gap-1.5">
                          {/* Kortelė su upload */}
                          <div className="relative group">
                            <label className="cursor-pointer block">
                              <input
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                                className="hidden"
                                onChange={(e) => {
                                    const failas = e.target.files?.[0];
                                    if (!failas) return;
                                    
                                    const leistini_formatai = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
                                    if (!leistini_formatai.includes(failas.type)) {
                                      alert("Netinkamas failo formatas! Leidžiami tik: PNG, JPG, WEBP, GIF");
                                      e.target.value = "";
                                      return;
                                    }
                                    
                                    pakeisti_paveikseli(kortele, failas);
                                    e.target.value = "";
                                  }}
                              />
                              <div className={`
                                w-20 h-20 rounded-xl border-2 overflow-hidden transition-all
                                ${isHighlighted ? "border-green-500 shadow-lg shadow-green-200" : pakeista ? "border-pecs-blue" : "border-border"}
                                group-hover:border-pecs-blue group-hover:shadow-md
                              `}>
                                <img
                                  src={img_url}
                                  alt={kortele.label}
                                  className="w-full h-full object-contain p-1"
                                  onError={(e) => { e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24'%3E🖼️%3C/text%3E%3C/svg%3E"; }}
                                />
                              </div>
                              {/* Hover overlay */}
                              <div className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                {isHighlighted
                                  ? <Check className="w-6 h-6 text-green-400" />
                                  : <Upload className="w-5 h-5 text-white" />
                                }
                              </div>
                            </label>

                            {/* Atkurti originalą */}
                            {pakeista && (
                              <button
                                onClick={() => atkurti_originala(kortele)}
                                title="Atkurti originalą"
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center shadow z-10"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* Etiketė */}
                          <span className="text-[10px] font-bold text-center text-foreground leading-tight">
                            {kortele.label}
                          </span>

                          {/* Pakeista žymė */}
                          {pakeista && (
                            <span className="text-[9px] text-pecs-blue font-bold">Pakeista</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Atkurti viską */}
        {Object.keys(pakeitimai).length > 0 && (
          <button
            onClick={() => {
              setPakeitimai({});
              issaugoti_pakeitimus({});
            }}
            className="w-full py-3 rounded-2xl border-2 border-destructive text-destructive font-bold text-sm hover:bg-destructive/10 transition-colors"
          >
            Atkurti visus originalius paveikslėlius
          </button>
        )}
      </div>
    </div>
  );
}
