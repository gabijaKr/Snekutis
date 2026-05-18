import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Delete, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TEISINGAS_PIN = "1234"; // Pakeisk pagal poreikį

export default function PinEkranas() {
  const [ivesta, setIvesta] = useState("");
  const [klaida, setKlaida] = useState(false);
  const navigate = useNavigate();

  const spausti = (sk) => {
    if (ivesta.length >= 4) return;
    const naujas = ivesta + sk;
    setIvesta(naujas);
    setKlaida(false);

    if (naujas.length === 4) {
      setTimeout(() => {
        if (naujas === TEISINGAS_PIN) {
          navigate("/board?tevai=1");
        } else {
          setKlaida(true);
          setIvesta("");
        }
      }, 200);
    }
  };

  const trinti = () => {
    setIvesta((p) => p.slice(0, -1));
    setKlaida(false);
  };

  const skaitmenys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xs flex flex-col items-center gap-8"
      >
        {/* Ikona */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-pecs-blue flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-black text-foreground">Tėvų režimas</h1>
          <p className="text-sm text-muted-foreground text-center">Įveskite 4 skaitmenų kodą</p>
        </div>

        {/* PIN indikatoriai */}
        <div className="flex gap-4">
          {[0,1,2,3].map((i) => (
            <motion.div
              key={i}
              animate={klaida ? { x: [0,-8,8,-8,8,0] } : {}}
              transition={{ duration: 0.4 }}
              className={`w-5 h-5 rounded-full border-2 transition-all ${
                ivesta.length > i
                  ? klaida ? "bg-destructive border-destructive" : "bg-pecs-blue border-pecs-blue"
                  : "bg-transparent border-border"
              }`}
            />
          ))}
        </div>

        {/* Klaidos pranešimas */}
        <AnimatePresence>
          {klaida && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-destructive font-bold -mt-4"
            >
              Neteisingas kodas
            </motion.p>
          )}
        </AnimatePresence>

        {/* Klaviatūra */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {skaitmenys.map((sk, i) => {
            if (sk === "") return <div key={i} />;
            if (sk === "⌫") return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                onClick={trinti}
                className="h-16 rounded-2xl bg-muted flex items-center justify-center shadow-sm"
              >
                <Delete className="w-6 h-6 text-muted-foreground" />
              </motion.button>
            );
            return (
              <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                onClick={() => spausti(sk)}
                className="h-16 rounded-2xl bg-card border-2 border-border text-2xl font-black text-foreground shadow-sm hover:shadow-md transition-shadow"
              >
                {sk}
              </motion.button>
            );
          })}
        </div>

        {/* Atgal */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-muted-foreground underline underline-offset-4"
        >
          Atgal
        </button>
      </motion.div>
    </div>
  );
}
