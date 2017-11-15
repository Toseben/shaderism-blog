const getHashCode = str => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const getHSL = (number, saturation, lightness) => {
  const shortened = Math.abs(number % 360);
  return `hsl(${shortened}, ${saturation}%, ${lightness}%)`;
};

export const getColorFromString = (str, lightness = 40, saturation = 20) => {
  let modHash = Math.abs(getHashCode(str) % 360);
  if (modHash > 180) {
    modHash = modHash * 0.2 + 20;
  } else {
    modHash = modHash * 0.2 + 140;
  }

  return getHSL(modHash, saturation, lightness);
};

export const getGradientFromString = (
  str,
  lightness,
  saturation,
  reverse = false
) => {
  const start = getColorFromString(str, lightness, saturation);
  const end = getColorFromString(str, lightness + 10, saturation);

  let colors = [start, end];

  if (reverse) {
    colors = colors.reverse();
  }

  return `linear-gradient(to bottom, ${colors.join(', ')})`;
};
