// PECS kortelių duomenys lietuvių kalba
// Paveikslėliai: /public/korteles/{id}_{pavadinimas}.png

export const TAB_GROUPS = [
  { id: "ivardžiai",     label: "Įvardžiai",     emoji: "👤", image: "/ivardžiai-group.png",     color: "bg-pecs-pink",  borderColor: "border-pecs-pink"  },
  { id: "daiktavardžiai",label: "Daiktavardžiai",emoji: "🧸", image: "/daiktavardžiai-group.png", color: "bg-pecs-blue",  borderColor: "border-pecs-blue"  },
  { id: "veiksmažodžiai",label: "Veiksmažodžiai",emoji: "🏃", image: "/veiksmažodžiai-group.png", color: "bg-pecs-green", borderColor: "border-pecs-green" },
];

export const CATEGORIES = [
  { id: "ivardžiai",       group: "ivardžiai",      label: "Įvardžiai",       color: "bg-pecs-pink",   borderColor: "border-pecs-pink",   emoji: "👤" },
  { id: "žmonės",          group: "daiktavardžiai", label: "Žmonės",          color: "bg-pecs-blue",   borderColor: "border-pecs-blue",   emoji: "👨‍👩‍👧" },
  { id: "gyvūnai",         group: "daiktavardžiai", label: "Gyvūnai",         color: "bg-pecs-orange", borderColor: "border-pecs-orange", emoji: "🐾" },
  { id: "maistas",         group: "daiktavardžiai", label: "Maistas",         color: "bg-pecs-green",  borderColor: "border-pecs-green",  emoji: "🍎" },
  { id: "gėrimai",         group: "daiktavardžiai", label: "Gėrimai",         color: "bg-pecs-teal",   borderColor: "border-pecs-teal",   emoji: "🥤" },
  { id: "objektai",        group: "daiktavardžiai", label: "Objektai",        color: "bg-pecs-purple", borderColor: "border-pecs-purple", emoji: "🧩" },
  { id: "vietos",          group: "daiktavardžiai", label: "Vietos",          color: "bg-pecs-yellow", borderColor: "border-pecs-yellow", emoji: "📍" },
  { id: "kambariai",       group: "daiktavardžiai", label: "Kambariai",       color: "bg-pecs-red",    borderColor: "border-pecs-red",    emoji: "🏠" },
  { id: "veiksmai",        group: "veiksmažodžiai", label: "Veiksmai",        color: "bg-pecs-blue",   borderColor: "border-pecs-blue",   emoji: "🚶" },
  { id: "objektų-veiksmai",group: "veiksmažodžiai", label: "Objektų veiksmai",color: "bg-pecs-purple", borderColor: "border-pecs-purple", emoji: "🤲" },
  { id: "jutiminiai",      group: "veiksmažodžiai", label: "Jutiminiai",      color: "bg-pecs-teal",   borderColor: "border-pecs-teal",   emoji: "👀" },
  { id: "socialiniai",     group: "veiksmažodžiai", label: "Socialiniai",     color: "bg-pecs-pink",   borderColor: "border-pecs-pink",   emoji: "🗣️" },
  { id: "vartojimo",       group: "veiksmažodžiai", label: "Vartojimo",       color: "bg-pecs-green",  borderColor: "border-pecs-green",  emoji: "🍽️" },
];

// ─────────────────────────────────────────────────────────────────
// PAVEIKSLĖLIAI
// Failai: public/korteles/{id}_{pavadinimas}.png
// Dydis: 200x200px ar didesnis kvadratas, PNG formatas
// ─────────────────────────────────────────────────────────────────

