export const RarityRGB: string[] = ["", "", "", "rgba(69, 150, 255, 1)", "rgba(181, 140, 255, 1)", "rgba(255, 199, 112, 1)"];
export const ToRoman: string[] = ["I", "II", "III", "IV", "V"];

export const LEVEL_LIMITS: number[] = [20, 30, 40, 50, 60, 70, 80];

// in alphabetical order
export const characterOptions = [
  { key: "1308", value: "1308", label: "Acheron" },
  { key: "1302", value: "1302", label: "Argenti" },
  { key: "1008", value: "1008", label: "Arlan" },
  { key: "1009", value: "1009", label: "Asta" },
  { key: "1304", value: "1304", label: "Aventurine" },
  { key: "1211", value: "1211", label: "Bailu" },
  { key: "1307", value: "1307", label: "Black Swan" },
  { key: "1205", value: "1205", label: "Blade" },
  { key: "1315", value: "1315", label: "Boothill" },
  { key: "1101", value: "1101", label: "Bronya" },
  { key: "1107", value: "1107", label: "Clara" },
  { key: "1002", value: "1002", label: "Dan Heng" },
  { key: "1213", value: "1213", label: "Dan Heng · Imbibitor Lunae" },
  { key: "1305", value: "1305", label: "Dr. Ratio" },
  { key: "1310", value: "1310", label: "Firefly" },
  { key: "1208", value: "1208", label: "Fu Xuan" },
  { key: "1301", value: "1301", label: "Gallagher" },
  { key: "1104", value: "1104", label: "Gepard" },
  { key: "1210", value: "1210", label: "Guinaifen" },
  { key: "1215", value: "1215", label: "Hanya" },
  { key: "1013", value: "1013", label: "Herta" },
  { key: "1003", value: "1003", label: "Himeko" },
  { key: "1109", value: "1109", label: "Hook" },
  { key: "1217", value: "1217", label: "Huohuo" },
  { key: "1314", value: "1314", label: "Jade" },
  { key: "1204", value: "1204", label: "Jing Yuan" },
  { key: "1212", value: "1212", label: "Jingliu" },
  { key: "1005", value: "1005", label: "Kafka" },
  { key: "1111", value: "1111", label: "Luka" },
  { key: "1203", value: "1203", label: "Luocha" },
  { key: "1110", value: "1110", label: "Lynx" },
  { key: "1001", value: "1001", label: "March 7th" },
  { key: "1312", value: "1312", label: "Misha" },
  { key: "1105", value: "1105", label: "Natasha" },
  { key: "1106", value: "1106", label: "Pela" },
  { key: "1201", value: "1201", label: "Qingque" },
  { key: "1309", value: "1309", label: "Robin" },
  { key: "1303", value: "1303", label: "Ruan Mei" },
  { key: "1108", value: "1108", label: "Sampo" },
  { key: "1102", value: "1102", label: "Seele" },
  { key: "1103", value: "1103", label: "Serval" },
  { key: "1006", value: "1006", label: "Silver Wolf" },
  { key: "1306", value: "1306", label: "Sparkle" },
  { key: "1206", value: "1206", label: "Sushang" },
  { key: "1202", value: "1202", label: "Tingyun" },
  { key: "1112", value: "1112", label: "Topaz & Numby" },
  { key: "1004", value: "1004", label: "Welt" },
  { key: "1214", value: "1214", label: "Xueyi" },
  { key: "1209", value: "1209", label: "Yanqing" },
  { key: "1207", value: "1207", label: "Yukong" },
];

const CHARACTER_IMAGE_LOCAL: {[key: number]: [number, number]} = {
  1001: [500, 400], // March 7th
  1002: [600, 500], // Dan Heng
  1003: [500, 700], // Himeko
  1004: [390, 250], // Welt
  1005: [500, 310], // Kafka
  1006: [550, 300], // Silver Wolf
  1009: [550, 350], // Asta
  1101: [450, 600], // Bronya
  1102: [360, 560], // Seele
  1103: [550, 450], // Serval
  1106: [340, 400], // Pela
  1107: [500, 200], // Clara
  1109: [500, 500], // Hook
  1110: [650, 500], // Lynx
  1201: [500, 350], // Qingque
  1203: [520, 300], // Luocha
  1204: [580, 450], // Jing Yuan
  1205: [500, 100], // Blade
  1208: [450, 300], // Fu Xuan
  1209: [520, 300], // Yanqing
  1210: [500, 380], // Guinaifen
  1211: [520, 300], // Bailu
  1301: [600, 180], // Gallagher
  1302: [200, 200], // Argenti
  1303: [500, 370], // Ruan Mei
  1304: [600, 360], // Aventurine
  1305: [300, 200], // Dr. Ratio
  1306: [528, 400], // Sparkle
  1310: [330, 500], // Firefly
  1315: [500, 400], // Boothill

  8001: [530, 480], // ...
  8002: [530, 480],
  8003: [550, 420],
  8004: [550, 420],
  8005: [550, 500],
  8006: [550, 500],
};

export const getImageLocal = (id: number) => {
  if (!CHARACTER_IMAGE_LOCAL[id]) {
    return [500, 200];
    //      - →  + ↑
    //      + ←  - ↓
  }
  return CHARACTER_IMAGE_LOCAL[id];
};
