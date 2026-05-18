# 🚀 Šnekutis – Paleidimo instrukcija

## Kas yra šiame aplanke:
```
snekutis_pataisyta/
  api.py                  ← Python AI serveris
  requirements_api.txt    ← Python bibliotekos
  src/                    ← React programėlė
  ...
```

---

## 1 ŽINGSNIS – Paruošk modelį

Išpakuok `aac_modelis.zip` (iš Colab) į šį aplanką:
```
snekutis_pataisyta/
  aac_modelis/
    modelio_svoriai.pt
    žodynas.json
    tokenizer.json
    tokenizer_config.json
    vocab.txt
```

---

## 2 ŽINGSNIS – Paleisk API (1 terminalas)

```bash
cd C:\Users\gabij\Desktop\snekutis\snekutis_pataisyta
pip install -r requirements_api.txt
python api.py
```

Turėtum matyti:
```
✅ Modelis pakrautas!
🚀 API paleistas: http://localhost:5000
```

⚠️ Šį terminalą PALIK atvirą!

---

## 3 ŽINGSNIS – Paleisk programėlę (2 terminalas)

Atidaro NAUJĄ terminalą:
```bash
cd C:\Users\gabij\Desktop\snekutis\snekutis_pataisyta
npm install
npm run dev
```

Atidaro naršyklę: http://localhost:5173

---

## Kaip veikia AI siūlymai:
- Pasirinkus kortelę → API siūlo logiškus tęsinius
- Po "gerti" → tik vanduo, sultys
- Po "valgyti" → tik obuolys, sumuštinis
- Po "eiti" → tik vietos
- ir t.t.
