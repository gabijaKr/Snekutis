from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import torch
import json
from transformers import BertTokenizer
from torch import nn
import io
import base64
import tempfile
import os
from gtts import gTTS

app = Flask(__name__)
CORS(app)

#Žodynas 
VARTOTOJO_ZODYNAS = [
    "aš", "tu", "jis", "ji",
    "mama", "tėtis", "draugas", "mokytoja",
    "šuo", "katė",
    "obuolys", "sumuštinis",
    "vanduo", "sultys",
    "knyga", "žaislas", "kamuolys", "telefonas",
    "mokykla", "parduotuvė", "kiemas", "namai",
    "virtuvė", "svetainė", "tualetas",
    "eiti",
    "norėti", "duoti", "laikyti", "žaisti", "piešti",
    "žiūrėti", "skaityti",
    "laukti", "kalbėti", "taip", "ne",
    "valgyti", "gerti", "miegoti"
]

ZODIS_I_ID = {
    "aš": "iv-1", "tu": "iv-2", "jis": "iv-3", "ji": "iv-4",
    "mama": "zm-1", "tėtis": "zm-2", "draugas": "zm-3", "mokytoja": "zm-4",
    "šuo": "gy-1", "katė": "gy-2",
    "obuolys": "ma-1", "sumuštinis": "ma-2",
    "vanduo": "ge-1", "sultys": "ge-2",
    "knyga": "ob-1", "žaislas": "ob-2", "kamuolys": "ob-3", "telefonas": "ob-4",
    "mokykla": "vi-1", "parduotuvė": "vi-2", "kiemas": "vi-3", "namai": "vi-4",
    "virtuvė": "ka-1", "svetainė": "ka-2", "tualetas": "ka-3",
    "eiti": "ju-1",
    "norėti": "ov-1", "duoti": "ov-2", "laikyti": "ov-3",
    "žaisti": "ov-4", "piešti": "ov-5",
    "žiūrėti": "jt-1", "skaityti": "jt-2",
    "laukti": "so-1", "kalbėti": "so-2", "taip": "so-3", "ne": "so-4",
    "valgyti": "va-1", "gerti": "va-2", "miegoti": "ve-1"
}

KONTEKSTO_TAISYKLES = {
    "valgyti":  ["obuolys", "sumuštinis"],
    "gerti":    ["vanduo", "sultys"],
    "skaityti": ["knyga"],
    "piešti":   ["knyga", "mokykla", "namai", "kiemas"],
    "miegoti":  ["namai", "svetainė"],
    "eiti":     ["mokykla", "parduotuvė", "kiemas", "namai", "virtuvė", "svetainė", "tualetas"],
    "žaisti":   ["kamuolys", "žaislas", "telefonas", "šuo", "katė", "mama", "tėtis", "draugas", "mokytoja", "aš", "tu", "jis", "ji"],
    "kalbėti":  ["mama", "tėtis", "draugas", "mokytoja", "aš", "tu", "jis", "ji", "šuo", "katė"],
    "laikyti":  ["šuo", "katė", "knyga", "žaislas", "kamuolys", "telefonas"],
    "duoti":    ["obuolys", "sumuštinis", "vanduo", "sultys", "knyga", "žaislas", "kamuolys", "telefonas", "mama", "tėtis", "draugas", "mokytoja", "aš", "tu", "jis", "ji"],
    "norėti":   ["valgyti", "gerti", "žaisti", "skaityti", "eiti", "piešti", "miegoti", "žiūrėti", "obuolys", "sumuštinis", "vanduo", "sultys", "knyga", "žaislas", "kamuolys", "telefonas", "mokykla", "parduotuvė", "kiemas", "namai", "virtuvė", "svetainė", "tualetas"],
    "ne":       ["valgyti", "gerti", "eiti", "žaisti", "skaityti", "piešti", "miegoti", "žiūrėti", "laukti", "kalbėti", "norėti", "duoti", "laikyti"],
    "laukti":   [],
    "žiūrėti":  ["telefonas"],
    "taip":     [],
}

VIETA_PO_TAISYKLES = {
    "mokykla":    ["skaityti", "žaisti", "kalbėti", "laukti", "žiūrėti", "piešti"],
    "kiemas":     ["žaisti", "laukti", "kalbėti", "piešti"],
    "namai":      ["valgyti", "gerti", "žaisti", "skaityti", "žiūrėti", "kalbėti", "laukti", "piešti", "miegoti"],
    "parduotuvė": ["laukti", "kalbėti"],
    "svetainė":   ["žiūrėti", "žaisti", "skaityti", "kalbėti", "laukti", "valgyti", "miegoti"],
    "virtuvė":    ["valgyti", "gerti"],
    "tualetas":   ["laukti"],
}

def gauti_leistinus(zodziai):
    if not zodziai:
        return None
    paskutinis = zodziai[-1].lower()
    if paskutinis in KONTEKSTO_TAISYKLES:
        leistini = KONTEKSTO_TAISYKLES[paskutinis]
        return leistini if leistini else []
    if paskutinis in VIETA_PO_TAISYKLES:
        return VIETA_PO_TAISYKLES[paskutinis]
    return None

class AACModelis(nn.Module):
    def __init__(self, bert_modelis, zodyno_vektoriai):
        super().__init__()
        self.bert = bert_modelis.bert
        self.dekoderis = nn.Linear(768, len(VARTOTOJO_ZODYNAS), bias=False)
        self.dekoderis.weight = nn.Parameter(zodyno_vektoriai.clone())

    def forward(self, input_ids, attention_mask):
        isvestis = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        mask_pozicija = (input_ids == tokenizer.mask_token_id)
        mask_vektoriai = isvestis.last_hidden_state[mask_pozicija]
        logitai = self.dekoderis(mask_vektoriai)
        return logitai

