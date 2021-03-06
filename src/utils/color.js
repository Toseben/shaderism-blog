// const getHashCode = str => {
//   let hash = 0;
//   for (let i = 0; i < str.length; i++) {
//     hash = str.charCodeAt(i) + ((hash << 5) - hash);
//   }
//   return hash;
// };

const getHSL = (number, saturation, lightness) => {
  const shortened = Math.abs(number % 360);
  return `hsl(${shortened}, ${saturation}%, ${lightness}%)`;
};

export const getColorFromString = (str, lightness = 0, saturation = 0) => {
  // let modHash = Math.abs(getHashCode(str) % 360);
  let value = [177, 40 + lightness, 30 + saturation];

  return getHSL(...value);
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
