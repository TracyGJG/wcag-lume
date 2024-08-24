export function colLume(hexColour) {
  const [numRed, numGreen, numBlue] = extractHexColour(hexColour);
  const numRedLum = calcFactorLum(numRed / 255);
  const numGreenLum = calcFactorLum(numGreen / 255);
  const numBlueLum = calcFactorLum(numBlue / 255);

  return numRedLum * 0.2126 + numGreenLum * 0.7152 + numBlueLum * 0.0722;
}

function extractHexColour(fullHexCode) {
  const startOffset = +(fullHexCode[0] === '#');
  const hexCodeSize = 1 + (fullHexCode.length > 5);
  return [
    extractHexValue(fullHexCode, startOffset, hexCodeSize, 0),
    extractHexValue(fullHexCode, startOffset, hexCodeSize, 1),
    extractHexValue(fullHexCode, startOffset, hexCodeSize, 2),
  ];
}

function extractHexValue(fullHexCode, start, size, section) {
  const from = start + size * section;
  const hexValue = fullHexCode.slice(from, from + size);
  return parseInt(hexValue.padStart(2, hexValue), 16);
}

function calcFactorLum(numCol) {
  return numCol <= 0.04045
    ? numCol / 12.92
    : Math.pow((numCol + 0.055) / 1.055, 2.4);
}

export function relLume(foreground, background) {
  const numTypicalViewingFlare = 0.05;
  const numForeground = isNaN(foreground) ? colLume(foreground) : foreground;
  const numBackground = isNaN(background) ? colLume(background) : background;

  const numHighLum =
    Math.max(numForeground, numBackground) + numTypicalViewingFlare;

  const numLowLum =
    Math.min(numForeground, numBackground) + numTypicalViewingFlare;

  const relLum = numHighLum / numLowLum;

  const wcag =
    relLum >= 7 ? 'AAA' : relLum >= 4.5 ? 'AA' : relLum >= 3 ? 'A' : 'X';
  return {
    relLum,
    wcag,
  };
}
