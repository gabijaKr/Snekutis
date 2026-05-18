import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, X, LogOut } from "lucide-react";
import SentenceStrip from "@/components/pecs/SentenceStrip";
import TabGroupSelector from "@/components/pecs/TabGroupSelector";
import SubCategoryTabs from "@/components/pecs/SubCategoryTabs";
import CardGrid from "@/components/pecs/CardGrid";
import AISiulymai from "@/components/pecs/AISiulymai";
import { useAISuggestions } from "@/hooks/useAISuggestions";
import { getCategoriesByGroup } from "@/lib/pecsData";

const isAndroid = /android/i.test(navigator.userAgent);
const API_URL = isAndroid ? "http://10.0.2.2:5000" : "http://localhost:5000";

export default function PecsBoard() {
  const [sentence, setSentence] = useState([]);
  const [activeGroup, setActiveGroup] = useState("ivardžiai");
  const [activeCategory, setActiveCategory] = useState("ivardžiai");
  const { siulymai, kraunama, klaida, gauti_siulymus, isvalyti } = useAISuggestions();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tevuRezimas = searchParams.get("tevai") === "1";

  const handleGroupSelect = useCallback((groupId) => {
    setActiveGroup(groupId);
    const cats = getCategoriesByGroup(groupId);
    if (cats.length > 0) setActiveCategory(cats[0].id);
  }, []);

  const handleCardTap = useCallback((card) => {
    if (tevuRezimas) return; // kortelių spaudinėjimas išjungtas tėvų režime
    setSentence((prev) => {
      const naujas = [...prev, card];
      gauti_siulymus(naujas);
      return naujas;
    });
  }, [gauti_siulymus, tevuRezimas]);

  const handleRemoveCard = useCallback((index) => {
    setSentence((prev) => {
      const naujas = prev.filter((_, i) => i !== index);
      if (naujas.length > 0) gauti_siulymus(naujas);
      else isvalyti();
      return naujas;
    });
  }, [gauti_siulymus, isvalyti]);

  const handleClear = useCallback(() => {
    setSentence([]);
    isvalyti();
  }, [isvalyti]);

  const handleSpeak = useCallback(async () => {
    const text = sentence.map((c) => c.label).join(" ");
    if (!text) return;
    try {
      const response = await fetch(`${API_URL}/kalbeti`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tekstas: text }),
      });
      const data = await response.json();
      if (data.audio) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
        await audio.play();
      }
    } catch (err) {
      console.error("Garso klaida:", err);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "lt-LT";
        utterance.rate = 0.85;
        window.speechSynthesis.speak(utterance);
      }
    }
  }, [sentence]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link to="/">
            <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-card border-2 border-border flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
          </Link>
          <h1 className="text-xl sm:text-2xl font-black text-foreground">
            {tevuRezimas ? "⚙️ Tėvų režimas" : "💬 Mano Žodžiai"}
          </h1>
          {tevuRezimas && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/")}
              className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-bold"
            >
              <LogOut className="w-4 h-4" /> Išeiti
            </motion.button>
          )}
        </div>
      </header>

      {/* Tėvų režimo info juosta */}
      {tevuRezimas && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-800 font-medium">
          Spustelėkite ant kortelės paveikslėlio, kad pakeistumėte jį
        </div>
      )}

      {/* Sakinių juosta – tik vaiko režime */}
      {!tevuRezimas && (
        <div className="sticky top-[65px] z-10 px-4 py-3 bg-background/60 backdrop-blur-md">
          <div className="max-w-5xl mx-auto">
            <SentenceStrip sentence={sentence} onRemoveCard={handleRemoveCard} onClear={handleClear} onSpeak={handleSpeak} />
          </div>
        </div>
      )}
      <div className="px-4 pt-4 pb-3 bg-muted/60 border-b border-border">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          <TabGroupSelector activeGroup={activeGroup} onSelect={handleGroupSelect} />
          <SubCategoryTabs groupId={activeGroup} activeCategory={activeCategory} onSelect={setActiveCategory} />
        </div>
      </div>
      <div className="flex-1 px-4 py-4 pb-8">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          {!tevuRezimas && <AISiulymai siulymai={siulymai} kraunama={kraunama} klaida={klaida} onCardTap={handleCardTap} />}
          <CardGrid categoryId={activeCategory} onCardTap={handleCardTap} tevuRezimas={tevuRezimas} />
        </div>
      </div>
    </div>
  );
}
