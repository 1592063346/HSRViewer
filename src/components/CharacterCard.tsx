import { useRef, useEffect, useState } from "react";
import { lockSvg } from "../constants/svgs";
import { LEVEL_LIMITS, RarityRGB, ToRoman } from "../constants/characterConfig";
import { MyButton } from "./MyButton";
import { Divider, Space } from "antd";
import { drawStar, fillTextLines, formatToPrint, formatToRadio } from "../utils/drawTools";

interface characterCardProps {
  character: any,
  player: any,
};

const CharacterCard = ({ character, player } : characterCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [fresh, setFresh] = useState<boolean>(false);
  
  const download = (canvas: any) => {
    let a = document.createElement("a");
    const URL = canvas.toDataURL("image/png", 1);
    a.href = URL;
    a.download = player.uid + "_" + character.name + ".png";
    a.click();
  };

  const CardX = 1400;
  const CardY = 600;
  const scale = window.devicePixelRatio;

  useEffect(() => {
    const Element: string = character.element.name;
    const ElementId: string = character.element.id;

    const characterImage = new Image();
    characterImage.setAttribute("crossOrigin", "anonymous");
    characterImage.src = character.portrait;
    
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");

    context!.clearRect(0, 0, CardX, CardY);

    context!.fillStyle = "rgba(0, 0, 0, 0.1)";
    context!.fillRect(0, 0, CardX, CardY);

    const CharacterX = CardY;

    characterImage.onload = () => {
      console.log(character.id);
      context!.drawImage(characterImage, 0, 0, 1024, 1024, 0, 0, CardY, CardY);
      const myGradient = context!.createLinearGradient(0, 0, CharacterX * 0.3, 0);
      myGradient.addColorStop(0, "rgba(50, 50, 50, 0.5)");
      myGradient.addColorStop(1, "rgba(50, 50, 50, 0)");
      context!.fillStyle = myGradient;
      context!.fillRect(0, 0, CharacterX * 0.3, CardY);

      const myGradient2 = context!.createLinearGradient(CharacterX * 0.7, 0, CharacterX * 1, 0);
      myGradient2.addColorStop(0, "rgba(50, 50, 50, 0)");
      myGradient2.addColorStop(1, "rgba(50, 50, 50, 0.5)");
      context!.fillStyle = myGradient2;
      context!.fillRect(CharacterX * 0.7, 0, CharacterX * 0.3, CardY);

      context!.fillStyle="#FFFFFF";
      context!.font = "24px HanYiWenHei-85W";
      context!.fillText(character.name, 10, 30);
      context!.font = "18px HanYiWenHei-85W";
      context!.fillText("Lv. " + character.level + "/" + LEVEL_LIMITS[character.promotion], 10, 60);

      const cornerSize = 20;
      context!.roundRect(0, 0, CardX, CardY, cornerSize);
      context!.globalCompositeOperation = "destination-in";
      context!.fill();
      context!.globalCompositeOperation = "source-over";

      const eidolonLeft = 10;
      const eidolonUp = CardY - 320;
      const eidolonSpace = 50;
      const eidolonSize = 40;

      const eidolons: HTMLImageElement[] = [];
      for (let i = 0; i < 6; ++i) {
        eidolons.push(new Image());
        eidolons[i].setAttribute("crossOrigin", "anonymous");
        eidolons[i].src = character.rank_icons[i];
        eidolons[i].onload = () => {
          context!.drawImage(eidolons[i], eidolonLeft, eidolonUp + i * eidolonSpace, eidolonSize, eidolonSize);
          if (character.rank <= i) {
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
        };
      }

      const uidLeft = 10;
      const uidUp = CardY - 10;

      context!.font = "12px HanYiWenHei-85W";
      context!.fillStyle = "rgba(255, 255, 255, 1)";
      context!.fillText(player.uid, uidLeft, uidUp);

      const traceUp = CardY - 270;
      const traceSpace = 65;
      const traceSize = 55;
      const traceLeft = CharacterX - traceSpace;

      const traces: HTMLImageElement[] = [];
      for (let i = 0; i < 4; ++i) {
        traces.push(new Image());
        traces[i].setAttribute("crossOrigin", "anonymous");
        traces[i].src = character.skills[i].icon;
        traces[i].onload = () => {
          context!.drawImage(traces[i], traceLeft, traceUp + i * traceSpace, traceSize, traceSize);
          context!.beginPath();
          context!.arc(traceLeft + traceSize / 2, traceUp + i * traceSpace + traceSize / 2 + 22, 8, 0, 2 * Math.PI);
          context!.fillStyle = "rgba(50, 50, 50, 1)";
          context!.fill();
          context!.fillStyle = "rgba(255, 255, 255, 1)";
          context!.font = "12px HanYiWenHei-85W";
          context!.fillText(character.skills[i].level, traceLeft + traceSize / 2 - context!.measureText(character.skills[i].level).width / 2, traceUp + i * traceSpace + traceSize / 2 + 26);
        };
      }
    };

    const lightConeLeft = CharacterX + 18;
    const lightConeX = 128 * 1.2;
    const lightConeY = 150 * 1.2;

    const lightConeCenterX = 750;
    const lightConeCenterY = 111;

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
          drawStar(context, lightConeLeft + 18 + 12 * i, 165, 7, 5);
        }
      };

      const lightConeNameLeft = lightConeLeft + lightConeX;
      const lightConeNameUp = 40;
      const lightConeNameWidth = 200;
      const lightConeNameLineHeight = 27;
      const lightConeNameLines = 4;

      context!.font = "22px HanYiWenHei-85W";
      context!.fillStyle = "rgba(255, 255, 255, 1)";
      // fillTextLines(context, "1111111111111111111111111111111", lightConeNameLeft, lightConeNameUp, lightConeNameWidth, lightConeNameLineHeight, lightConeNameLines);
      // fillTextLines(context, "Before the Tutorial Mission Starts", lightConeNameLeft, lightConeNameUp, lightConeNameWidth, lightConeNameLineHeight, lightConeNameLines);
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

    for (let i = 0; i < character.attributes.length; ++i) {
      attributes[character.attributes[i].name] = {image: new Image(), value: character.attributes[i].value};
      // energy recharge
      if (character.attributes[i].name === Display[8]) attributes[Display[8]].value += 1;
      
      attributes[character.attributes[i].name].image.src = character.attributes[i].icon;
      attributes[character.attributes[i].name].image.setAttribute("crossOrigin", "anonymous");
    }

    for (let i = 0; i < character.additions.length; ++i) {
      if (attributes[character.additions[i].name] === undefined) {
        attributes[character.additions[i].name] = {image: new Image(), value: character.additions[i].value};
        // energy recharge
        if (character.additions[i].name === Display[8]) attributes[Display[8]].value += 1;

        attributes[character.additions[i].name].image.src = character.additions[i].icon;
        attributes[character.additions[i].name].image.setAttribute("crossOrigin", "anonymous");
      } else {
        attributes[character.additions[i].name].value += character.additions[i].value;
      }
    }
    
    const attributeUp = lightConeY + 15;
    const attributeLeft = lightConeLeft;
    const attributeLeftCol = 180;
    const attributeRightCol = 260;
    const attributeMid = attributeLeft + attributeLeftCol;
    const attributeSpace = 45;

    // 2 columns
    for (let i = 0; i < 6; ++i) {
      if (attributes[Display[i]] === undefined) {
        attributes[Display[i]] = {image: new Image(), value: 0};
        attributes[Display[i]].image.setAttribute("crossOrigin", "anonymous");
        attributes[Display[i]].image.src = "/srasset/icon/property/Icon" + DisplayURL[i] + ".png";
      }
      attributes[Display[i]].image.onload = () => {
        if (i < 3) {
          context!.drawImage(attributes[Display[i]].image, attributeLeft, attributeUp + i * attributeSpace, attributeSize, attributeSize);
        } else {
          context!.drawImage(attributes[Display[i]].image, attributeMid, attributeUp + (i - 3) * attributeSpace, attributeSize, attributeSize);
        }
        context!.font = "18px HanYiWenHei-85W";
        context!.fillStyle = "rgba(255, 255, 255, 1)";
        if (i < 3) {
          context!.fillText(formatToPrint(attributes[Display[i]].value, i), attributeMid - 10 - context!.measureText(formatToPrint(attributes[Display[i]].value, i)).width, attributeUp + i * attributeSpace + 25);
          context!.fillText(Display[i], attributeLeft + attributeSize, attributeUp + i * attributeSpace + 25);
        } else {
          context!.fillText(formatToPrint(attributes[Display[i]].value, i), attributeMid + attributeRightCol - 10 - context!.measureText(formatToPrint(attributes[Display[i]].value, i)).width, attributeUp + (i - 3) * attributeSpace + 25);
          context!.fillText(Display[i], attributeMid + attributeSize, attributeUp + (i - 3) * attributeSpace + 25);
        }
      };
    }

    for (let i = 6; i < Display.length; ++i) {
      if (attributes[Display[i]] === undefined) {
        attributes[Display[i]] = {image: new Image(), value: 0};
        attributes[Display[i]].image.setAttribute("crossOrigin", "anonymous");
        // energy recharge
        if (i === 8) attributes[Display[i]].value = 1;
        attributes[Display[i]].image.src = "/srasset/icon/property/Icon" + DisplayURL[i] + ".png";
      }
      attributes[Display[i]].image.onload = () => {
        context!.drawImage(attributes[Display[i]].image, attributeLeft, attributeUp + (i - 3) * attributeSpace, attributeSize, attributeSize);
        context!.font = "18px HanYiWenHei-85W";
        context!.fillStyle = "rgba(255, 255, 255, 1)";
        context!.fillText(formatToRadio(attributes[Display[i]].value), attributeMid + attributeRightCol - 10 - context!.measureText(formatToRadio(attributes[Display[i]].value)).width, attributeUp + (i - 3) * attributeSpace + 25);
        context!.fillText(Display[i], attributeLeft + attributeSize, attributeUp + (i - 3) * attributeSpace + 25);
      };
    }
    
    const relicLeft = attributeLeft + attributeLeftCol + attributeRightCol + 25;
    const relicUp = 20;
    const relicSpace = 97;
    const relicSize = 90;
    const starSize = 7;
    const subattributeSize = 25;

    const relics: {image: HTMLImageElement, id: number}[] = [];
    for (let i = 0; i < 6; ++i) {
      relics.push({image: new Image(), id: -1});
      relics[i].image.setAttribute("crossOrigin", "anonymous");
    }

    const relicCenterX = 1170;
    const relicCenterY = 333;

    if (character.relics.length === 0) {
      context!.fillStyle="#FFFFFF";
      context!.fillText("No Relics.", relicCenterX, relicCenterY);
    } else {
      for (let i = 0; i < character.relics.length; ++i) {
        const pos = i;
        relics[pos].id = i;
        relics[pos].image.src = character.relics[i].icon;
        relics[pos].image.onload = () => {
          context!.drawImage(relics[i].image, relicLeft, relicUp + pos * relicSpace, relicSize, relicSize);
          for (let j = 0; j < character.relics[i].rarity; ++j) {
            drawStar(context, relicLeft, relicUp + pos * relicSpace + relicSpace - 20 - j * 2 * starSize, starSize, character.relics[i].rarity);
          }
          context!.font = "18px HanYiWenHei-85W";
          context!.fillStyle = "rgba(255, 255, 255, 1)";
          context!.fillText("Lv. " + character.relics[i].level + "/" + 3 * character.relics[i].rarity, relicLeft + relicSize + 5, relicUp + pos * relicSpace + 25);
        };
        const mainAffix = new Image();
        mainAffix.setAttribute("crossOrigin", "anonymous");
        mainAffix.src = character.relics[i].main_affix.icon;
        mainAffix.onload = () => {
          context!.drawImage(mainAffix, relicLeft + relicSize + 85, relicUp + pos * relicSpace, attributeSize, attributeSize);
        };
        context!.font = "18px HanYiWenHei-85W";
        context!.fillStyle = "rgba(255, 255, 255, 1)";
        context!.fillText(character.relics[i].main_affix.display, relicLeft + relicSize + 85 + attributeSize, relicUp + pos * relicSpace + 25);
        
        const subAffix: HTMLImageElement[] = [];
        for (let j = 0; j < character.relics[i].sub_affix.length; ++j) {
          subAffix.push(new Image());
          subAffix[j].setAttribute("crossOrigin", "anonymous");
          subAffix[j].src = character.relics[i].sub_affix[j].icon;
          subAffix[j].onload = () => {
            if (j < 2) {
              context!.drawImage(subAffix[j], relicLeft + relicSize + 5 + j * 80, relicUp + pos * relicSpace + 35, subattributeSize, subattributeSize);
              context!.font = "14px HanYiWenHei-85W";
              context!.fillStyle = "rgba(255, 255, 255, 1)";
              context!.fillText(character.relics[i].sub_affix[j].display, relicLeft + relicSize + 5 + j * 80 + subattributeSize, relicUp + pos * relicSpace + 35 + 18);
            } else {
              context!.drawImage(subAffix[j], relicLeft + relicSize + 5 + (j - 2) * 80, relicUp + pos * relicSpace + 60, subattributeSize, subattributeSize);
              context!.font = "14px HanYiWenHei-85W";
              context!.fillStyle = "rgba(255, 255, 255, 1)";
              context!.fillText(character.relics[i].sub_affix[j].display, relicLeft + relicSize + 5 + (j - 2) * 80 + subattributeSize, relicUp + pos * relicSpace + 60 + 18);
            }
          };
        }
      }
    }
  }, [character, fresh]);

  return (
    <Space direction="vertical">
      <canvas ref={canvasRef} width={CardX} height={CardY} style={{width: CardX / scale, height: CardY / scale}} />
      <Space>
        <MyButton text="REFRESH" onClick={() => setFresh(!fresh)} />
        <MyButton text="DOWNLOAD" onClick={() => download(canvasRef.current)} />
        <div style={{ fontSize: 16, color: "rgb(185, 185, 185)" }}>P.S. Please download after the image has been completely loaded.</div>
      </Space>
      <Divider />
    </Space>
  );
};

export default CharacterCard;
