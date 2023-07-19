import { useRef, useEffect, useState } from "react";
import { lockSvg } from "../constants/svgs";
import { LEVEL_LIMITS, RarityRGB, ToRoman } from "../constants/characterConfig";
import { MyButton } from "./MyButton";
import { Divider, Space } from "antd";
import { drawStar, fillTextLines, formatToPrint, formatToRadio } from "../utils/drawTools";

interface characterCompProps {
  character1: any,
  player1: any,
  character2: any,
  player2: any;
};

const CharacterComp = ({ character1, player1, character2, player2 } : characterCompProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fresh, setFresh] = useState<boolean>(false);

  const Element: string = character1.element.name;
  const ElementId: string = character1.element.id;

  const CardX = 1700;
  const CardY = 700;
  const scale = window.devicePixelRatio;
  const detailSize = 500;

  const compareData = (data1: number, data2: number, id: number) => {
    const delta = data1 - data2;
    const foo = formatToPrint(delta, id);
    if (foo === "0" || foo === "0.0%") {
      return "-";
    } else if (data1 < data2) {
      return foo;
    } else {
      return "+" + foo;
    }
  }

  const drawDetail = (context: CanvasRenderingContext2D, character: any, player: any, character2: any, sx: number, sy: number) => {
    const lightConeLeft = sx + 18;
    const lightConeX = 128 * 1.2;
    const lightConeY = 150 * 1.2;

    const lightConeCenterX = sx + detailSize / 2 - context!.measureText("No Light Cone.").width / 2;
    const lightConeCenterY = sy + 111;

    const attributeSize = 40;

    if (!character.light_cone) {
      context!.fillStyle="#FFFFFF";
      context!.font = "20px HanYiWenHei-85W";
      context!.fillText("No Light Cone.", lightConeCenterX, lightConeCenterY);
    } else {
      const lightConeImage = new Image();
      lightConeImage.setAttribute("crossOrigin", "anonymous");
      lightConeImage.src = character.light_cone.preview;

      lightConeImage.onload = () => {
        context!.drawImage(lightConeImage, lightConeLeft, 0, lightConeX, lightConeY);
        for (let i = 0; i < character.light_cone.rarity; ++i) {
          drawStar(context, lightConeLeft + 18 + 12 * i, sy + 165, 7, 5);
        }
      };

      const lightConeNameLeft = lightConeLeft + lightConeX;
      const lightConeNameUp = 40;
      const lightConeNameWidth = detailSize - lightConeX - 130;
      const lightConeNameLineHeight = 27;
      const lightConeNameLines = 4;

      context!.font = "22px HanYiWenHei-85W";
      context!.fillStyle = "rgba(255, 255, 255, 1)";
      fillTextLines(context, character.light_cone.name, lightConeNameLeft, lightConeNameUp, lightConeNameWidth, lightConeNameLineHeight, lightConeNameLines);

      context!.beginPath();
      context!.arc(lightConeNameLeft + 10, lightConeNameUp + lightConeNameLines * lightConeNameLineHeight, 15, 0, 2 * Math.PI);
      context!.fillStyle = "rgba(30, 30, 30, 1)";
      context!.fill();
      
      context!.font = "15px";
      context!.fillStyle = "rgba(191, 160, 102, 1)";
      context!.fillText(ToRoman[character.light_cone.rank - 1], lightConeNameLeft + 10 - context!.measureText(ToRoman[character.light_cone.rank - 1]).width / 2, lightConeNameUp + lightConeNameLines * lightConeNameLineHeight + 8);

      context!.font = "20px HanYiWenHei-85W";
      context!.fillStyle = "rgba(255, 255, 255, 1)";
      context!.fillText("Lv." + character.light_cone.level + "/" + LEVEL_LIMITS[character.light_cone.promotion], lightConeNameLeft + 45, lightConeNameUp + lightConeNameLines * lightConeNameLineHeight + 8);

      const lightConeAttributeLeft = lightConeNameLeft + lightConeNameWidth + 5;
      const lightConeAttributeUp = lightConeNameUp - attributeSize + 20;
      const lightConeAttributeSpace = 50;
      
      const lightConeAttributes: HTMLImageElement[] = [];
      for (let i = 0; i < 3; ++i) {
        lightConeAttributes.push(new Image());
        lightConeAttributes[i].setAttribute("crossOrigin", "anonymous");
        lightConeAttributes[i].src = character.light_cone.attributes[i].icon;
        lightConeAttributes[i].onload = () => {
          context!.drawImage(lightConeAttributes[i], lightConeAttributeLeft, lightConeAttributeUp + i * lightConeAttributeSpace, attributeSize, attributeSize);
          context!.font = "18px HanYiWenHei-85W";
          context!.fillStyle = "rgba(255, 255, 255, 1)";
          context!.fillText(character.light_cone.attributes[i].display, lightConeAttributeLeft + attributeSize, lightConeAttributeUp + i * lightConeAttributeSpace + attributeSize - 15);
        };
      }
    }

    const Display: string[] = ["HP", "ATK", "DEF", "SPD", "CRIT Rate", "CRIT DMG", "Break Effect", "Outgoing Healing Boost", "Energy Regeneration Rate", "Effect Hit Rate", "Effect RES", Element + " DMG Boost"];
    const DisplayURL: string[] = ["MaxHP", "Attack", "Defence", "Speed", "CriticalChance", "CriticalDamage", "BreakUp", "HealRatio", "EnergyRecovery", "StatusProbability", "StatusResistance", ElementId + "AddedRatio"];
    const attributes: {[key : string] : {image: HTMLImageElement, value: number}} = {};
    const attributes2: {[key : string] : {value: number}} = {};

    // init attributes
    for (let i = 0; i < Display.length; ++i) {
      attributes[Display[i]] = {image: new Image(), value: 0};
      attributes[Display[i]].image.src = "/srasset/icon/property/Icon" + DisplayURL[i] + ".png";
      attributes[Display[i]].image.setAttribute("crossOrigin", "anonymous");
      attributes2[Display[i]] = {value: 0};
      // energy recharge
      if (i == 8) {
        attributes[Display[i]].value += 1;
        attributes2[Display[i]].value += 1;
      }
    }

    for (let i = 0; i < character.attributes.length; ++i) {
      attributes[character.attributes[i].name].value += character.attributes[i].value;
    }

    for (let i = 0; i < character.additions.length; ++i) {
      attributes[character.additions[i].name].value += character.additions[i].value;
    }

    for (let i = 0; i < character2.attributes.length; ++i) {
      attributes2[character2.attributes[i].name].value += character2.attributes[i].value;
    }

    for (let i = 0; i < character2.additions.length; ++i) {
      attributes2[character2.additions[i].name].value += character2.additions[i].value;
    }
    
    const attributeUp = lightConeY + 15;
    const attributeLeft = lightConeLeft;
    const attributeSpace = 45;

    for (let i = 0; i < Display.length; ++i) {
      attributes[Display[i]].image.onload = () => {
        context!.drawImage(attributes[Display[i]].image, attributeLeft, attributeUp + (i) * attributeSpace, attributeSize, attributeSize);
        context!.font = "18px HanYiWenHei-85W";
        context!.fillStyle = "rgba(255, 255, 255, 1)";
        context!.fillText(Display[i], attributeLeft + attributeSize, attributeUp + (i) * attributeSpace + 25);
        const foo = formatToPrint(attributes[Display[i]].value, i);
        const bar = " (" + compareData(attributes[Display[i]].value, attributes2[Display[i]].value, i) + ")";
        const foobar = foo + bar;
        const totalWidth = context!.measureText(foobar).width;
        const barWidth = context!.measureText(bar).width;
        context!.fillText(foo, sx + detailSize - 10 - totalWidth, attributeUp + (i) * attributeSpace + 25);
        context!.font = "18px HanYiWenHei-85W";
        if (bar === " (-)") {
          context!.fillStyle = "rgba(170, 170, 170, 1)";
        } else if (attributes[Display[i]].value < attributes2[Display[i]].value) {
          context!.fillStyle = "rgba(255, 0, 0, 1)";
        } else {
          context!.fillStyle = "rgba(0, 255, 0, 1)";
        }
        context!.fillText(bar, sx + detailSize - 10 - barWidth, attributeUp + (i) * attributeSpace + 25);
      };
    }
  }

  useEffect(() => {
    const characterImage = new Image();
    characterImage.setAttribute("crossOrigin", "anonymous");
    characterImage.src = character1.portrait;
    
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    context!.clearRect(0, 0, CardX, CardY);

    context!.fillStyle = "rgba(0, 0, 0, 0.1)";
    context!.fillRect(0, 0, CardX, CardY);

    const CharacterLeft = detailSize;
    const CharacterX = CardY;

    characterImage.onload = () => {
      context!.drawImage(characterImage, 0, 0, 1024, 1024, CharacterLeft, 0, CardY, CardY);
      const myGradient = context!.createLinearGradient(CharacterLeft, 0, CharacterLeft + CharacterX * 0.3, 0);
      myGradient.addColorStop(0, "rgba(50, 50, 50, 0.5)");
      myGradient.addColorStop(1, "rgba(50, 50, 50, 0)");
      context!.fillStyle = myGradient;
      context!.fillRect(CharacterLeft, 0, CharacterX * 0.3, CardY);

      const myGradient2 = context!.createLinearGradient(CharacterLeft + CharacterX * 0.7, 0, CharacterLeft + CharacterX * 1, 0);
      myGradient2.addColorStop(0, "rgba(50, 50, 50, 0)");
      myGradient2.addColorStop(1, "rgba(50, 50, 50, 0.5)");
      context!.fillStyle = myGradient2;
      context!.fillRect(CharacterLeft + CharacterX * 0.7, 0, CharacterX * 0.3, CardY);

      const myGradient3 = context!.createLinearGradient(0, 0, 0, CharacterX * 0.3);
      myGradient3.addColorStop(0, "rgba(50, 50, 50, 0.5)");
      myGradient3.addColorStop(1, "rgba(50, 50, 50, 0)");
      context!.fillStyle = myGradient3;
      context!.fillRect(CharacterLeft, 0, CardY, CharacterX * 0.3);

      context!.fillStyle="#FFFFFF";
      context!.font = "24px HanYiWenHei-85W";
      context!.fillText(character1.name, CharacterLeft + (CharacterX - context!.measureText(character1.name).width) / 2, 30);

      const cornerSize = 20;
      context!.roundRect(0, 0, CardX, CardY, cornerSize);
      context!.globalCompositeOperation = "destination-in";
      context!.fill();
      context!.globalCompositeOperation = "source-over";

      // Character Level
      context!.font = "20px HanYiWenHei-85W";
      context!.fillText("Lv. " + character1.level + "/" + LEVEL_LIMITS[character1.promotion], CharacterLeft + 10, 30);
      context!.fillText("Lv. " + character2.level + "/" + LEVEL_LIMITS[character2.promotion], CharacterLeft + CharacterX - context!.measureText("Lv. " + character2.level + "/" + LEVEL_LIMITS[character2.promotion]).width - 10, 30);
      
      // eidolons
      const eidolonLeft = CharacterLeft + 10;
      const eidolonRight = CharacterLeft + CharacterX - 10;
      const eidolonUp = CardY - 320;
      const eidolonSpace = 50;
      const eidolonSize = 40;

      const eidolons: HTMLImageElement[] = [];
      for (let i = 0; i < 6; ++i) {
        eidolons.push(new Image());
        eidolons[i].setAttribute("crossOrigin", "anonymous");
        eidolons[i].src = character1.rank_icons[i];
        eidolons[i].onload = () => {
          context!.drawImage(eidolons[i], eidolonLeft, eidolonUp + i * eidolonSpace, eidolonSize, eidolonSize);
          if (character1.rank <= i) {
            context!.beginPath();
            context!.arc(eidolonLeft + eidolonSize / 2, eidolonUp + i * eidolonSpace + eidolonSize / 2, eidolonSize / 2, 0, 2 * Math.PI);
            context!.fillStyle = "rgba(50, 50, 50, 0.7)";
            context!.fill();
            const lock = new Image();
            lock.setAttribute("crossOrigin", "anonymous");
            lock.src = "data:image/svg+xml;base64," + btoa(lockSvg);
            lock.onload = () => {
              context!.drawImage(lock, eidolonLeft + 10, eidolonUp + 10 + i * eidolonSpace, eidolonSize / 2, eidolonSize / 2);
            };
          }
          context!.drawImage(eidolons[i], eidolonRight - eidolonSize, eidolonUp + i * eidolonSpace, eidolonSize, eidolonSize);
          if (character2.rank <= i) {
            context!.beginPath();
            context!.arc(eidolonRight - eidolonSize / 2, eidolonUp + i * eidolonSpace + eidolonSize / 2, eidolonSize / 2, 0, 2 * Math.PI);
            context!.fillStyle = "rgba(50, 50, 50, 0.7)";
            context!.fill();
            const lock = new Image();
            lock.setAttribute("crossOrigin", "anonymous");
            lock.src = "data:image/svg+xml;base64," + btoa(lockSvg);
            lock.onload = () => {
              context!.drawImage(lock, eidolonRight - eidolonSize + 10, eidolonUp + 10 + i * eidolonSpace, eidolonSize / 2, eidolonSize / 2);
            };
          }
        };
      }

      const traceUp = CardY - 285;
      const traceSpace = 65;
      const traceSize = 55;
      const traceLeft = eidolonLeft + eidolonSize + 10;
      const traceRight = eidolonRight - eidolonSize - 10;

      const traces: HTMLImageElement[] = [];
      for (let i = 0; i < 4; ++i) {
        traces.push(new Image());
        traces[i].setAttribute("crossOrigin", "anonymous");
        traces[i].src = character1.skills[i].icon;
        traces[i].onload = () => {
          // character 1
          context!.drawImage(traces[i], traceLeft, traceUp + i * traceSpace, traceSize, traceSize);
          context!.beginPath();
          context!.arc(traceLeft + traceSize / 2, traceUp + i * traceSpace + traceSize / 2 + 22, 8, 0, 2 * Math.PI);
          context!.fillStyle = "rgba(50, 50, 50, 1)";
          context!.fill();
          // character 2
          context!.drawImage(traces[i], traceRight - traceSize, traceUp + i * traceSpace, traceSize, traceSize);
          context!.beginPath();
          context!.arc(traceRight - traceSize / 2, traceUp + i * traceSpace + traceSize / 2 + 22, 8, 0, 2 * Math.PI);
          context!.fillStyle = "rgba(50, 50, 50, 1)";
          context!.fill();
          // level
          context!.fillStyle = "rgba(255, 255, 255, 1)";
          context!.font = "12px HanYiWenHei-85W";
          context!.fillText(character1.skills[i].level, traceLeft + traceSize / 2 - context!.measureText(character1.skills[i].level).width / 2, traceUp + i * traceSpace + traceSize / 2 + 26);
          context!.fillText(character2.skills[i].level, traceRight - traceSize / 2 - context!.measureText(character2.skills[i].level).width / 2, traceUp + i * traceSpace + traceSize / 2 + 26);
        };
      }
    };

    drawDetail(context!, character1, player1, character2, 0, 0);
    drawDetail(context!, character2, player2, character1, detailSize + CharacterX, 0);
  }, [fresh]);

  return (
    <Space direction="vertical">
      <canvas ref={canvasRef} width={CardX} height={CardY} style={{width: CardX / scale, height: CardY / scale}} />
      <Space>
        <MyButton text="REFRESH" onClick={() => setFresh(!fresh)} />
        {/* <MyButton text="DOWNLOAD" onClick={() => download(canvasRef.current)} /> */}
        {/* <div style={{ fontSize: 16, color: "rgb(185, 185, 185)" }}>P.S. Please download after the image has been completely loaded.</div> */}
      </Space>
      <Divider />
    </Space>
  );
};

export default CharacterComp;