export const CARDS = [
  // ── Įvardžiai ──────────────────────────────────────────────────
  { id: "iv-1", category: "ivardžiai",        label: "Aš",         image: "/korteles/iv-1_as.png"           },
  { id: "iv-2", category: "ivardžiai",        label: "Tu",         image: "/korteles/iv-2_tu.png"           },
  { id: "iv-3", category: "ivardžiai",        label: "Jis",        image: "/korteles/iv-3_jis.png"          },
  { id: "iv-4", category: "ivardžiai",        label: "Ji",         image: "/korteles/iv-4_ji.png"           },

  // ── Žmonės ─────────────────────────────────────────────────────
  { id: "zm-1", category: "žmonės",           label: "Mama",       image: "/korteles/zm-1_mama.png"         },
  { id: "zm-2", category: "žmonės",           label: "Tėtis",      image: "/korteles/zm-2_tetis.png"        },
  { id: "zm-3", category: "žmonės",           label: "Draugas",    image: "/korteles/zm-3_draugas.png"      },
  { id: "zm-4", category: "žmonės",           label: "Mokytoja",   image: "/korteles/zm-4_mokytoja.png"     },

  // ── Gyvūnai ────────────────────────────────────────────────────
  { id: "gy-1", category: "gyvūnai",          label: "Šuo",        image: "/korteles/gy-1_suo.png"          },
  { id: "gy-2", category: "gyvūnai",          label: "Katė",       image: "/korteles/gy-2_kate.png"         },

  // ── Maistas ────────────────────────────────────────────────────
  { id: "ma-1", category: "maistas",          label: "Obuolys",    image: "/korteles/ma-1_obuolys.png"      },
  { id: "ma-2", category: "maistas",          label: "Sumuštinis", image: "/korteles/ma-2_sumustinis.png"   },

  // ── Gėrimai ────────────────────────────────────────────────────
  { id: "ge-1", category: "gėrimai",          label: "Vanduo",     image: "/korteles/ge-1_vanduo.png"       },
  { id: "ge-2", category: "gėrimai",          label: "Sultys",     image: "/korteles/ge-2_sultys.png"       },

  // ── Objektai ───────────────────────────────────────────────────
  { id: "ob-1", category: "objektai",         label: "Knyga",      image: "/korteles/ob-1_knyga.png"        },
  { id: "ob-2", category: "objektai",         label: "Žaislas",    image: "/korteles/ob-2_zaislas.png"      },
  { id: "ob-3", category: "objektai",         label: "Kamuolys",   image: "/korteles/ob-3_kamuolys.png"     },
  { id: "ob-4", category: "objektai",         label: "Telefonas",  image: "/korteles/ob-4_telefonas.png"    },

  // ── Vietos ─────────────────────────────────────────────────────
  { id: "vi-1", category: "vietos",           label: "Mokykla",    image: "/korteles/vi-1_mokykla.png"      },
  { id: "vi-2", category: "vietos",           label: "Parduotuvė", image: "/korteles/vi-2_parduotuve.png"   },
  { id: "vi-3", category: "vietos",           label: "Kiemas",     image: "/korteles/vi-3_kiemas.png"       },
  { id: "vi-4", category: "vietos",           label: "Namai",      image: "/korteles/vi-4_namai.png"        },

  // ── Kambariai ──────────────────────────────────────────────────
  { id: "ka-1", category: "kambariai",        label: "Virtuvė",    image: "/korteles/ka-1_virtuve.png"      },
  { id: "ka-2", category: "kambariai",        label: "Svetainė",   image: "/korteles/ka-2_svetaine.png"     },
  { id: "ka-3", category: "kambariai",        label: "Tualetas",   image: "/korteles/ka-3_tualetas.png"     },

  // ── Judėjimas ──────────────────────────────────────────────────
  { id: "ju-1", category: "veiksmai",         label: "Eiti",       image: "/korteles/ju-1_eiti.png"         },

  // ── Objektų veiksmai ───────────────────────────────────────────
  { id: "ov-1", category: "objektų-veiksmai", label: "Norėti",     image: "/korteles/ov-1_noreti.png"       },
  { id: "ov-2", category: "objektų-veiksmai", label: "Duoti",      image: "/korteles/ov-2_duoti.png"        },
  { id: "ov-3", category: "objektų-veiksmai", label: "Laikyti",    image: "/korteles/ov-3_laikyti.png"      },
  { id: "ov-4", category: "objektų-veiksmai", label: "Žaisti",     image: "/korteles/ov-4_zaisti.png"       },
  { id: "ov-5", category: "objektų-veiksmai", label: "Piešti",     image: "/korteles/ov-5_piesti.png"       },

  // ── Jutiminiai ─────────────────────────────────────────────────
  { id: "jt-1", category: "jutiminiai",       label: "Žiūrėti",    image: "/korteles/jt-1_ziureti.png"      },
  { id: "jt-2", category: "jutiminiai",       label: "Skaityti",   image: "/korteles/jt-2_skaityti.png"     },

  // ── Socialiniai ────────────────────────────────────────────────
  { id: "so-1", category: "socialiniai",      label: "Laukti",     image: "/korteles/so-1_laukti.png"       },
  { id: "so-2", category: "socialiniai",      label: "Kalbėti",    image: "/korteles/so-2_kalbeti.png"      },
  { id: "so-3", category: "socialiniai",      label: "Taip",       image: "/korteles/so-3_taip.png"         },
  { id: "so-4", category: "socialiniai",      label: "Ne",         image: "/korteles/so-4_ne.png"           },

  // ── Vartojimo ──────────────────────────────────────────────────
  { id: "va-1", category: "vartojimo",        label: "Valgyti",    image: "/korteles/va-1_valgyti.png"      },
  { id: "va-2", category: "vartojimo",        label: "Gerti",      image: "/korteles/va-2_gerti.png"        },
  { id: "ve-1", category: "veiksmai",         label: "Miegoti",    image: "/korteles/ve-1_miegoti.png"      },
];

export function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCardsByCategory(categoryId) {
  return CARDS.filter((c) => c.category === categoryId);
}

export function getCategoriesByGroup(groupId) {
  return CATEGORIES.filter((c) => c.group === groupId);
}
