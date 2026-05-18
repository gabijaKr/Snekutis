import { useState, useCallback } from "react";

const API_URL = window.Capacitor 
  ? "http://10.0.2.2:5000" 
  : "http://localhost:5000";

export function useAISuggestions() {
  const [siulymai, setSiulymai] = useState([]);
  const [kraunama, setKraunama] = useState(false);
  const [klaida, setKlaida] = useState(null);

  const gauti_siulymus = useCallback(async (sakinys_korteles) => {
    if (sakinys_korteles.length === 0) {
      setSiulymai([]);
      return;
    }
    const sakinys = sakinys_korteles.map((k) => k.label.toLowerCase()).join(" ");
    setKraunama(true);
    setKlaida(null);
    try {
      const atsakas = await fetch(`${API_URL}/speti`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sakinys, top_k: 5 }),
      });
      if (!atsakas.ok) throw new Error("API klaida");
      const duomenys = await atsakas.json();
      setSiulymai(duomenys.siulymai || []);
    } catch (err) {
      setKlaida("Nepavyko gauti siūlymų");
      setSiulymai([]);
    } finally {
      setKraunama(false);
    }
  }, []);

  const isvalyti = useCallback(() => setSiulymai([]), []);

  return { siulymai, kraunama, klaida, gauti_siulymus, isvalyti };
}
