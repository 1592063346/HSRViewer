export const RarityRGB: string[] = ["", "", "", "rgba(69, 150, 255, 1)", "rgba(181, 140, 255, 1)", "rgba(255, 199, 112, 1)"];
export const ToRoman: string[] = ["I", "II", "III", "IV", "V"];

export const LEVEL_LIMITS: number[] = [20, 30, 40, 50, 60, 70, 80];

const CHARACTER_IMAGE_LOCAL: {[key: number]: [number, number]} = {
  1001: [500, 400], // March 7th
  1002: [580, 500], // Dan Heng
  1003: [500, 650], // Himeko
  1004: [400, 250], // Welt
  1006: [550, 300], // Silver Wolf
  1009: [550, 350], // Asta
  1101: [450, 650], // Bronya
  1102: [360, 560], // Seele
  1103: [550, 450], // Serval
  1104: [620, 550], // Gepard
  1106: [300, 500], // Pela
  1107: [500, 200], // Clara
  1108: [500, 300], // Sampo
  1109: [500, 450], // Hook
  1201: [500, 400], // Qingque
  1202: [550, 250], // Tingyun
  1203: [520, 300], // Luocha
  1204: [580, 450], // Jing Yuan
  1206: [500, 400], // Sushang
  1207: [500, 400], // Yukong
  1209: [520, 300], // Yanqing
  1211: [520, 300], // Bailu

  8001: [530, 480], // ...
  8002: [530, 480], // ...
  8003: [530, 480], // ...
  8004: [530, 480], // ...
};

export const getImageLocal = (id: number) => {
  if (!CHARACTER_IMAGE_LOCAL[id]) {
    return [500, 200];
  }
  return CHARACTER_IMAGE_LOCAL[id];
};