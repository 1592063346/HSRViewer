export const formatToInt = (value: number) => {
  return value.toFixed(0);
};

export const formatToRadio = (value: number) => {
  return (value * 100).toFixed(1) + "%";
};

export const formatToPrint = (value: number, id: number) => {
  if (id < 4) return formatToInt(value);
  return formatToRadio(value);
};

export const fillTextLines = (context: any, text: string, sx: number, sy: number, maxLength: number, lineHeight: number, maxLines: number) => {
  if (maxLines == 0) return;
  if (context!.measureText(text).width <= maxLength) {
    context!.fillText(text, sx, sy);
  } else {
    let endpos = 0;
    for (let i = 0; i < text.length; ++i) {
      if (text[i] === " ") {
        if (context!.measureText(text.substring(0, i)).width <= maxLength || endpos === 0) {
          endpos = i;
        } else {
          break;
        }
      }
    }
    if (endpos === 0) endpos = text.length;
    context!.fillText(text.substring(0, endpos), sx, sy, maxLength);
    fillTextLines(context, text.substring(endpos + 1), sx, sy + lineHeight, maxLength, lineHeight, maxLines - 1);
  }
};