print("Kraunamas modelis...")
irenginys = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Įrenginys: {irenginys}")

tokenizer = BertTokenizer.from_pretrained("aac_modelis")

from transformers import BertForMaskedLM
bert = BertForMaskedLM.from_pretrained("bert-base-multilingual-cased")

def uzkoduoti_zodyną(zodynas, tokenizer, modelis, irenginys):
    modelis.eval()
    vektoriai = []
    with torch.no_grad():
        for zodis in zodynas:
            tokenai = tokenizer.tokenize(zodis)
            id_sarasas = tokenizer.convert_tokens_to_ids(tokenai)
            id_tensor = torch.tensor(id_sarasas).to(irenginys)
            embed = modelis.bert.embeddings.word_embeddings(id_tensor)
            vektorius = embed.mean(dim=0)
            vektoriai.append(vektorius)
    return torch.stack(vektoriai)

bert = bert.to(irenginys)
zodyno_vektoriai = uzkoduoti_zodyną(VARTOTOJO_ZODYNAS, tokenizer, bert, irenginys)

modelis = AACModelis(bert, zodyno_vektoriai).to(irenginys)
modelis.load_state_dict(torch.load("aac_modelis/modelio_svoriai.pt", map_location=irenginys))
modelis.eval()
print(" Modelis pakrautas!")
print(" TTS paruoštas (gTTS)!")

def speti_korteles(sakinys_be_mask, top_k=5):
    sakinys = sakinys_be_mask.strip() + " [MASK]"
    zodziai = sakinys_be_mask.strip().lower().split()

    with torch.no_grad():
        encoded = tokenizer(sakinys, return_tensors="pt", padding="max_length", max_length=32, truncation=True)
        input_ids = encoded["input_ids"].to(irenginys)
        attention_mask = encoded["attention_mask"].to(irenginys)
        logitai = modelis(input_ids, attention_mask)
        tikimybes = torch.softmax(logitai, dim=1)[0]
        # Sumažinti "taip" ir "ne" tikimybes
        mazinti = ["taip", "ne"]
        for zodis in mazinti:
            if zodis in VARTOTOJO_ZODYNAS:
                idx = VARTOTOJO_ZODYNAS.index(zodis)
                tikimybes[idx] = tikimybes[idx] * 0.2

    leistini = gauti_leistinus(zodziai)
    rezultatai = []

    if leistini is not None:
        for zodis in leistini:
            if zodis in VARTOTOJO_ZODYNAS:
                idx = VARTOTOJO_ZODYNAS.index(zodis)
                rezultatai.append({
                    "žodis": zodis,
                    "korteles_id": ZODIS_I_ID.get(zodis, ""),
                    "tikimybe": round(tikimybes[idx].item() * 100, 1)
                })
        rezultatai.sort(key=lambda x: x["tikimybe"], reverse=True)
        rezultatai = rezultatai[:top_k]
    else:
        top_indeksai = tikimybes.topk(top_k).indices.tolist()
        for idx in top_indeksai:
            zodis = VARTOTOJO_ZODYNAS[idx]
            rezultatai.append({
                "žodis": zodis,
                "korteles_id": ZODIS_I_ID.get(zodis, ""),
                "tikimybe": round(tikimybes[idx].item() * 100, 1)
            })

    return rezultatai

@app.route("/", methods=["GET"])
def pagrindinis():
    return jsonify({"statusas": "veikia", "zinute": "AAC API veikia!"})

@app.route("/speti", methods=["POST"])
def speti():
    duomenys = request.get_json()
    if not duomenys or "sakinys" not in duomenys:
        return jsonify({"klaida": "Truksta sakinys lauko"}), 400
    sakinys = duomenys["sakinys"].strip().lower()
    if not sakinys:
        return jsonify({"klaida": "Sakinys tuscias"}), 400
    top_k = duomenys.get("top_k", 5)
    try:
        siulymai = speti_korteles(sakinys, top_k=top_k)
        return jsonify({"sakinys": sakinys, "siulymai": siulymai})
    except Exception as e:
        return jsonify({"klaida": str(e)}), 500

@app.route("/kalbeti", methods=["POST"])
def kalbeti():
    duomenys = request.get_json()
    if not duomenys or "tekstas" not in duomenys:
        return jsonify({"klaida": "Truksta tekstas lauko"}), 400
    tekstas = duomenys["tekstas"].strip()
    if not tekstas:
        return jsonify({"klaida": "Tekstas tuscias"}), 400
    try:
        tts = gTTS(text=tekstas, lang="lt")
        mp3_buffer = io.BytesIO()
        tts.write_to_fp(mp3_buffer)
        mp3_buffer.seek(0)
        audio_base64 = base64.b64encode(mp3_buffer.read()).decode("utf-8")
        return jsonify({"audio": audio_base64, "formatas": "mp3"})
    except Exception as e:
        return jsonify({"klaida": str(e)}), 500

@app.route("/zodynas", methods=["GET"])
def zodynas():
    return jsonify({"zodynas": VARTOTOJO_ZODYNAS})

if __name__ == "__main__":
    print("\n API paleistas: http://localhost:5000")
    app.run(host="0.0.0.0", port=5000, debug=False)